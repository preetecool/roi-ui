"use client";

import { CheckboxGroup } from "@base-ui-components/react/checkbox-group";
import { cn } from "@/lib/utils";
import styles from "./checkbox-group.module.css";

const CheckboxGroupRoot = ({ className, ...props }: React.ComponentProps<typeof CheckboxGroup>) => (
  <CheckboxGroup className={cn(styles.root, className)} {...props} />
);

export { CheckboxGroupRoot as CheckboxGroup };