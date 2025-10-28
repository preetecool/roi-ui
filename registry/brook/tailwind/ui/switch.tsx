"use client";

import { Switch } from "@base-ui-components/react/switch";
import { cn } from "@/lib/tw-utils";

function SwitchRoot({
  className,
  ...props
}: Switch.Root.Props) {
  return (
    <Switch.Root
      data-slot="switch-root"
      className={cn(
        "relative m-0 inline-flex h-6 w-11 appearance-none items-center rounded-xl p-0.5 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
        "border-[0.5px] border-[var(--border)] bg-[var(--mix-card-50-bg)]",
        "hover:bg-[var(--muted-hover,var(--muted))]",
        "data-[checked]:bg-[var(--success)]",
        "focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "data-[disabled]:hover:bg-[var(--muted)]",
        "data-[disabled]:data-[checked]:hover:bg-[var(--primary)]",
        className
      )}
      {...props}
    />
  );
}

function SwitchThumb({
  className,
  ...props
}: Switch.Thumb.Props) {
  return (
    <Switch.Thumb
      data-slot="switch-thumb"
      className={cn(
        "h-5 w-5 translate-x-0 rounded-full bg-white transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:scale-105",
        "data-[checked]:translate-x-5",
        "[.root:hover_&]:shadow-[0_2px_4px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.04)]",
        className
      )}
      {...props}
    />
  );
}

export { SwitchRoot as Switch, SwitchThumb };
