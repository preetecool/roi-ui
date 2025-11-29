"use client";

import { Combobox } from "@base-ui-components/react/combobox";
import { Check, ChevronsUpDown, X } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils-tailwind";

function ComboboxRoot<
  ItemValue,
  Multiple extends boolean | undefined = undefined,
>(props: React.ComponentProps<typeof Combobox.Root<ItemValue, Multiple>>) {
  return <Combobox.Root<ItemValue, Multiple> {...props} />;
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: Combobox.Trigger.Props) {
  return (
    <Combobox.Trigger
      className={cn(
        "box-border flex cursor-pointer items-center justify-center border-none bg-transparent px-2",
        "focus-visible:outline-none",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className
      )}
      data-slot="combobox-trigger"
      {...props}
    >
      {children}
      <ChevronsUpDown
        className="ml-2 h-4 w-4 flex-shrink-0 opacity-50"
        size={16}
      />
    </Combobox.Trigger>
  );
}

function ComboboxInput({ className, ...props }: Combobox.Input.Props) {
  return (
    <Combobox.Input
      className={cn(
        "h-10 w-full flex-1 border-none bg-transparent px-3 py-2 text-foreground text-sm outline-none",
        "placeholder:text-muted-foreground",
        "focus:!outline-none focus-visible:!outline-none",
        "max-sm:h-11 max-sm:px-4 max-sm:py-2 max-sm:text-[0.9375rem] max-sm:placeholder:text-[0.9375rem]",
        className
      )}
      data-slot="combobox-input"
      {...props}
    />
  );
}

function ComboboxClear({
  className,
  children,
  ...props
}: Combobox.Clear.Props) {
  return (
    <Combobox.Clear
      className={cn(
        "flex cursor-pointer items-center justify-center rounded-[calc(var(--radius)-2px)] p-1",
        "text-muted-foreground transition-all duration-150",
        "hover:bg-accent hover:text-foreground",
        className
      )}
      data-slot="combobox-clear"
      {...props}
    >
      {children || <X size={16} />}
    </Combobox.Clear>
  );
}

const ComboboxPortal = Combobox.Portal;

function ComboboxPositioner({
  className,
  ...props
}: Combobox.Positioner.Props) {
  return (
    <Combobox.Positioner
      className={cn(
        "absolute top-full left-0 z-[150] mt-1 w-[var(--anchor-width)]",
        className
      )}
      data-slot="combobox-positioner"
      sideOffset={4}
      {...props}
    />
  );
}

function ComboboxPopup({
  className,
  children,
  ...props
}: Combobox.Popup.Props) {
  return (
    <Combobox.Popup
      className={cn(
        "box-border flex flex-col rounded-[var(--radius)]",
        "bg-[var(--popover)] text-popover-foreground",
        "max-h-[min(var(--available-height),20rem)] w-[var(--anchor-width)] max-w-[var(--available-width)]",
        "overflow-y-auto overscroll-contain [scroll-padding-block:0.5rem]",
        "border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.8)] shadow-[var(--shadow-border-stack)]",
        "origin-[var(--transform-origin)] transition-[transform,opacity] duration-250 ease-[var(--ease-out-expo)]",
        "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
        "data-[ending-style]:transition-none",
        "max-sm:max-w-[calc(100vw-2rem)]",
        className
      )}
      data-slot="combobox-popup"
      {...props}
    >
      <div style={{ height: "4px", width: "100%", flexShrink: 0 }} />
      {children}
      <div style={{ height: "4px", width: "100%", flexShrink: 0 }} />
    </Combobox.Popup>
  );
}

function ComboboxList({ className, ...props }: Combobox.List.Props) {
  return (
    <Combobox.List
      className={cn("flex flex-col gap-px outline-none", className)}
      {...props}
    />
  );
}

function ComboboxEmpty({
  className,
  children,
  ...props
}: Combobox.Empty.Props) {
  return (
    <Combobox.Empty
      className={cn(
        "empty:p-0 empty:m-0",
        "py-8 px-4 text-center text-sm text-muted-foreground",
        "max-sm:py-6 max-sm:px-4 max-sm:text-[0.9375rem]",
        className
      )}
      {...props}
    >
      {children || "No items found"}
    </Combobox.Empty>
  );
}

function ComboboxItem({
  className,
  children,
  indicatorPosition = "left",
  ...props
}: Combobox.Item.Props & {
  indicatorPosition?: "left" | "right";
}) {
  return (
    <Combobox.Item
      className={cn(
        "mx-1 flex h-8 cursor-pointer items-center justify-start gap-3",
        "rounded-[0.3125rem] px-2 pr-1.5 text-xs font-normal leading-[1.2] text-foreground",
        "bg-transparent hover:bg-[var(--accent)] focus:bg-[var(--accent)] focus:outline-none focus-visible:outline-none",
        "data-[selected]:bg-[var(--mix-accent-33-trans)] data-[highlighted]:bg-[var(--accent)]",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:bg-transparent",
        "max-sm:min-h-[2.75rem] max-sm:gap-3 max-sm:px-3 max-sm:py-2.5 max-sm:text-[0.9375rem]",
        className
      )}
      data-slot="combobox-item"
      {...props}
    >
      {indicatorPosition === "left" && (
        <Combobox.ItemIndicator
          className={cn(
            "flex h-4 w-4 items-center justify-center opacity-0 transition-opacity duration-150",
            "[[data-selected]_&]:opacity-100 [[data-selected]_&]:m-1"
          )}
          data-slot="combobox-itemindicator"
        >
          <Check size={16} />
        </Combobox.ItemIndicator>
      )}
      {children}
      {indicatorPosition === "right" && (
        <Combobox.ItemIndicator
          className={cn(
            "flex h-4 w-4 items-center justify-center opacity-0 transition-opacity duration-150",
            "[[data-selected]_&]:opacity-100 [[data-selected]_&]:m-1"
          )}
          data-slot="combobox-itemindicator"
        >
          <Check size={16} />
        </Combobox.ItemIndicator>
      )}
    </Combobox.Item>
  );
}

function ComboboxItemIndicator({
  className,
  children,
  ...props
}: Combobox.ItemIndicator.Props) {
  return (
    <Combobox.ItemIndicator
      className={cn(
        "flex h-4 w-4 items-center justify-center opacity-0 transition-opacity duration-150",
        "[[data-selected]_&]:opacity-100 [[data-selected]_&]:m-1",
        className
      )}
      data-slot="combobox-itemindicator"
      {...props}
    >
      {children || <Check size={16} />}
    </Combobox.ItemIndicator>
  );
}

function ComboboxGroup({ className, ...props }: Combobox.Group.Props) {
  return <Combobox.Group className={cn("py-1", className)} {...props} />;
}

function ComboboxGroupLabel({
  className,
  ...props
}: Combobox.GroupLabel.Props) {
  return (
    <Combobox.GroupLabel
      className={cn(
        "px-3 py-2 font-medium text-muted-foreground text-xs",
        className
      )}
      data-slot="combobox-grouplabel"
      {...props}
    />
  );
}

function ComboboxArrow({ className, ...props }: Combobox.Arrow.Props) {
  return (
    <Combobox.Arrow
      className={cn(
        "-top-1 absolute left-4 h-2 w-2 rotate-45 border-border border-t border-l bg-card",
        className
      )}
      data-slot="combobox-arrow"
      {...props}
    />
  );
}

function ComboboxNoItems({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "px-4 py-8 text-center text-muted-foreground text-sm",
        "max-sm:px-4 max-sm:py-6 max-sm:text-[0.9375rem]",
        className
      )}
      {...props}
    >
      {children || "No items found"}
    </div>
  );
}

export {
  ComboboxRoot as Combobox,
  ComboboxArrow,
  ComboboxClear,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxNoItems,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxTrigger,
};
