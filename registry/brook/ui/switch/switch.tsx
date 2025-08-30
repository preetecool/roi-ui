"use client";

import { Switch } from "@base-ui-components/react/switch";
import { cn } from "@/lib/utils";
import styles from "./switch.module.css";

const SwitchRoot = ({ className, ...props }: React.ComponentProps<typeof Switch.Root>) => (
  <Switch.Root className={cn(styles.root, className)} {...props} />
);

const SwitchThumb = ({ className, ...props }: React.ComponentProps<typeof Switch.Thumb>) => (
  <Switch.Thumb className={cn(styles.thumb, className)} {...props} />
);

export { SwitchRoot as Switch, SwitchThumb };
