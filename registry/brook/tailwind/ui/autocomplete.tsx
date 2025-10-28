"use client";

import { Autocomplete } from "@base-ui-components/react/autocomplete";
import { Search, X } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/tw-utils";

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
    <Autocomplete.Input
      data-slot="autocomplete-input"
      className={cn(
        "flex h-10 w-full rounded-[var(--radius)] border border-border",
        "bg-[var(--mix-card-50-bg)] px-3 text-sm transition-all duration-150 ease-out",
        "text-foreground placeholder:text-muted-foreground placeholder:text-sm",
        "data-[focused]:border-ring data-[focused]:shadow-[0_0_0_2px_rgba(var(--ring),0.2)] data-[focused]:outline-none",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "data-[invalid]:border-destructive",
        "data-[invalid]:data-[focused]:border-destructive data-[invalid]:data-[focused]:shadow-[0_0_0_2px_rgba(var(--destructive),0.2)] data-[invalid]:focus:border-destructive",
        "data-[valid]:border-success",
        "max-sm:h-11 max-sm:px-4 max-sm:text-[0.9375rem] max-sm:placeholder:text-[0.9375rem]",
        className
      )}
      {...props}
    />
  );
}

function AutocompleteTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Autocomplete.Trigger>) {
  return (
    <Autocomplete.Trigger
      data-slot="autocomplete-trigger"
      className={cn(
        "flex cursor-pointer items-center justify-center border-none bg-transparent p-2",
        "text-muted-foreground transition-colors duration-150",
        "hover:text-foreground",
        "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className
      )}
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
      data-slot="autocomplete-icon"
      className={cn("h-4 w-4 flex-shrink-0 opacity-60", className)}
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
      data-slot="autocomplete-clear"
      className={cn(
        "flex cursor-pointer items-center justify-center rounded-[calc(var(--radius)-2px)] p-1",
        "text-muted-foreground transition-all duration-150",
        "hover:bg-accent hover:text-foreground",
        "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className
      )}
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
      data-slot="autocomplete-backdrop"
      className={cn(
        "fixed inset-0 z-[140] bg-[var(--dialog-overlay)] opacity-0 transition-opacity duration-150",
        "data-[open]:opacity-100",
        className
      )}
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
      data-slot="autocomplete-positioner"
      className={cn(
        "absolute z-[150] w-[var(--anchor-width)] outline-none",
        className
      )}
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
      data-slot="autocomplete-popup"
      className={cn(
        "mt-px box-border rounded-[var(--radius)] p-1",
        "bg-[var(--mix-card-75-bg)] text-popover-foreground",
        "max-h-[min(var(--available-height),23rem)] w-[var(--anchor-width)] max-w-[var(--available-width)]",
        "overflow-y-auto overscroll-contain [scroll-padding-block:0.5rem]",
        "border border-border shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]",
        "origin-[var(--transform-origin)] animate-[slideDownAndFade_150ms_ease-out]",
        "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
        "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
        "max-sm:max-w-[calc(100vw-2rem)] max-sm:p-2",
        className
      )}
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
      data-slot="autocomplete-arrow"
      className={cn(
        "absolute h-2 w-2 rotate-45 border border-border bg-[var(--mix-card-33-bg)]",
        "data-[side=top]:-bottom-1 data-[side=top]:border-r-0 data-[side=top]:border-b-0",
        "data-[side=right]:-left-1 data-[side=right]:border-b-0 data-[side=right]:border-l-0",
        "data-[side=bottom]:-top-1 data-[side=bottom]:border-t-0 data-[side=bottom]:border-l-0",
        "data-[side=left]:-right-1 data-[side=left]:border-t-0 data-[side=left]:border-r-0",
        className
      )}
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
      data-slot="autocomplete-status"
      className={cn("px-4 py-2 text-muted-foreground text-sm", className)}
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
      data-slot="autocomplete-list"
      className={cn("outline-none", className)}
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
      data-slot="autocomplete-empty"
      className={cn(
        "box-border p-4 text-center text-[0.925rem] text-muted-foreground",
        "empty:m-0 empty:p-0",
        "max-sm:p-5 max-sm:text-[0.9375rem]",
        className
      )}
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
      data-slot="autocomplete-row"
      className={cn("flex items-center", className)}
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
      data-slot="autocomplete-item"
      className={cn(
        "relative z-0 flex cursor-pointer select-none items-center gap-2 px-3 py-2 text-sm outline-none",
        "data-[highlighted]:relative data-[highlighted]:z-10",
        "data-[highlighted]:before:-z-10 data-[highlighted]:before:absolute data-[highlighted]:before:content-['']",
        "data-[highlighted]:before:inset-0 data-[highlighted]:before:rounded-[calc(var(--radius)-2px)]",
        "data-[highlighted]:before:bg-[var(--mix-accent-33-trans)]",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "max-sm:px-4 max-sm:py-3 max-sm:text-[0.9375rem]",
        className
      )}
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
      data-slot="autocomplete-group"
      className={cn("py-1", className)}
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
      data-slot="autocomplete-group-label"
      className={cn(
        "px-3 pt-2 pb-1 font-medium text-muted-foreground text-xs uppercase tracking-wide",
        className
      )}
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
      data-slot="autocomplete-separator"
      className={cn("mx-3 my-1.5 h-px bg-border", className)}
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
