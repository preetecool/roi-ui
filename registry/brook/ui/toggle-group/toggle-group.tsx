"use client";

import { Toggle } from "@base-ui-components/react/toggle";
import { ToggleGroup } from "@base-ui-components/react/toggle-group";
import { cn } from "@/lib/utils";
import styles from "./toggle-group.module.css";

function ToggleGroupRoot({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroup>) {
  return <ToggleGroup className={cn(styles.root, className)} {...props} />;
}

function ToggleGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof Toggle>) {
  return <Toggle className={cn(styles.item, className)} {...props} />;
}

export { ToggleGroupRoot as ToggleGroup, ToggleGroupItem };
