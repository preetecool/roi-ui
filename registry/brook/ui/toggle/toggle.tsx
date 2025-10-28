"use client";

import { Toggle } from "@base-ui-components/react/toggle";
import { cn } from "@/lib/utils";
import styles from "./toggle.module.css";

function ToggleRoot({
  className,
  ...props
}: Toggle.Props) {
  return <Toggle className={cn(styles.root, className)} {...props} />;
}

export { ToggleRoot as Toggle };
