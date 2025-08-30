"use client";

import { Collapsible } from "@base-ui-components/react/collapsible";
import { cn } from "@/lib/utils";
import styles from "./collapsible.module.css";

const CollapsibleRoot = ({
  className,
  ...props
}: React.ComponentProps<typeof Collapsible.Root>) => (
  <Collapsible.Root className={cn(styles.root, className)} {...props} />
);

const CollapsibleTrigger = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Collapsible.Trigger>) => (
  <Collapsible.Trigger className={cn(styles.trigger, className)} {...props}>
    {children}
    <svg 
      className={styles.chevron}
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none"
    >
      <path
        d="m7 15 5 5 5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m7 9 5-5 5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Collapsible.Trigger>
);

const CollapsiblePanel = ({
  className,
  ...props
}: React.ComponentProps<typeof Collapsible.Panel>) => (
  <Collapsible.Panel className={cn(styles.panel, className)} {...props} />
);

export {
  CollapsibleRoot as Collapsible,
  CollapsibleTrigger,
  CollapsiblePanel,
};