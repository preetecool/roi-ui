"use client";

import { Accordion } from "@base-ui/react/accordion";
import { cn } from "@/lib/utils-tailwind";

function AccordionRoot({ className, ...props }: Accordion.Root.Props) {
  return (
    <Accordion.Root
      className={cn("flex w-[32rem] max-w-[calc(100vw-8rem)] flex-col", className)}
      data-slot="accordion-root"
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: Accordion.Item.Props) {
  return (
    <Accordion.Item
      className={cn(
        "overflow-hidden border-border border-b-[0.5px] bg-[var(--mix-card-75-bg)] p-4",
        "transition-[margin,border-radius,border-color] duration-200 ease-[var(--ease-in-out-quad)]",
        // Default state - first item has top rounded, last item has bottom rounded
        "first:rounded-t-3xl",
        "last:rounded-b-3xl last:border-b-transparent",
        "first:last:rounded-3xl",
        // Expanded item gets full rounded corners and unsticks with margins
        "data-[open]:my-2 data-[open]:rounded-3xl data-[open]:border-b-transparent",
        "data-[open]:last:mb-0 data-[open]:first:mt-0",
        // Item before an expanded item gets rounded bottom only
        "[&:has(+*[data-open]):not([data-open])]:rounded-t-none [&:has(+*[data-open]):not([data-open])]:rounded-b-3xl [&:has(+*[data-open]):not([data-open])]:border-b-transparent",
        "[&:has(+*[data-open]):not([data-open]):first-child]:rounded-3xl",
        // Item after an expanded item gets rounded top only
        "[*[data-open]+&:not([data-open])]:rounded-t-3xl [*[data-open]+&:not([data-open])]:rounded-b-none",
        "[*[data-open]+&:not([data-open]):last-child]:rounded-3xl",
        // Item sandwiched between two expanded items gets full rounded corners
        "[*[data-open]+&:not([data-open]):has(+*[data-open])]:rounded-3xl [*[data-open]+&:not([data-open]):has(+*[data-open])]:border-b-transparent",
        className
      )}
      data-slot="accordion-item"
      {...props}
    />
  );
}

function AccordionHeader({ className, ...props }: Accordion.Header.Props) {
  return <Accordion.Header className={cn("m-0", className)} data-slot="accordion-header" {...props} />;
}

function AccordionTrigger({ className, children, ...props }: Accordion.Trigger.Props) {
  return (
    <Accordion.Trigger
      className={cn(
        "group flex w-full cursor-pointer items-center gap-4 border-none bg-transparent text-left",
        "font-[350] text-base text-secondary-foreground tracking-[-0.02em]",
        className
      )}
      data-slot="accordion-trigger"
      {...props}
    >
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center text-muted-foreground",
          "transition-[color,rotate] duration-[200ms,150ms] ease-[ease,var(--ease-in-out-quad)]",
          "rotate-0",
          "[[data-panel-open]_&]:rotate-90",
          "group-hover:text-foreground"
        )}
      >
        <svg aria-label="Accordion toggle icon" fill="none" height="18" role="img" viewBox="0 0 20 20" width="18">
          <title>Toggle accordion</title>
          <path
            className={cn(
              "origin-center transition-[opacity,scale] duration-150 ease-[var(--ease-in-out-quad)]",
              "[[data-panel-open]_&]:scale-0 [[data-panel-open]_&]:opacity-0"
            )}
            d="M4 10L16 10"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path d="M10 4L10 16" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        </svg>
      </div>
      <div>{children}</div>
    </Accordion.Trigger>
  );
}

function AccordionPanel({ className, children, ...props }: Accordion.Panel.Props) {
  return (
    <Accordion.Panel
      className={cn(
        "h-[var(--accordion-panel-height)] overflow-hidden",
        "transition-[height] duration-150 ease-[var(--ease-in-out-quad)]",
        "data-[ending-style]:h-0 data-[starting-style]:h-0",
        className
      )}
      data-slot="accordion-panel"
      {...props}
    >
      <div className="w-full overflow-hidden">
        <div className="ml-12 pr-12 text-foreground/75 text-sm leading-[1.6] max-sm:ml-10 max-sm:pr-0 max-sm:text-[0.9375rem] max-sm:leading-[1.5]">
          {children}
        </div>
      </div>
    </Accordion.Panel>
  );
}

export { AccordionRoot as Accordion, AccordionHeader, AccordionItem, AccordionPanel, AccordionRoot, AccordionTrigger };
