"use client";

import { Accordion } from "@base-ui-components/react/accordion";
import { useState } from "react";
import styles from "./accordion-animation.module.css";

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
      <Accordion.Root onValueChange={setValue} value={value}>
        {accordionItems.map((item) => (
          <Accordion.Item
            className={styles.accordionItem}
            key={item.id}
            value={item.id}
          >
            <Accordion.Header>
              <Accordion.Trigger className={styles.trigger}>
                <div className={styles.icon}>
                  <svg
                    aria-label="Accordion toggle icon"
                    fill="none"
                    height="18"
                    role="img"
                    viewBox="0 0 20 20"
                    width="18"
                  >
                    <title>Toggle accordion</title>
                    <path
                      className={styles.horizontalLine}
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
                </div>
                <div>{item.title}</div>
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Panel className={styles.panel}>
              <div className={styles.content}>
                <div className={styles.contentInner}>{item.content}</div>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
