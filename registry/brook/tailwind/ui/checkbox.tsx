"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { cn } from "@/lib/utils-tailwind";

function CheckboxRoot({ className, ...props }: Checkbox.Root.Props) {
  return (
    <Checkbox.Root
      className={cn(
        "hit-area-extend flex h-[1.125rem] w-[1.125rem] items-center justify-center",
        "relative flex-shrink-0 cursor-pointer rounded-[0.3125rem] border-0 bg-transparent",
        "data-[unchecked]:border data-[unchecked]:border-[oklch(from_var(--color-border)_l_c_h_/_0.8)] data-[unchecked]:bg-transparent",
        "data-[checked]:border data-[checked]:border-[var(--color-border)] data-[checked]:bg-[var(--color-primary)]",
        "data-[indeterminate]:border data-[indeterminate]:border-[var(--color-border)] data-[indeterminate]:bg-[var(--color-primary)]",
        "focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-1",
        className
      )}
      data-slot="checkbox-root"
      {...props}
    />
  );
}

function CheckboxIndicator({ className, ...props }: Checkbox.Indicator.Props) {
  return (
    <Checkbox.Indicator
      className={cn(
        "flex h-full w-full items-center justify-center text-[color:var(--color-primary-foreground)]",
        "[&>svg]:h-4 [&>svg]:w-4",
        "data-[unchecked]:not-data-[indeterminate]:hidden",
        className
      )}
      data-slot="checkbox-indicator"
      {...props}
    />
  );
}

export { CheckboxRoot as Checkbox, CheckboxIndicator };
