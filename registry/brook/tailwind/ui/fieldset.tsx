"use client";

import { Fieldset } from "@base-ui-components/react/fieldset";
import { cn } from "@/lib/tw-utils";

function FieldsetRoot({
  className,
  ...props
}: Fieldset.Root.Props) {
  return (
    <Fieldset.Root
      data-slot="fieldset-root"
      className={cn("m-0 flex w-full flex-col gap-4 border-0 p-0", className)}
      {...props}
    />
  );
}

function FieldsetLegend({
  className,
  ...props
}: Fieldset.Legend.Props) {
  return (
    <Fieldset.Legend
      data-slot="fieldset-legend"
      className={cn(
        "border-[oklch(from_var(--border)_l_c_h_/_0.7)] border-b pb-3",
        "font-medium text-base text-foreground leading-6 tracking-[-0.0025em]",
        className
      )}
      {...props}
    />
  );
}

export { FieldsetRoot as Fieldset, FieldsetLegend };
