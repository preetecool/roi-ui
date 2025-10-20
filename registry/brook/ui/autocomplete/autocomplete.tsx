"use client";

import { Autocomplete } from "@base-ui-components/react/autocomplete";
import { Search, X } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/registry/brook/ui/input/input";
import styles from "./autocomplete.module.css";

function AutocompleteRoot({
  ...props
}: React.ComponentProps<typeof Autocomplete.Root>) {
  return <Autocomplete.Root {...props} />;
}

function AutocompleteValue({
  ...props
}: React.ComponentProps<typeof Autocomplete.Value>) {
  return <Autocomplete.Value {...props} />;
}

function AutocompleteInput({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Input>) {
  return (
    <Autocomplete.Input
      render={(props) => <Input {...props} className={cn(className)} />}
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
    <Autocomplete.Trigger className={cn(styles.trigger, className)} {...props}>
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
    <Autocomplete.Icon className={cn(styles.icon, className)} {...props}>
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
    <Autocomplete.Clear className={cn(styles.clear, className)} {...props}>
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
    <Autocomplete.Popup className={cn(styles.popup, className)} {...props} />
  );
}

function AutocompleteArrow({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Arrow>) {
  return (
    <Autocomplete.Arrow className={cn(styles.arrow, className)} {...props} />
  );
}

function AutocompleteStatus({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Status>) {
  return (
    <Autocomplete.Status className={cn(styles.status, className)} {...props} />
  );
}

function AutocompleteList({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.List>) {
  return (
    <Autocomplete.List className={cn(styles.list, className)} {...props} />
  );
}

function AutocompleteEmpty({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Autocomplete.Empty>) {
  return (
    <Autocomplete.Empty className={cn(styles.empty, className)} {...props}>
      {children || "No items found"}
    </Autocomplete.Empty>
  );
}

function AutocompleteCollection({
  ...props
}: React.ComponentProps<typeof Autocomplete.Collection>) {
  return <Autocomplete.Collection {...props} />;
}

function AutocompleteRow({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Row>) {
  return <Autocomplete.Row className={cn(styles.row, className)} {...props} />;
}

function AutocompleteItem({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Item>) {
  return (
    <Autocomplete.Item className={cn(styles.item, className)} {...props} />
  );
}

function AutocompleteGroup({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Group>) {
  return (
    <Autocomplete.Group className={cn(styles.group, className)} {...props} />
  );
}

function AutocompleteGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.GroupLabel>) {
  return (
    <Autocomplete.GroupLabel
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
      className={cn(styles.separator, className)}
      {...props}
    />
  );
}

export {
  AutocompleteRoot as Autocomplete,
  AutocompleteValue,
  AutocompleteInput,
  AutocompleteTrigger,
  AutocompleteIcon,
  AutocompleteClear,
  AutocompletePortal,
  AutocompleteBackdrop,
  AutocompletePositioner,
  AutocompletePopup,
  AutocompleteArrow,
  AutocompleteStatus,
  AutocompleteList,
  AutocompleteEmpty,
  AutocompleteCollection,
  AutocompleteRow,
  AutocompleteItem,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteSeparator,
};
