"use client";

import { Fieldset } from "@base-ui/react/fieldset";
import { cn } from "@/lib/utils-tailwind";

function FieldsetRoot({ className, ...props }: Fieldset.Root.Props) {
  return (
    <Fieldset.Root
      className={cn("m-0 flex w-full flex-col gap-4 border-0 p-0", className)}
      data-slot="fieldset-root"
      {...props}
    />
  );
}

function FieldsetLegend({ className, ...props }: Fieldset.Legend.Props) {
  return (
    <Fieldset.Legend
      className={cn(
        "border-[oklch(from_var(--border)_l_c_h_/_0.7)] border-b pb-3",
        "font-medium text-base text-foreground leading-6 tracking-[-0.0025em]",
        className
      )}
      data-slot="fieldset-legend"
      {...props}
    />
  );
}

export { FieldsetRoot as Fieldset, FieldsetLegend };
