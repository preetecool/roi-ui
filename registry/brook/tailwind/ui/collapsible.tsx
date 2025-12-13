"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { cn } from "@/lib/utils-tailwind";

function CollapsibleRoot({ className, ...props }: Collapsible.Root.Props) {
  return (
    <Collapsible.Root
      className={cn(
        "flex w-full max-w-56 flex-col justify-center text-foreground",
        className
      )}
      data-slot="collapsible-root"
      {...props}
    />
  );
}

function CollapsibleTrigger({
  className,
  children,
  ...props
}: Collapsible.Trigger.Props) {
  return (
    <Collapsible.Trigger
      className={cn(
        "m-0 flex items-center justify-between rounded px-2 py-1 outline-none",
        "bg-[var(--mix-card-15-bg)] text-foreground",
        "cursor-pointer font-inherit font-medium text-sm leading-5",
        "border border-border transition-all duration-150 ease-out",
        "hover:bg-[var(--mix-card-50-bg)]",
        "active:bg-[var(--mix-card-15-bg)]",
        "focus-visible:outline-2 focus-visible:outline-ring",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "data-[disabled]:hover:bg-muted",
        className
      )}
      data-slot="collapsible-trigger"
      {...props}
    >
      {children}
      <svg
        aria-hidden="true"
        className={cn(
          "h-3 w-3 flex-shrink-0 text-muted-foreground",
          "[&_path:first-child]:transition-transform [&_path:first-child]:duration-200 [&_path:first-child]:ease-[var(--ease-out-expo)]",
          "[&_path:first-child]:origin-center",
          "[&_path:last-child]:transition-transform [&_path:last-child]:duration-200 [&_path:last-child]:ease-[var(--ease-out-expo)]",
          "[&_path:last-child]:origin-center",
          "[[data-panel-open]_&_path:first-child]:-translate-y-2.5",
          "[[data-panel-open]_&_path:last-child]:translate-y-2.5"
        )}
        fill="none"
        height="16"
        viewBox="0 0 24 24"
        width="16"
      >
        <path
          d="m7 15 5 5 5-5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="m7 9 5-5 5 5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </Collapsible.Trigger>
  );
}

function CollapsiblePanel({ className, ...props }: Collapsible.Panel.Props) {
  return (
    <Collapsible.Panel
      className={cn(
        "flex h-[var(--collapsible-panel-height)] flex-col justify-end overflow-hidden",
        "box-border w-full text-sm leading-5 transition-all duration-150 ease-out",
        "data-[ending-style]:h-0 data-[starting-style]:h-0",
        className
      )}
      data-slot="collapsible-panel"
      {...props}
    />
  );
}

export { CollapsibleRoot as Collapsible, CollapsiblePanel, CollapsibleTrigger };
