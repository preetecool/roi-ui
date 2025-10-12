"use client";

import { Button } from "@/registry/brook/ui/button/button";
import { Tabs, TabsList, TabsTrigger } from "@/registry/brook/ui/tabs/tabs";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import useMeasure from "react-use-measure";
import styles from "./tabs-motion.module.css";

const tabs = [
  {
    id: "account",
    label: "Account",
    heading: "Account Settings",
    description: "Make changes to your account here. Click save when you're done.",
    buttons: [
      { label: "Save Changes", variant: "primary" as const },
      { label: "Cancel", variant: "outline" as const },
    ],
  },
  {
    id: "password",
    label: "Password",
    heading: "Password",
    description: "Change your password here. After saving, you'll be logged out.",
    buttons: [
      { label: "Update Password", variant: "primary" as const },
      { label: "Cancel", variant: "outline" as const },
    ],
  },
  {
    id: "team",
    label: "Team",
    heading: "Team Management",
    description:
      "Invite and manage your team members. Set permissions, roles, and access levels for each team member.",
    buttons: [
      { label: "Invite Member", variant: "primary" as const },
      { label: "Manage Roles", variant: "outline" as const },
    ],
  },
  {
    id: "billing",
    label: "Billing",
    heading: "Billing",
    description: "View your billing information and payment methods.",
    buttons: [
      { label: "Save Changes", variant: "primary" as const },
      { label: "Cancel", variant: "outline" as const },
    ],
  },
];

const contentVariants = {
  initial: (direction: number) => {
    return { x: `${110 * direction}%`, opacity: 0, filter: "blur(4px)" };
  },
  active: { x: "0%", opacity: 1, filter: "blur(0px)" },
  exit: (direction: number) => {
    return { x: `${-110 * direction}%`, opacity: 0, filter: "blur(4px)" };
  },
};

const contentTransition = {
  type: "spring" as const,
  bounce: 0.1,
  duration: 0.5,
};

export default function TabsFramerMotion() {
  const [activeTab, setActiveTab] = useState("account");
  const [direction, setDirection] = useState(0);
  const [ref, bounds] = useMeasure();

  const handleTabChange = (newTab: string) => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    const newIndex = tabs.findIndex((t) => t.id === newTab);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveTab(newTab);
  };

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className={styles.container}>
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className={styles.tabsList}>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              data-framer-motion="true"
              className={styles.tabTrigger}
              tabIndex={0}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="bubble"
                  className={styles.bubble}
                  style={{ borderRadius: "var(--radius)", zIndex: 0 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className={styles.tabLabel}>{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <motion.div
          className={styles.contentContainer}
          initial={{ height: "auto" }}
          animate={{ height: bounds.height }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
        >
          <div ref={ref} className={styles.contentWrapper}>
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              {activeTabData && (
                <motion.div
                  key={activeTab}
                  variants={contentVariants}
                  initial="initial"
                  animate="active"
                  exit="exit"
                  custom={direction}
                  transition={contentTransition}
                  className={styles.tabContent}
                  style={{ padding: "1.5rem" }}
                >
                  <div>
                    <h3 className={styles.heading}>{activeTabData.heading}</h3>
                    <p className={styles.description}>{activeTabData.description}</p>
                  </div>
                  <div className={styles.buttonGroup}>
                    {activeTabData.buttons.map((button, btnIndex) => (
                      <Button key={btnIndex} variant={button.variant} size="sm">
                        {button.label}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </Tabs>
    </div>
  );
}
