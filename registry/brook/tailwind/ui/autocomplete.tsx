"use client";

import { Autocomplete } from "@base-ui-components/react/autocomplete";
import { Search, X } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils-tailwind";
import { Input } from "@/registry/brook/tailwind/ui/input";

function AutocompleteRoot({
  ...props
}: React.ComponentProps<typeof Autocomplete.Root>) {
  return <Autocomplete.Root {...props} />;
}

function AutocompleteValue({
  ...props
}: React.ComponentProps<typeof Autocomplete.Value>) {
  return <Autocomplete.Value data-slot="autocomplete-value" {...props} />;
}

function AutocompleteInput({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Input>) {
  return (
    <Autocomplete.Input className={className} render={<Input />} {...props} />
  );
}

function AutocompleteTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Autocomplete.Trigger>) {
  return (
    <Autocomplete.Trigger
      className={cn(
        "flex cursor-pointer items-center justify-center border-none bg-transparent p-2",
        "text-muted-foreground transition-colors duration-150",
        "hover:text-foreground",
        "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className
      )}
      data-slot="autocomplete-trigger"
      {...props}
    >
      {children || (
        <Search className="h-4 w-4 flex-shrink-0 opacity-60" size={16} />
      )}
    </Autocomplete.Trigger>
  );
}

function AutocompleteIcon({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Autocomplete.Icon>) {
  return (
    <Autocomplete.Icon
      className={cn("h-4 w-4 flex-shrink-0 opacity-60", className)}
      data-slot="autocomplete-icon"
      {...props}
    >
      {children || <Search size={16} />}
    </Autocomplete.Icon>
  );
}

function AutocompleteClear({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Autocomplete.Clear>) {
  return (
    <Autocomplete.Clear
      className={cn(
        "flex cursor-pointer items-center justify-center rounded-[calc(var(--radius)-2px)] p-1",
        "text-muted-foreground transition-all duration-150",
        "hover:bg-accent hover:text-foreground",
        "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className
      )}
      data-slot="autocomplete-clear"
      {...props}
    >
      {children || <X size={16} />}
    </Autocomplete.Clear>
  );
}

const AutocompletePortal = Autocomplete.Portal;

function AutocompleteBackdrop({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Backdrop>) {
  return (
    <Autocomplete.Backdrop
      className={cn(
        "fixed inset-0 z-[140] bg-[var(--dialog-overlay)] opacity-0 transition-opacity duration-150",
        "data-[open]:opacity-100",
        className
      )}
      data-slot="autocomplete-backdrop"
      {...props}
    />
  );
}

function AutocompletePositioner({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Positioner>) {
  return (
    <Autocomplete.Positioner
      className={cn(
        "absolute z-[150] w-[var(--anchor-width)] outline-none",
        className
      )}
      data-slot="autocomplete-positioner"
      sideOffset={4}
      {...props}
    />
  );
}

function AutocompletePopup({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Popup>) {
  return (
    <Autocomplete.Popup
      className={cn(
        "mt-px box-border rounded-[var(--radius)] p-1",
        "bg-[var(--popover)] text-popover-foreground",
        "max-h-[min(var(--available-height),23rem)] w-[var(--anchor-width)] max-w-[var(--available-width)]",
        "overflow-y-auto overscroll-contain [scroll-padding-block:0.5rem]",
        "border border-border shadow-[var(--shadow-border-stack)]",
        "origin-[var(--transform-origin)] animate-[slideDownAndFade_150ms_ease-out]",
        "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
        "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
        "max-sm:max-w-[calc(100vw-2rem)] max-sm:p-2",
        className
      )}
      data-slot="autocomplete-popup"
      {...props}
    />
  );
}

function AutocompleteArrow({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Arrow>) {
  return (
    <Autocomplete.Arrow
      className={cn(
        "absolute h-2 w-2 rotate-45 border border-border bg-[var(--mix-card-33-bg)]",
        "data-[side=top]:-bottom-1 data-[side=top]:border-r-0 data-[side=top]:border-b-0",
        "data-[side=right]:-left-1 data-[side=right]:border-b-0 data-[side=right]:border-l-0",
        "data-[side=bottom]:-top-1 data-[side=bottom]:border-t-0 data-[side=bottom]:border-l-0",
        "data-[side=left]:-right-1 data-[side=left]:border-t-0 data-[side=left]:border-r-0",
        className
      )}
      data-slot="autocomplete-arrow"
      {...props}
    />
  );
}

function AutocompleteStatus({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Status>) {
  return (
    <Autocomplete.Status
      className={cn("px-4 py-2 text-muted-foreground text-sm", className)}
      data-slot="autocomplete-status"
      {...props}
    />
  );
}

function AutocompleteList({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.List>) {
  return (
    <Autocomplete.List
      className={cn("outline-none", className)}
      data-slot="autocomplete-list"
      {...props}
    />
  );
}

function AutocompleteEmpty({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Autocomplete.Empty>) {
  return (
    <Autocomplete.Empty
      className={cn(
        "box-border p-4 text-center text-[0.925rem] text-muted-foreground",
        "empty:m-0 empty:p-0",
        "max-sm:p-5 max-sm:text-[0.9375rem]",
        className
      )}
      data-slot="autocomplete-empty"
      {...props}
    >
      {children || "No items found"}
    </Autocomplete.Empty>
  );
}

function AutocompleteCollection({
  ...props
}: React.ComponentProps<typeof Autocomplete.Collection>) {
  return (
    <Autocomplete.Collection data-slot="autocomplete-collection" {...props} />
  );
}

function AutocompleteRow({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Row>) {
  return (
    <Autocomplete.Row
      className={cn("flex items-center", className)}
      data-slot="autocomplete-row"
      {...props}
    />
  );
}

function AutocompleteItem({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Item>) {
  return (
    <Autocomplete.Item
      className={cn(
        "relative z-0 flex cursor-pointer select-none items-center gap-2 px-3 py-2 text-sm outline-none",
        "data-[highlighted]:relative data-[highlighted]:z-10",
        "data-[highlighted]:before:-z-10 data-[highlighted]:before:absolute data-[highlighted]:before:content-['']",
        "data-[highlighted]:before:inset-0 data-[highlighted]:before:rounded-[calc(var(--radius)-2px)]",
        "data-[highlighted]:before:bg-[var(--accent)]",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "max-sm:px-4 max-sm:py-3 max-sm:text-[0.9375rem]",
        className
      )}
      data-slot="autocomplete-item"
      {...props}
    />
  );
}

function AutocompleteGroup({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Group>) {
  return (
    <Autocomplete.Group
      className={cn("py-1", className)}
      data-slot="autocomplete-group"
      {...props}
    />
  );
}

function AutocompleteGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.GroupLabel>) {
  return (
    <Autocomplete.GroupLabel
      className={cn(
        "px-3 pt-2 pb-1 font-medium text-muted-foreground text-xs uppercase tracking-wide",
        className
      )}
      data-slot="autocomplete-group-label"
      {...props}
    />
  );
}

function AutocompleteSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Separator>) {
  return (
    <Autocomplete.Separator
      className={cn("mx-3 my-1.5 h-px bg-border", className)}
      data-slot="autocomplete-separator"
      {...props}
    />
  );
}

export {
  AutocompleteRoot as Autocomplete,
  AutocompleteArrow,
  AutocompleteBackdrop,
  AutocompleteClear,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompleteRow,
  AutocompleteSeparator,
  AutocompleteStatus,
  AutocompleteTrigger,
  AutocompleteValue,
};
