"use client";

import { Accordion } from "@base-ui-components/react/accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils-tailwind";

function AccordionRoot({ className, ...props }: Accordion.Root.Props) {
  return (
    <Accordion.Root
      className={cn(
        "flex w-[32rem] max-w-[calc(100vw-8rem)] cursor-inherit flex-col",
        className
      )}
      data-slot="accordion-root"
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: Accordion.Item.Props) {
  return (
    <Accordion.Item
      className={cn(
        "border-border/80 border-b-[0.5px] last:border-b-0",
        className
      )}
      data-slot="accordion-item"
      {...props}
    />
  );
}

function AccordionHeader({ className, ...props }: Accordion.Header.Props) {
  return (
    <Accordion.Header
      className={cn("m-0 font-medium text-sm tracking-inherit", className)}
      data-slot="accordion-header"
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: Accordion.Trigger.Props) {
  return (
    <Accordion.Trigger
      className={cn(
        "box-border flex w-full cursor-pointer items-center justify-between border-none bg-transparent px-0 text-left font-normal",
        "h-[41.5px]",
        "text-[14px]",
        "text-secondary-foreground",
        "hover:text-foreground hover:underline [&:hover_svg]:text-foreground",
        "focus:outline-none focus-visible:z-[1] focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:bg-transparent",
        className
      )}
      data-slot="accordion-trigger"
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
}: Accordion.Panel.Props) {
  return (
    <Accordion.Panel
      className={cn(
        "box-border h-[var(--accordion-panel-height)] overflow-hidden leading-[1.4rem]",
        "transition-[height] duration-150",
        "data-[ending-style]:h-0 data-[starting-style]:h-0",
        className
      )}
      data-slot="accordion-panel"
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
