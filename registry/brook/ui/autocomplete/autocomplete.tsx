"use client";

import { Autocomplete } from "@base-ui-components/react/autocomplete";
import { Search, X } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils";
import styles from "./autocomplete.module.css";

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
      className={cn(styles.input, className)}
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
      className={cn(styles.trigger, className)}
      {...props}
    >
      {children || <Search className={styles.icon} size={16} />}
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
      className={cn(styles.icon, className)}
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
      className={cn(styles.clear, className)}
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
      className={cn(styles.backdrop, className)}
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
      className={cn(styles.positioner, className)}
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
      className={cn(styles.popup, className)}
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
      className={cn(styles.arrow, className)}
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
      className={cn(styles.status, className)}
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
      className={cn(styles.list, className)}
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
      className={cn(styles.empty, className)}
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
      className={cn(styles.row, className)}
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
      className={cn(styles.item, className)}
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
      className={cn(styles.group, className)}
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
      className={cn(styles.groupLabel, className)}
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
      className={cn(styles.separator, className)}
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
