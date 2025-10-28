"use client";

import { Switch } from "@base-ui-components/react/switch";
import { cn } from "@/lib/utils";
import styles from "./switch.module.css";

function SwitchRoot({
  className,
  ...props
}: Switch.Root.Props) {
  return <Switch.Root data-slot="switch-root" className={cn(styles.root, className)} {...props} />;
}

function SwitchThumb({
  className,
  ...props
}: Switch.Thumb.Props) {
  return <Switch.Thumb data-slot="switch-thumb" className={cn(styles.thumb, className)} {...props} />;
}

export { SwitchRoot as Switch, SwitchThumb };
