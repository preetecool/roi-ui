"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import useMeasure from "react-use-measure";
import { Button } from "@/registry/brook/tailwind/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/registry/brook/tailwind/ui/tabs";

const SLIDE_OFFSET_PERCENTAGE = 110;

const tabs = [
  {
    id: "account",
    label: "Account",
    heading: "Account Settings",
    description:
      "Make changes to your account here. Click save when you're done.",
    buttons: [
      { label: "Save Changes", variant: "primary" as const },
      { label: "Cancel", variant: "outline" as const },
    ],
  },
  {
    id: "password",
    label: "Password",
    heading: "Password",
    description:
      "Change your password here. After saving, you'll be logged out.",
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
  initial: (direction: number) => ({
    x: `${SLIDE_OFFSET_PERCENTAGE * direction}%`,
    opacity: 0,
    filter: "blur(4px)",
  }),
  active: { x: "0%", opacity: 1, filter: "blur(0px)" },
  exit: (direction: number) => ({
    x: `${-SLIDE_OFFSET_PERCENTAGE * direction}%`,
    opacity: 0,
    filter: "blur(4px)",
  }),
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
    <div className="mx-auto w-full max-w-[32rem]">
      <Tabs onValueChange={handleTabChange} value={activeTab}>
        <TabsList className="relative">
          {tabs.map((tab) => (
            <TabsTrigger
              className="data-[selected]:!bg-transparent data-[selected]:!border-transparent relative bg-transparent [-webkit-tap-highlight-color:transparent]"
              data-framer-motion="true"
              key={tab.id}
              tabIndex={0}
              value={tab.id}
            >
              {activeTab === tab.id && (
                <motion.span
                  className="absolute inset-0 border border-border bg-muted"
                  layoutId="bubble"
                  style={{ borderRadius: "var(--radius)", zIndex: 0 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-[1]">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <motion.div
          animate={{ height: bounds.height }}
          className="relative mt-0 overflow-hidden rounded-b-[var(--radius)] border-[0.5px] border-border/80 border-t-0 bg-[var(--mix-card-33-bg)]"
          initial={{ height: "auto" }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
        >
          <div className="relative w-full" ref={ref}>
            <AnimatePresence
              custom={direction}
              initial={false}
              mode="popLayout"
            >
              {activeTabData && (
                <motion.div
                  animate="active"
                  className="flex w-full flex-col gap-6"
                  custom={direction}
                  exit="exit"
                  initial="initial"
                  key={activeTab}
                  style={{ padding: "1.5rem" }}
                  transition={contentTransition}
                  variants={contentVariants}
                >
                  <div>
                    <h3 className="font-semibold text-lg leading-7">
                      {activeTabData.heading}
                    </h3>
                    <p className="mt-0 mb-0 text-muted-foreground text-sm leading-5">
                      {activeTabData.description}
                    </p>
                  </div>
                  <div className="flex gap-2 max-[640px]:flex-col">
                    {activeTabData.buttons.map((button) => (
                      <Button
                        key={button.label}
                        size="sm"
                        variant={button.variant}
                      >
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
