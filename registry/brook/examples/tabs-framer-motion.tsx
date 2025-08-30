"use client";

import { Tabs, TabsList, TabsTrigger } from "@/registry/brook/ui/tabs/tabs";
import { Button } from "@/registry/brook/ui/button/button";
import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";

const tabs = [
  { id: "account", label: "Account" },
  { id: "password", label: "Password" },
  { id: "team", label: "Team" },
  { id: "billing", label: "Billing" },
];

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
    <div style={{ width: "100%", maxWidth: "32rem", margin: "0 auto" }}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList style={{ position: "relative" }}>
          {tabs.map((tab, index) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              data-framer-motion="true"
              ref={(el) => {
                tabRefs.current[index] = el as HTMLElement;
              }}
              style={{
                position: "relative",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <span style={{ position: "relative" }}>{tab.label}</span>
            </TabsTrigger>
          ))}
          <motion.span
            style={{
              position: "absolute",
              zIndex: 0,
              backgroundColor: "var(--muted)",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
              height: "calc(100% - 0.5rem)",
              top: "0.25rem",
            }}
            animate={{
              left: bubbleStyle.left,
              width: bubbleStyle.width,
            }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        </TabsList>

        <div
          style={{
            position: "relative",
            overflow: "hidden",
            marginTop: "0",
            borderRadius: "0 0 var(--radius) var(--radius)",
            border: "1px solid var(--border)",
            borderTop: "none",
            backgroundColor: "var(--card)",
            minHeight: "170px",
          }}
        >
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id;
            const currentIndex = tabs.findIndex((t) => t.id === activeTab);

            return (
              <motion.div
                key={tab.id}
                initial={false}
                animate={{
                  x: isActive ? 0 : index > currentIndex ? 100 : -100,
                  opacity: isActive ? 1 : 0,
                  filter: isActive ? "blur(0px)" : "blur(4px)",
                }}
                transition={{
                  type: "spring",
                  bounce: 0.1,
                  duration: 0.5,
                  opacity: { duration: 0.3 },
                  filter: { duration: 0.3 },
                }}
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  left: "1.5rem",
                  right: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                {tab.id === "account" && (
                  <>
                    <div>
                      <h3
                        style={{
                          fontSize: "1.125rem",
                          fontWeight: "600",
                          lineHeight: "1.75rem",
                        }}
                      >
                        Account Settings
                      </h3>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          lineHeight: "1.25rem",
                          color: "var(--muted-foreground)",
                        }}
                      >
                        Make changes to your account here. Click save when you&apos;re done.
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
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
                      <h3
                        style={{
                          fontSize: "1.125rem",
                          fontWeight: "600",
                          lineHeight: "1.75rem",
                        }}
                      >
                        Password
                      </h3>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          lineHeight: "1.25rem",
                          color: "var(--muted-foreground)",
                        }}
                      >
                        Change your password here. After saving, you&apos;ll be logged out.
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
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
                      <h3
                        style={{
                          fontSize: "1.125rem",
                          fontWeight: "600",
                          lineHeight: "1.75rem",
                        }}
                      >
                        Team Management
                      </h3>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          lineHeight: "1.25rem",
                          color: "var(--muted-foreground)",
                        }}
                      >
                        Invite and manage your team members here.
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
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
                      <h3
                        style={{
                          fontSize: "1.125rem",
                          fontWeight: "600",
                          lineHeight: "1.75rem",
                        }}
                      >
                        Billing
                      </h3>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          lineHeight: "1.25rem",
                          color: "var(--muted-foreground)",
                        }}
                      >
                        View your billing information and payment methods.
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
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
