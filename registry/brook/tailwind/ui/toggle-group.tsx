"use client";

import { Toggle } from "@base-ui-components/react/toggle";
import { ToggleGroup } from "@base-ui-components/react/toggle-group";
import { cn } from "@/lib/utils-tailwind";

function ToggleGroupRoot({ className, ...props }: ToggleGroup.Props) {
  return (
    <ToggleGroup
      className={cn(
        "inline-flex rounded-[var(--radius)] bg-[var(--mix-card-33-bg)] p-0.5 gap-px",
        "data-[orientation=horizontal]:flex-row",
        "data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    />
  );
}

function ToggleGroupItem({ className, ...props }: Toggle.Props) {
  return (
    <Toggle
      className={cn(
        "inline-flex items-center justify-center rounded-[calc(var(--radius)-0.125rem)]",
        "h-9 w-9 p-0 font-medium text-sm",
        "border-none bg-transparent text-[var(--muted-foreground)]",
        "cursor-pointer",
        "hover:bg-[oklch(from_var(--accent)_l_c_h_/_0.6)] hover:text-[var(--foreground)]",
        "data-[focused]:shadow-[0_0_0_2px_var(--ring)/0.2] data-[focused]:outline-none",
        "data-[pressed]:bg-[var(--mix-accent-66-bg)] data-[pressed]:text-[var(--foreground)] data-[pressed]:shadow-[0_1px_2px_0_rgb(0_0_0_/_0.05)]",
        "data-[pressed]:hover:bg-[var(--mix-accent-75-bg)] data-[pressed]:hover:text-[var(--foreground)]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { ToggleGroupRoot as ToggleGroup, ToggleGroupItem };
