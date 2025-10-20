"use client";

import { cn } from "@/lib/utils";
import { CheckboxGroup } from "@base-ui-components/react/checkbox-group";
import styles from "./checkbox-group.module.css";

function CheckboxGroupRoot({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxGroup>) {
  return <CheckboxGroup className={cn(styles.root, className)} {...props} />;
}

export { CheckboxGroupRoot as CheckboxGroup };
