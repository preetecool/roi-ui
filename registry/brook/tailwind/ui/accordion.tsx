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
      className={cn(
        "w-[32rem] max-w-[calc(100vw-8rem)] cursor-inherit",
        className
      )}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Accordion.Item>) {
  return (
    <Accordion.Item
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
}: React.ComponentPropsWithoutRef<typeof Accordion.Header>) {
  return (
    <Accordion.Header
      className={cn("m-0 font-medium text-sm tracking-inherit", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Accordion.Trigger>) {
  return (
    <Accordion.Trigger
      className={cn(
        "flex w-full cursor-pointer items-center justify-between border-none bg-transparent px-0 text-left font-normal",
        "h-[41.5px]",
        "text-secondary-foreground transition-[padding] duration-150 ease-in-out",
        "hover:text-foreground hover:underline [&:hover_svg]:text-foreground",
        "focus:outline-none focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:bg-transparent",
        "data-[panel-open]:transition-[padding-bottom] data-[panel-open]:duration-150 data-[panel-open]:ease-in-out",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-150 ease-in-out",
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
}: React.ComponentPropsWithoutRef<typeof Accordion.Panel>) {
  return (
    <Accordion.Panel
      className={cn(
        "box-border h-[var(--accordion-panel-height)] overflow-hidden transition-[height] duration-150 ease-in-out",
        "data-[ending-style]:h-0 data-[starting-style]:h-0",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "pr-3 pb-5 pl-0 font-normal text-secondary-foreground text-sm leading-[1.5]",
          "relative transition-[padding-top] duration-150 ease-in-out",
          "[[data-open]_&]:pt-3",
          "[[data-ending-style]_&]:pt-0"
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
