"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import { cn } from "@/lib/utils-tailwind";

function RadioGroupRoot({ className, ...props }: RadioGroup.Props) {
  return <RadioGroup className={cn("flex flex-col gap-2", className)} {...props} />;
}

function RadioRoot({ className, ...props }: Radio.Root.Props) {
  return (
    <Radio.Root
      className={cn(
        "flex aspect-square h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] bg-[oklch(from_var(--accent)_l_c_h_/_0.7)]",
        "hover:border-[oklch(from_var(--secondary-foreground)_l_c_h_/_0.4)]",
        "data-[focused]:border-[var(--ring)] data-[focused]:shadow-[0_0_0_2px_var(--ring)] data-[focused]:outline-none",
        "data-[checked]:border-[oklch(from_var(--secondary-foreground)_l_c_h_/_0.6)]",
        "data-[checked]:hover:border-[oklch(from_var(--secondary-foreground)_l_c_h_/_0.8)]",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className
      )}
      data-slot="radio-root"
      {...props}
    />
  );
}

function RadioIndicator({ className, ...props }: Radio.Indicator.Props) {
  return (
    <Radio.Indicator
      className={cn("h-2 w-2 rounded-full bg-[var(--primary)]", "scale-0 data-[checked]:scale-100", className)}
      data-slot="radio-indicator"
      {...props}
    />
  );
}

export { RadioRoot as Radio, RadioGroupRoot as RadioGroup, RadioIndicator };
