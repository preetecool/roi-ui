"use client";

import { Combobox } from "@base-ui/react/combobox";
import { Check, ChevronsUpDown, X } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils-tailwind";
import { Input } from "@/registry/brook/tailwind/ui/input";

function ComboboxRoot<ItemValue, Multiple extends boolean | undefined = undefined>(
  props: React.ComponentProps<typeof Combobox.Root<ItemValue, Multiple>>
) {
  return <Combobox.Root<ItemValue, Multiple> {...props} />;
}

function ComboboxTrigger({ className, children, ...props }: Combobox.Trigger.Props) {
  return (
    <Combobox.Trigger
      className={cn(
        "-translate-y-1/2 absolute top-1/2 right-2",
        "flex cursor-pointer items-center justify-center border-none bg-transparent p-1",
        "focus-visible:outline-none",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className
      )}
      data-slot="combobox-trigger"
      {...props}
    >
      {children}
      <ChevronsUpDown className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-none" size={16} />
    </Combobox.Trigger>
  );
}

function ComboboxInput({ className, ...props }: Combobox.Input.Props) {
  return <Combobox.Input className={className} data-slot="combobox-input" render={<Input />} {...props} />;
}

function ComboboxClear({ className, children, ...props }: Combobox.Clear.Props) {
  return (
    <Combobox.Clear
      className={cn(
        "-translate-y-1/2 absolute top-1/2 right-2",
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

function ComboboxPositioner({ className, ...props }: Combobox.Positioner.Props) {
  return (
    <Combobox.Positioner
      className={cn("absolute top-full left-0 z-[150] w-[var(--anchor-width)]", className)}
      data-slot="combobox-positioner"
      sideOffset={4}
      {...props}
    />
  );
}

function ComboboxPopup({ className, children, ...props }: Combobox.Popup.Props) {
  return (
    <Combobox.Popup
      className={cn(
        "box-border flex flex-col rounded-[var(--radius)]",
        "bg-[var(--popover)] text-popover-foreground",
        "max-h-[min(var(--available-height),20rem)] w-[var(--anchor-width)] max-w-[var(--available-width)]",
        "overflow-y-auto overscroll-contain [scroll-padding-block:0.5rem]",
        "shadow-[0_0_0_0.5px_oklch(from_var(--border)_l_c_h_/_0.8),var(--shadow-border-stack)]",
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
      data-slot="combobox-list"
      {...props}
    />
  );
}

function ComboboxEmpty({ className, children, ...props }: Combobox.Empty.Props) {
  return (
    <Combobox.Empty
      className={cn(
        "empty:m-0 empty:p-0",
        "px-4 py-8 text-center text-muted-foreground text-sm",
        "max-sm:px-4 max-sm:py-6 max-sm:text-[0.9375rem]",
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
        "relative isolate mx-1 flex min-h-8 cursor-pointer items-center justify-start gap-3",
        "px-2 pr-1.5 font-normal text-foreground text-xs leading-[1.2]",
        "before:-z-10 before:absolute before:inset-0 before:rounded-[calc(var(--radius)-4px)] before:bg-transparent before:content-['']",
        "hover:before:bg-[var(--accent)] focus:outline-none focus:before:bg-[var(--accent)] focus-visible:outline-none",
        "data-[highlighted]:before:bg-[var(--accent)]",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:before:bg-transparent",
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
            "[[data-selected]_&]:m-1 [[data-selected]_&]:opacity-100"
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
            "[[data-selected]_&]:m-1 [[data-selected]_&]:opacity-100"
          )}
          data-slot="combobox-itemindicator"
        >
          <Check size={16} />
        </Combobox.ItemIndicator>
      )}
    </Combobox.Item>
  );
}

function ComboboxItemIndicator({ className, children, ...props }: Combobox.ItemIndicator.Props) {
  return (
    <Combobox.ItemIndicator
      className={cn(
        "flex h-4 w-4 items-center justify-center opacity-0 transition-opacity duration-150",
        "[[data-selected]_&]:m-1 [[data-selected]_&]:opacity-100",
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

function ComboboxGroupLabel({ className, ...props }: Combobox.GroupLabel.Props) {
  return (
    <Combobox.GroupLabel
      className={cn("px-3 py-2 font-medium text-muted-foreground text-xs", className)}
      data-slot="combobox-grouplabel"
      {...props}
    />
  );
}

function ComboboxArrow({ className, ...props }: Combobox.Arrow.Props) {
  return (
    <Combobox.Arrow
      className={cn("-top-1 absolute left-4 h-2 w-2 rotate-45 border-border border-t border-l bg-card", className)}
      data-slot="combobox-arrow"
      {...props}
    />
  );
}

function ComboboxNoItems({ className, children, ...props }: React.ComponentProps<"div">) {
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

function ComboboxChips({ className, ref, ...props }: Combobox.Chips.Props & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <Combobox.Chips
      className={cn(
        "box-border flex w-full flex-wrap items-center gap-1",
        "rounded-[var(--radius)] border-none bg-[var(--mix-card-50-bg)] p-1 px-1.5",
        "shadow-[0_0_0_1px_oklch(from_var(--border)_l_c_h_/_0.5)]",
        "focus-within:shadow-[0_0_0_1px_var(--ring),0_0_0_3px_oklch(from_var(--ring)_l_c_h_/_0.2)]",
        className
      )}
      data-slot="combobox-chips"
      ref={ref}
      {...props}
    />
  );
}

function ComboboxChip({ className, ...props }: Combobox.Chip.Props) {
  return (
    <Combobox.Chip
      className={cn(
        "flex cursor-default items-center gap-1 overflow-hidden rounded-[calc(var(--radius)-2px)]",
        "bg-secondary text-foreground text-sm",
        "py-0.5 pr-0.5 pl-2 outline-0",
        "focus-within:bg-primary focus-within:text-primary-foreground",
        "data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground",
        "max-sm:text-[0.9375rem]",
        className
      )}
      data-slot="combobox-chip"
      {...props}
    />
  );
}

function ComboboxChipRemove({ className, children, ...props }: Combobox.ChipRemove.Props) {
  return (
    <Combobox.ChipRemove
      className={cn(
        "flex cursor-pointer items-center justify-center rounded-[calc(var(--radius)-4px)] border-none bg-none p-1",
        "text-inherit hover:bg-[oklch(from_var(--foreground)_l_c_h_/_0.1)]",
        className
      )}
      data-slot="combobox-chipremove"
      {...props}
    >
      {children || <X size={14} />}
    </Combobox.ChipRemove>
  );
}

function ComboboxChipsInput({ className, ...props }: Combobox.Input.Props) {
  return (
    <Combobox.Input
      className={cn(
        "box-border h-8 min-w-12 flex-1 rounded-[var(--radius)] border-none bg-transparent",
        "m-0 pl-2 font-[inherit] text-foreground text-sm",
        "placeholder:text-muted-foreground focus:outline-none",
        "max-sm:text-[0.9375rem]",
        className
      )}
      data-slot="combobox-chipsinput"
      {...props}
    />
  );
}

const ComboboxValue = Combobox.Value;

export {
  ComboboxRoot as Combobox,
  ComboboxArrow,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxChipsInput,
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
  ComboboxValue,
};
