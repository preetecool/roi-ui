"use client";

import { cn } from "@/lib/utils";
import { Checkbox } from "@base-ui-components/react/checkbox";
import styles from "./checkbox.module.css";

function CheckboxRoot({ className, ...props }: React.ComponentProps<typeof Checkbox.Root>) {
  return <Checkbox.Root className={cn(styles.root, className)} {...props} />;
}

function CheckboxIndicator({ className, ...props }: React.ComponentProps<typeof Checkbox.Indicator>) {
  return <Checkbox.Indicator className={cn(styles.indicator, className)} {...props} />;
}

export { CheckboxRoot as Checkbox, CheckboxIndicator };
