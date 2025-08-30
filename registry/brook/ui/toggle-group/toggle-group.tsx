"use client";

import { ToggleGroup } from "@base-ui-components/react/toggle-group";
import { Toggle } from "@base-ui-components/react/toggle";
import { cn } from "@/lib/utils";
import styles from "./toggle-group.module.css";

const ToggleGroupRoot = ({ className, ...props }: React.ComponentProps<typeof ToggleGroup>) => (
  <ToggleGroup className={cn(styles.root, className)} {...props} />
);

const ToggleGroupItem = ({ className, ...props }: React.ComponentProps<typeof Toggle>) => (
  <Toggle className={cn(styles.item, className)} {...props} />
);

export { ToggleGroupRoot as ToggleGroup, ToggleGroupItem as ToggleGroupItem };