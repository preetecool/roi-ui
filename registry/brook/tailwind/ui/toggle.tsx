"use client";

import { Toggle } from "@base-ui/react/toggle";
import { cn } from "@/lib/utils-tailwind";

function ToggleRoot({ className, ...props }: Toggle.Props) {
  return (
    <Toggle
      className={cn(
        "inline-flex items-center justify-center rounded-[0.375rem]",
        "h-9 px-3 font-medium text-sm",
        "border-none bg-transparent text-[var(--muted-foreground)]",
        "cursor-pointer",
        "hover:bg-[var(--accent)] hover:text-[var(--foreground)]",
        "data-[focused]:shadow-[0_0_0_2px_var(--ring)/0.2] data-[focused]:outline-none",
        "data-[pressed]:bg-[var(--accent)] data-[pressed]:text-[var(--foreground)]",
        "data-[pressed]:hover:bg-[var(--accent)] data-[pressed]:hover:text-[var(--foreground)]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { ToggleRoot as Toggle };
