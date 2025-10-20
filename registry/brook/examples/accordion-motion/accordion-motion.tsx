"use client";

import { Accordion } from "@base-ui-components/react/accordion";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
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
      <MotionConfig
        transition={{ duration: 0.15, ease: [0.455, 0.03, 0.515, 0.955] }}
      >
        <Accordion.Root onValueChange={setValue} value={value}>
          {accordionItems.map((item) => {
            const isOpen = value.includes(item.id);
            return (
              <Accordion.Item
                className={styles.accordionItem}
                key={item.id}
                value={item.id}
              >
                <Accordion.Header>
                  <motion.div
                    className={styles.triggerContainer}
                    whileHover="hover"
                  >
                    <Accordion.Trigger
                      className={styles.trigger}
                      key="trigger"
                      render={<motion.button />}
                    >
                      <motion.div
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        className={styles.icon}
                      >
                        <svg
                          fill="none"
                          height="18"
                          viewBox="0 0 20 20"
                          width="18"
                        >
                          <motion.path
                            animate={{
                              d: isOpen ? "M10 4L10 16" : "M4 10L16 10",
                              scale: isOpen ? 0 : 1,
                            }}
                            d="M4 10L16 10"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="2"
                          />

                          <path
                            d="M10 4L10 16"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="2"
                          />
                        </svg>
                      </motion.div>
                      <div>{item.title}</div>
                    </Accordion.Trigger>
                  </motion.div>
                </Accordion.Header>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div className={styles.content} key="content">
                      <motion.div
                        animate={{
                          height: "auto",
                          opacity: 1,
                          filter: "blur(0px)",
                          scale: 1,
                        }}
                        className={styles.contentInner}
                        exit={{
                          height: 0,
                          opacity: 0,
                          filter: "blur(2px)",
                          scale: 0.95,
                        }}
                        initial={{
                          height: 0,
                          opacity: 0,
                          filter: "blur(2px)",
                          scale: 0.95,
                        }}
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
