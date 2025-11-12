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

function ComboboxPopup({ className, ...props }: Combobox.Popup.Props) {
  return (
    <Combobox.Popup
      className={cn(
        "max-h-80 overflow-auto rounded-[var(--radius)] border border-border bg-[var(--popover)]",
        "shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]",
        "w-full animate-[slideDown_150ms_ease-out] p-1 outline-none",
        "data-[starting-style]:-translate-y-2 data-[starting-style]:opacity-0",
        "data-[ending-style]:-translate-y-2 data-[ending-style]:opacity-0",
        "max-sm:max-w-[calc(100vw-2rem)] max-sm:p-1",
        className
      )}
      data-slot="combobox-popup"
      {...props}
    />
  );
}

function ComboboxList({ className, ...props }: Combobox.List.Props) {
  return <Combobox.List className={cn(className)} {...props} />;
}

function ComboboxEmpty({
  className,
  children,
  ...props
}: Combobox.Empty.Props) {
  return (
    <Combobox.Empty className={cn(className)} {...props}>
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
        "relative flex cursor-pointer select-none items-center gap-2 px-3 py-2 text-sm outline-none",
        "[.list:not(:has(.item[data-highlighted]))_&[data-selected]]:relative [.list:not(:has(.item[data-highlighted]))_&[data-selected]]:z-0",
        "[.list:not(:has(.item[data-highlighted]))_&[data-selected]]:before:-z-10 [.list:not(:has(.item[data-highlighted]))_&[data-selected]]:before:content-['']",
        "[.list:not(:has(.item[data-highlighted]))_&[data-selected]]:before:absolute [.list:not(:has(.item[data-highlighted]))_&[data-selected]]:before:inset-0",
        "[.list:not(:has(.item[data-highlighted]))_&[data-selected]]:before:rounded-[calc(var(--radius)-2px)]",
        "[.list:not(:has(.item[data-highlighted]))_&[data-selected]]:before:bg-[var(--mix-accent-33-trans)]",
        "data-[highlighted]:relative data-[highlighted]:z-10",
        "data-[highlighted]:before:-z-10 data-[highlighted]:before:absolute data-[highlighted]:before:content-['']",
        "data-[highlighted]:before:inset-0 data-[highlighted]:before:rounded-[calc(var(--radius)-2px)]",
        "data-[highlighted]:before:bg-[var(--accent)]",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "max-sm:px-3 max-sm:py-2.5 max-sm:text-[0.9375rem]",
        className
      )}
      data-slot="combobox-item"
      {...props}
    >
      {indicatorPosition === "left" && (
        <Combobox.ItemIndicator
          className={cn(
            "flex h-4 w-4 items-center justify-center opacity-0 transition-opacity duration-150",
            "[[data-selected]_&]:opacity-100"
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
            "[[data-selected]_&]:opacity-100"
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
        "[[data-selected]_&]:opacity-100",
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
