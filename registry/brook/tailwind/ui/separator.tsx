"use client";

import { Separator } from "@base-ui-components/react/separator";
import { cn } from "@/lib/utils-tailwind";

function SeparatorRoot({ className, ...props }: Separator.Props) {
  return (
    <Separator
      className={cn(
        "border-none",
        "data-[orientation=horizontal]:h-[0.5px] data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-[0.5px]",
        className
      )}
      data-slot="separator"
      style={{
        backgroundColor: "oklch(from var(--border) l c h / 0.7)",
      }}
      {...props}
    />
  );
}

export { SeparatorRoot as Separator };
