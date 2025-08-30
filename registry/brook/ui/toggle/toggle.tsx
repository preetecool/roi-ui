"use client";

import { Toggle } from "@base-ui-components/react/toggle";
import { cn } from "@/lib/utils";
import styles from "./toggle.module.css";

const ToggleRoot = ({ className, ...props }: React.ComponentProps<typeof Toggle>) => (
  <Toggle className={cn(styles.root, className)} {...props} />
);

export { ToggleRoot as Toggle };