"use client";

import { Switch } from "@base-ui/react/switch";
import { cn } from "@/lib/utils";
import styles from "./switch.module.css";

function SwitchRoot({ className, ...props }: Switch.Root.Props) {
  return (
    <Switch.Root
      className={cn(styles.root, className)}
      data-slot="switch-root"
      {...props}
    />
  );
}

function SwitchThumb({ className, ...props }: Switch.Thumb.Props) {
  return (
    <Switch.Thumb
      className={cn(styles.thumb, className)}
      data-slot="switch-thumb"
      {...props}
    />
  );
}

export { SwitchRoot as Switch, SwitchThumb };
