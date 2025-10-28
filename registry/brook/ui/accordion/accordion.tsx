"use client";

import { Accordion } from "@base-ui-components/react/accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./accordion.module.css";

function AccordionRoot({
  className,
  ...props
}: Accordion.Root.Props) {
  return (
    <Accordion.Root
      className={cn(styles.root, className)}
      data-slot="accordion-root"
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: Accordion.Item.Props) {
  return (
    <Accordion.Item
      className={cn(styles.item, className)}
      data-slot="accordion-item"
      {...props}
    />
  );
}

function AccordionHeader({
  className,
  ...props
}: Accordion.Header.Props) {
  return (
    <Accordion.Header
      className={cn(styles.header, className)}
      data-slot="accordion-header"
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: Accordion.Trigger.Props) {
  return (
    <Accordion.Trigger
      className={cn(styles.trigger, className)}
      data-slot="accordion-trigger"
      {...props}
    >
      {children}
      <ChevronDown className={styles.chevron} />
    </Accordion.Trigger>
  );
}

function AccordionPanel({
  className,
  children,
  ...props
}: Accordion.Panel.Props) {
  return (
    <Accordion.Panel
      className={cn(styles.panel, className)}
      data-slot="accordion-panel"
      {...props}
    >
      <div className={styles.content}>{children}</div>
    </Accordion.Panel>
  );
}

// biome-ignore lint/performance/noBarrelFile: Re-exporting icon as part of component API
export { ChevronDown as ChevronDownIcon } from "lucide-react";

export {
  AccordionRoot as Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionRoot,
  AccordionTrigger,
};
