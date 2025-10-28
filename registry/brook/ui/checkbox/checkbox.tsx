"use client";

import { Checkbox } from "@base-ui-components/react/checkbox";
import { cn } from "@/lib/utils";
import styles from "./checkbox.module.css";

function CheckboxRoot({ className, ...props }: Checkbox.Root.Props) {
  return (
    <Checkbox.Root
      className={cn("hit-area-extend", styles.root, className)}
      data-slot="checkbox-root"
      {...props}
    />
  );
}

function CheckboxIndicator({ className, ...props }: Checkbox.Indicator.Props) {
  return (
    <Checkbox.Indicator
      className={cn(styles.indicator, className)}
      data-slot="checkbox-indicator"
      {...props}
    />
  );
}

export { CheckboxRoot as Checkbox, CheckboxIndicator };
