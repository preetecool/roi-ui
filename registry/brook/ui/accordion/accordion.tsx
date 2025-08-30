"use client";

import { Accordion } from "@base-ui-components/react/accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./accordion.module.css";

const AccordionRoot = ({ className, ...props }: React.ComponentProps<typeof Accordion.Root>) => (
  <Accordion.Root className={cn(styles.root, className)} {...props} />
);

const AccordionItem = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Accordion.Item>) => (
  <Accordion.Item className={cn(styles.item, className)} {...props} />
);

const AccordionHeader = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Accordion.Header>) => (
  <Accordion.Header className={cn(styles.header, className)} {...props} />
);

const AccordionTrigger = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Accordion.Trigger>) => (
  <Accordion.Trigger className={cn(styles.trigger, className)} {...props}>
    {children}
    <ChevronDown className={styles.chevron} />
  </Accordion.Trigger>
);

const AccordionPanel = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Accordion.Panel>) => (
  <Accordion.Panel className={cn(styles.panel, className)} {...props}>
    <div className={styles.content}>{children}</div>
  </Accordion.Panel>
);

export {
  AccordionRoot as Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionPanel,
  ChevronDown as ChevronDownIcon,
};
