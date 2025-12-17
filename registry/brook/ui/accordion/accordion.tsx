"use client";

import { Accordion } from "@base-ui/react/accordion";
import { cn } from "@/lib/utils";
import styles from "./accordion.module.css";

function AccordionRoot({ className, ...props }: Accordion.Root.Props) {
  return <Accordion.Root className={cn(styles.root, className)} data-slot="accordion-root" {...props} />;
}

function AccordionItem({ className, ...props }: Accordion.Item.Props) {
  return <Accordion.Item className={cn(styles.item, className)} data-slot="accordion-item" {...props} />;
}

function AccordionHeader({ className, ...props }: Accordion.Header.Props) {
  return <Accordion.Header className={cn(styles.header, className)} data-slot="accordion-header" {...props} />;
}

function AccordionTrigger({ className, children, ...props }: Accordion.Trigger.Props) {
  return (
    <Accordion.Trigger className={cn(styles.trigger, className)} data-slot="accordion-trigger" {...props}>
      <div className={styles.icon}>
        <svg aria-label="Accordion toggle icon" fill="none" height="18" role="img" viewBox="0 0 20 20" width="18">
          <title>Toggle accordion</title>
          <path
            className={styles.horizontalLine}
            d="M4 10L16 10"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path d="M10 4L10 16" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        </svg>
      </div>
      <div>{children}</div>
    </Accordion.Trigger>
  );
}

function AccordionPanel({ className, children, ...props }: Accordion.Panel.Props) {
  return (
    <Accordion.Panel className={cn(styles.panel, className)} data-slot="accordion-panel" {...props}>
      <div className={styles.content}>
        <div className={styles.contentInner}>{children}</div>
      </div>
    </Accordion.Panel>
  );
}

export { AccordionRoot as Accordion, AccordionHeader, AccordionItem, AccordionPanel, AccordionRoot, AccordionTrigger };
