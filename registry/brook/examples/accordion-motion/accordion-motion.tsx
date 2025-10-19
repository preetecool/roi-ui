"use client";

import { Accordion } from "@base-ui-components/react/accordion";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useState } from "react";
import styles from "./accordion-motion.module.css";

const accordionItems = [
  {
    id: "item-1",
    title: "What features are included?",
    content:
      "All plans include real-time analytics, unlimited team members, custom branding, API access, and 24/7 support.",
  },
  {
    id: "item-2",
    title: "How does billing work?",
    content:
      "You can choose monthly or annual billing. Annual plans save 20% and you can cancel anytime with no fees.",
  },
  {
    id: "item-3",
    title: "Can I upgrade or downgrade?",
    content:
      "Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades apply at your next billing cycle.",
  },
];

export default function AccordionFramerMotion() {
  const [value, setValue] = useState<string[]>(["item-1"]);

  return (
    <div className={styles.container}>
      <MotionConfig transition={{ duration: 0.15, ease: [0.455, 0.03, 0.515, 0.955] }}>
        <Accordion.Root value={value} onValueChange={setValue}>
          {accordionItems.map((item) => {
            const isOpen = value.includes(item.id);
            return (
              <Accordion.Item key={item.id} value={item.id} className={styles.accordionItem}>
                <Accordion.Header>
                  <motion.div whileHover="hover" className={styles.triggerContainer}>
                    <Accordion.Trigger key="trigger" className={styles.trigger} render={<motion.button />}>
                      <motion.div className={styles.icon} animate={{ rotate: isOpen ? 90 : 0 }}>
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                          <motion.path
                            d="M4 10L16 10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            animate={{
                              d: isOpen ? "M10 4L10 16" : "M4 10L16 10",
                              scale: isOpen ? 0 : 1,
                            }}
                          />

                          <path d="M10 4L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </motion.div>
                      <div>{item.title}</div>
                    </Accordion.Trigger>
                  </motion.div>
                </Accordion.Header>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div key="content" className={styles.content}>
                      <motion.div
                        initial={{ height: 0, opacity: 0, filter: "blur(2px)", scale: 0.95 }}
                        animate={{ height: "auto", opacity: 1, filter: "blur(0px)", scale: 1 }}
                        exit={{ height: 0, opacity: 0, filter: "blur(2px)", scale: 0.95 }}
                        className={styles.contentInner}
                      >
                        {item.content}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
      </MotionConfig>
    </div>
  );
}
