"use client";

import { Checkbox } from "@base-ui-components/react/checkbox";
import { cn } from "@/lib/tw-utils";

function CheckboxRoot({
  className,
  ...props
}: React.ComponentProps<typeof Checkbox.Root>) {
  return (
    <Checkbox.Root
      className={cn(
        "hit-area-extend flex h-[1.125rem] w-[1.125rem] items-center justify-center",
        "relative flex-shrink-0 cursor-pointer rounded-[0.3125rem] border-none bg-transparent",
        "data-[unchecked]:border data-[unchecked]:border-border/80 data-[unchecked]:bg-transparent",
        "data-[checked]:border data-[checked]:border-border data-[checked]:bg-primary",
        "focus-visible:outline focus-visible:outline-1 focus-visible:outline-ring focus-visible:outline-offset-1",
        className
      )}
      {...props}
    />
  );
}

function CheckboxIndicator({
  className,
  ...props
}: React.ComponentProps<typeof Checkbox.Indicator>) {
  return (
    <Checkbox.Indicator
      className={cn(
        "flex h-full w-full scale-0 items-center justify-center text-primary-foreground",
        "data-[unchecked]:hidden",
        "[[data-checked]_&]:scale-100",
        className
      )}
      {...props}
    />
  );
}

export { CheckboxRoot as Checkbox, CheckboxIndicator };
