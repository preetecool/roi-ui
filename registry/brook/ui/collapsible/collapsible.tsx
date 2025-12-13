"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { cn } from "@/lib/utils";
import styles from "./collapsible.module.css";

function CollapsibleRoot({ className, ...props }: Collapsible.Root.Props) {
  return <Collapsible.Root className={cn(styles.root, className)} {...props} />;
}

function CollapsibleTrigger({
  className,
  children,
  ...props
}: Collapsible.Trigger.Props) {
  return (
    <Collapsible.Trigger className={cn(styles.trigger, className)} {...props}>
      {children}
      <svg
        aria-hidden="true"
        className={styles.chevron}
        fill="none"
        height="16"
        viewBox="0 0 24 24"
        width="16"
      >
        <path
          d="m7 15 5 5 5-5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="m7 9 5-5 5 5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </Collapsible.Trigger>
  );
}

function CollapsiblePanel({ className, ...props }: Collapsible.Panel.Props) {
  return (
    <Collapsible.Panel
      className={cn(styles.panel, className)}
      data-slot="collapsible-panel"
      {...props}
    />
  );
}

export { CollapsibleRoot as Collapsible, CollapsiblePanel, CollapsibleTrigger };
