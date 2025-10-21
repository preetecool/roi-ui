"use client";

import { Switch } from "@base-ui-components/react/switch";
import { cn } from "@/lib/utils";
import styles from "./switch.module.css";

function SwitchRoot({
  className,
  ...props
}: React.ComponentProps<typeof Switch.Root>) {
  return <Switch.Root className={cn(styles.root, className)} {...props} />;
}

function SwitchThumb({
  className,
  ...props
}: React.ComponentProps<typeof Switch.Thumb>) {
  return <Switch.Thumb className={cn(styles.thumb, className)} {...props} />;
}

export { SwitchRoot as Switch, SwitchThumb };
