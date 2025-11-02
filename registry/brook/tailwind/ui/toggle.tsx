"use client";

import { Toggle } from "@base-ui-components/react/toggle";
import { cn } from "@/lib/utils-tailwind";

function ToggleRoot({ className, ...props }: Toggle.Props) {
  return (
    <Toggle
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius)]",
        "h-9 px-3 font-medium text-sm",
        "border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.6)]",
        "bg-[var(--mix-card-33-bg)] text-[var(--foreground)]",
        "cursor-pointer transition-all duration-150",
        "hover:bg-[var(--muted)]",
        "data-[focused]:border-[var(--ring)] data-[focused]:shadow-[0_0_0_2px_var(--ring)/0.2] data-[focused]:outline-none",
        "data-[pressed]:border-[0.5px] data-[pressed]:border-[oklch(from_var(--border)_l_c_h_/_0.9)] data-[pressed]:bg-[var(--mix-card-66-bg)] data-[pressed]:text-[var(--foreground)]",
        "data-[pressed]:hover:bg-[var(--mix-card-85-bg)]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { ToggleRoot as Toggle };
