"use client";

import { Accordion } from "@base-ui-components/react/accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./accordion.module.css";

function AccordionRoot({
  className,
  ...props
}: React.ComponentProps<typeof Accordion.Root>) {
  return <Accordion.Root className={cn(styles.root, className)} {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Accordion.Item>) {
  return <Accordion.Item className={cn(styles.item, className)} {...props} />;
}

function AccordionHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Accordion.Header>) {
  return (
    <Accordion.Header className={cn(styles.header, className)} {...props} />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Accordion.Trigger>) {
  return (
    <Accordion.Trigger className={cn(styles.trigger, className)} {...props}>
      {children}
      <ChevronDown className={styles.chevron} />
    </Accordion.Trigger>
  );
}

function AccordionPanel({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Accordion.Panel>) {
  return (
    <Accordion.Panel className={cn(styles.panel, className)} {...props}>
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
