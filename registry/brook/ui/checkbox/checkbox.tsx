"use client";

import { Checkbox } from "@base-ui-components/react/checkbox";
import { cn } from "@/lib/utils";
import styles from "./checkbox.module.css";

const CheckboxRoot = ({ className, ...props }: React.ComponentProps<typeof Checkbox.Root>) => (
  <Checkbox.Root className={cn(styles.root, className)} {...props} />
);

const CheckboxIndicator = ({ className, ...props }: React.ComponentProps<typeof Checkbox.Indicator>) => (
  <Checkbox.Indicator className={cn(styles.indicator, className)} {...props} />
);

export { CheckboxRoot as Checkbox, CheckboxIndicator };