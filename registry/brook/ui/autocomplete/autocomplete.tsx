"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { Search, X } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/registry/brook/ui/input/input";
import styles from "./autocomplete.module.css";

function AutocompleteRoot({ ...props }: React.ComponentProps<typeof Autocomplete.Root>) {
  return <Autocomplete.Root {...props} />;
}

function AutocompleteValue({ ...props }: React.ComponentProps<typeof Autocomplete.Value>) {
  return <Autocomplete.Value data-slot="autocomplete-value" {...props} />;
}

function AutocompleteInput({ className, ...props }: React.ComponentProps<typeof Autocomplete.Input>) {
  return <Autocomplete.Input className={className} render={<Input />} {...props} />;
}

function AutocompleteTrigger({ className, children, ...props }: React.ComponentProps<typeof Autocomplete.Trigger>) {
  return (
    <Autocomplete.Trigger className={cn(styles.trigger, className)} data-slot="autocomplete-trigger" {...props}>
      {children || <Search className={styles.icon} size={16} />}
    </Autocomplete.Trigger>
  );
}

function AutocompleteIcon({ className, children, ...props }: React.ComponentProps<typeof Autocomplete.Icon>) {
  return (
    <Autocomplete.Icon className={cn(styles.icon, className)} data-slot="autocomplete-icon" {...props}>
      {children || <Search size={16} />}
    </Autocomplete.Icon>
  );
}

function AutocompleteClear({ className, children, ...props }: React.ComponentProps<typeof Autocomplete.Clear>) {
  return (
    <Autocomplete.Clear className={cn(styles.clear, className)} data-slot="autocomplete-clear" {...props}>
      {children || <X size={16} />}
    </Autocomplete.Clear>
  );
}

const AutocompletePortal = Autocomplete.Portal;

function AutocompleteBackdrop({ className, ...props }: React.ComponentProps<typeof Autocomplete.Backdrop>) {
  return (
    <Autocomplete.Backdrop className={cn(styles.backdrop, className)} data-slot="autocomplete-backdrop" {...props} />
  );
}

function AutocompletePositioner({ className, ...props }: React.ComponentProps<typeof Autocomplete.Positioner>) {
  return (
    <Autocomplete.Positioner
      className={cn(styles.positioner, className)}
      data-slot="autocomplete-positioner"
      sideOffset={4}
      {...props}
    />
  );
}

function AutocompletePopup({ className, children, ...props }: React.ComponentProps<typeof Autocomplete.Popup>) {
  return (
    <Autocomplete.Popup className={cn(styles.popup, className)} data-slot="autocomplete-popup" {...props}>
      <div style={{ height: "4px", width: "100%" }} />
      {children}
      <div style={{ height: "4px", width: "100%" }} />
    </Autocomplete.Popup>
  );
}

function AutocompleteArrow({ className, ...props }: React.ComponentProps<typeof Autocomplete.Arrow>) {
  return <Autocomplete.Arrow className={cn(styles.arrow, className)} data-slot="autocomplete-arrow" {...props} />;
}

function AutocompleteStatus({ className, ...props }: React.ComponentProps<typeof Autocomplete.Status>) {
  return <Autocomplete.Status className={cn(styles.status, className)} data-slot="autocomplete-status" {...props} />;
}

function AutocompleteList({ className, ...props }: React.ComponentProps<typeof Autocomplete.List>) {
  return <Autocomplete.List className={cn(styles.list, className)} data-slot="autocomplete-list" {...props} />;
}

function AutocompleteEmpty({ className, children, ...props }: React.ComponentProps<typeof Autocomplete.Empty>) {
  return (
    <Autocomplete.Empty className={cn(styles.empty, className)} data-slot="autocomplete-empty" {...props}>
      {children || "No items found"}
    </Autocomplete.Empty>
  );
}

function AutocompleteCollection({ ...props }: React.ComponentProps<typeof Autocomplete.Collection>) {
  return <Autocomplete.Collection data-slot="autocomplete-collection" {...props} />;
}

function AutocompleteRow({ className, ...props }: React.ComponentProps<typeof Autocomplete.Row>) {
  return <Autocomplete.Row className={cn(styles.row, className)} data-slot="autocomplete-row" {...props} />;
}

function AutocompleteItem({ className, ...props }: React.ComponentProps<typeof Autocomplete.Item>) {
  return <Autocomplete.Item className={cn(styles.item, className)} data-slot="autocomplete-item" {...props} />;
}

function AutocompleteGroup({ className, ...props }: React.ComponentProps<typeof Autocomplete.Group>) {
  return <Autocomplete.Group className={cn(styles.group, className)} data-slot="autocomplete-group" {...props} />;
}

function AutocompleteGroupLabel({ className, ...props }: React.ComponentProps<typeof Autocomplete.GroupLabel>) {
  return (
    <Autocomplete.GroupLabel
      className={cn(styles.groupLabel, className)}
      data-slot="autocomplete-group-label"
      {...props}
    />
  );
}

function AutocompleteSeparator({ className, ...props }: React.ComponentProps<typeof Autocomplete.Separator>) {
  return (
    <Autocomplete.Separator className={cn(styles.separator, className)} data-slot="autocomplete-separator" {...props} />
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
