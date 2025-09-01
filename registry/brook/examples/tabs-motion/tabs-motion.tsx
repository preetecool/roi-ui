"use client";

import { Tabs, TabsList, TabsTrigger } from "@/registry/brook/ui/tabs/tabs";
import { Button } from "@/registry/brook/ui/button/button";
import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import styles from "./tabs-motion.module.css";

const tabs = [
  { id: "account", label: "Account" },
  { id: "password", label: "Password" },
  { id: "team", label: "Team" },
  { id: "billing", label: "Billing" },
];

const bubbleVariants = {
  animate: (bubbleStyle: { left: number; width: number }) => ({
    left: bubbleStyle.left,
    width: bubbleStyle.width,
  }),
};

const bubbleTransition = {
  type: "spring" as const,
  bounce: 0.2,
  duration: 0.6,
};

const contentVariants = {
  active: { x: 0, opacity: 1, filter: "blur(0px)" },
  inactive: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    filter: "blur(4px)",
  }),
};

const contentTransition = {
  type: "spring" as const,
  bounce: 0.1,
  duration: 0.5,
  opacity: { duration: 0.3 },
  filter: { duration: 0.3 },
};

export default function TabsFramerMotion() {
  const [activeTab, setActiveTab] = useState("account");
  const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const activeTabElement = tabRefs.current[activeIndex];

    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement;
      setBubbleStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  return (
    <div className={styles.container}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className={styles.tabsList}>
          {tabs.map((tab, index) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              data-framer-motion="true"
              ref={(el) => {
                tabRefs.current[index] = el as HTMLElement;
              }}
              className={styles.tabTrigger}
            >
              <span className={styles.tabLabel}>{tab.label}</span>
            </TabsTrigger>
          ))}
          <motion.span
            className={styles.bubble}
            variants={bubbleVariants}
            animate="animate"
            custom={bubbleStyle}
            transition={bubbleTransition}
          />
        </TabsList>

        <div className={styles.contentContainer}>
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id;
            const currentIndex = tabs.findIndex((t) => t.id === activeTab);

            return (
              <motion.div
                key={tab.id}
                initial={false}
                variants={contentVariants}
                animate={isActive ? "active" : "inactive"}
                custom={index > currentIndex ? 1 : -1}
                transition={contentTransition}
                className={styles.tabContent}
                style={{ pointerEvents: isActive ? "auto" : "none" }}
              >
                {tab.id === "account" && (
                  <>
                    <div>
                      <h3 className={styles.heading}>
                        Account Settings
                      </h3>
                      <p className={styles.description}>
                        Make changes to your account here. Click save when you&apos;re done.
                      </p>
                    </div>
                    <div className={styles.buttonGroup}>
                      <Button size="sm">Save Changes</Button>
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
                {tab.id === "password" && (
                  <>
                    <div>
                      <h3 className={styles.heading}>
                        Password
                      </h3>
                      <p className={styles.description}>
                        Change your password here. After saving, you&apos;ll be logged out.
                      </p>
                    </div>
                    <div className={styles.buttonGroup}>
                      <Button size="sm">Update Password</Button>
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
                {tab.id === "team" && (
                  <>
                    <div>
                      <h3 className={styles.heading}>
                        Team Management
                      </h3>
                      <p className={styles.description}>
                        Invite and manage your team members here.
                      </p>
                    </div>
                    <div className={styles.buttonGroup}>
                      <Button size="sm">Invite Member</Button>
                      <Button variant="outline" size="sm">
                        Manage Roles
                      </Button>
                    </div>
                  </>
                )}
                {tab.id === "billing" && (
                  <>
                    <div>
                      <h3 className={styles.heading}>
                        Billing
                      </h3>
                      <p className={styles.description}>
                        View your billing information and payment methods.
                      </p>
                    </div>
                    <div className={styles.buttonGroup}>
                      <Button size="sm">Save Changes</Button>
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
}
