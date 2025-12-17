"use client";

import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import { cn } from "@/lib/utils";
import styles from "./checkbox-group.module.css";

function CheckboxGroupRoot({ className, ...props }: CheckboxGroup.Props) {
  return <CheckboxGroup className={cn(styles.root, className)} data-slot="checkbox-group-root" {...props} />;
}

export { CheckboxGroupRoot as CheckboxGroup };
