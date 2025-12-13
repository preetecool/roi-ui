"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { cn } from "@/lib/utils";
import styles from "./toggle-group.module.css";

function ToggleGroupRoot({ className, ...props }: ToggleGroup.Props) {
  return <ToggleGroup className={cn(styles.root, className)} {...props} />;
}

function ToggleGroupItem({ className, ...props }: Toggle.Props) {
  return <Toggle className={cn(styles.item, className)} {...props} />;
}

export { ToggleGroupRoot as ToggleGroup, ToggleGroupItem };
