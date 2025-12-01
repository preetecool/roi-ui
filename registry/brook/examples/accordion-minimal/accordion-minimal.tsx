"use client";

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/registry/brook/ui/accordion/accordion";
import styles from "./accordion-minimal.module.css";

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

export default function AccordionMinimal() {
  return (
    <Accordion className={styles.root} defaultValue={["item-1"]} multiple>
      {accordionItems.map((item) => (
        <AccordionItem className={styles.item} key={item.id} value={item.id}>
          <AccordionHeader className={styles.header}>
            <AccordionTrigger className={styles.trigger}>
              {item.title}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel className={styles.panel}>
            {item.content}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
