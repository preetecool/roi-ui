"use client";

import { Accordion } from "@base-ui-components/react/accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/tw-utils";

function AccordionRoot({
  className,
  ...props
}: React.ComponentProps<typeof Accordion.Root>) {
  return (
    <Accordion.Root
      data-slot="accordion-root"
      className={cn(
        "w-[32rem] max-w-[calc(100vw-8rem)] cursor-inherit flex flex-col",
        className
      )}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof Accordion.Item>) {
  return (
    <Accordion.Item
      data-slot="accordion-item"
      className={cn(
        "border-border/80 border-b-[0.5px] last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

function AccordionHeader({
  className,
  ...props
}: React.ComponentProps<typeof Accordion.Header>) {
  return (
    <Accordion.Header
      data-slot="accordion-header"
      className={cn("m-0 font-medium text-sm tracking-inherit", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Accordion.Trigger>) {
  return (
    <Accordion.Trigger
      data-slot="accordion-trigger"
      className={cn(
        "flex box-border w-full cursor-pointer items-center justify-between border-none bg-transparent px-0 text-left font-normal",
        "h-[41.5px]",
        "text-secondary-foreground",
        "hover:text-foreground hover:underline [&:hover_svg]:text-foreground",
        "focus:outline-none focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 focus-visible:z-[1]",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:bg-transparent",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-150 ease-[ease]",
          "[[data-panel-open]_&]:rotate-180"
        )}
      />
    </Accordion.Trigger>
  );
}

function AccordionPanel({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Accordion.Panel>) {
  return (
    <Accordion.Panel
      data-slot="accordion-panel"
      className={cn(
        "box-border h-[var(--accordion-panel-height)] overflow-hidden leading-[1.4rem]",
        "transition-[height] duration-150",
        "data-[ending-style]:h-0 data-[starting-style]:h-0",
        className
      )}
      style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
      {...props}
    >
      <div
        className={cn(
          "pr-3 pb-5 pl-0 font-normal text-secondary-foreground text-sm leading-[1.5]"
        )}
      >
        {children}
      </div>
    </Accordion.Panel>
  );
}

// biome-ignore lint/performance/noBarrelFile: Re-exporting icon as part of component API
export { ChevronDown as ChevronDownIcon } from "lucide-react";

export {
  AccordionRoot as Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionRoot,
  AccordionTrigger,
};
