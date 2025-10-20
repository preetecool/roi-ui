"use client";

import { cn } from "@/lib/utils";
import { Toggle } from "@base-ui-components/react/toggle";
import styles from "./toggle.module.css";

function ToggleRoot({
  className,
  ...props
}: React.ComponentProps<typeof Toggle>) {
  return <Toggle className={cn(styles.root, className)} {...props} />;
}

export { ToggleRoot as Toggle };
