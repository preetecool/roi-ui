"use client";

import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import { cn } from "@/lib/utils-tailwind";

function CheckboxGroupRoot({ className, ...props }: CheckboxGroup.Props) {
  return <CheckboxGroup className={cn("flex flex-col gap-3", className)} data-slot="checkbox-group-root" {...props} />;
}

export { CheckboxGroupRoot as CheckboxGroup };
