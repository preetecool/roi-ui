"use client";

import { Autocomplete } from "@base-ui-components/react/autocomplete";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/registry/brook/ui/input/input";
import styles from "./autocomplete.module.css";
import React from "react";

const AutocompleteRoot = ({ 
  ...props 
}: React.ComponentProps<typeof Autocomplete.Root>) => (
  <Autocomplete.Root {...props} />
);

const AutocompleteValue = ({ 
  ...props 
}: React.ComponentProps<typeof Autocomplete.Value>) => (
  <Autocomplete.Value {...props} />
);

const AutocompleteInput = ({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Input>) => (
  <Autocomplete.Input
    render={(props) => <Input {...props} className={cn(className)} />}
    {...props}
  />
);

const AutocompleteTrigger = ({ 
  className,
  children,
  ...props 
}: React.ComponentProps<typeof Autocomplete.Trigger>) => (
  <Autocomplete.Trigger className={cn(styles.trigger, className)} {...props}>
    {children || <Search size={16} className={styles.icon} />}
  </Autocomplete.Trigger>
);

const AutocompleteIcon = ({ 
  className,
  children,
  ...props 
}: React.ComponentProps<typeof Autocomplete.Icon>) => (
  <Autocomplete.Icon className={cn(styles.icon, className)} {...props}>
    {children || <Search size={16} />}
  </Autocomplete.Icon>
);

const AutocompleteClear = ({ 
  className,
  children,
  ...props 
}: React.ComponentProps<typeof Autocomplete.Clear>) => (
  <Autocomplete.Clear className={cn(styles.clear, className)} {...props}>
    {children || <X size={16} />}
  </Autocomplete.Clear>
);

const AutocompletePortal = Autocomplete.Portal;

const AutocompleteBackdrop = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof Autocomplete.Backdrop>) => (
  <Autocomplete.Backdrop 
    className={cn(styles.backdrop, className)}
    {...props}
  />
);

const AutocompletePositioner = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof Autocomplete.Positioner>) => (
  <Autocomplete.Positioner 
    className={cn(styles.positioner, className)}
    sideOffset={4}
    {...props}
  />
);

const AutocompletePopup = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof Autocomplete.Popup>) => (
  <Autocomplete.Popup className={cn(styles.popup, className)} {...props} />
);

const AutocompleteArrow = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof Autocomplete.Arrow>) => (
  <Autocomplete.Arrow className={cn(styles.arrow, className)} {...props} />
);

const AutocompleteStatus = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof Autocomplete.Status>) => (
  <Autocomplete.Status className={cn(styles.status, className)} {...props} />
);

const AutocompleteList = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof Autocomplete.List>) => (
  <Autocomplete.List className={cn(styles.list, className)} {...props} />
);

const AutocompleteEmpty = ({ 
  className,
  children,
  ...props 
}: React.ComponentProps<typeof Autocomplete.Empty>) => (
  <Autocomplete.Empty className={cn(styles.empty, className)} {...props}>
    {children || "No items found"}
  </Autocomplete.Empty>
);

const AutocompleteCollection = ({ 
  ...props 
}: React.ComponentProps<typeof Autocomplete.Collection>) => (
  <Autocomplete.Collection {...props} />
);

const AutocompleteRow = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof Autocomplete.Row>) => (
  <Autocomplete.Row className={cn(styles.row, className)} {...props} />
);

const AutocompleteItem = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof Autocomplete.Item>) => (
  <Autocomplete.Item className={cn(styles.item, className)} {...props} />
);

const AutocompleteGroup = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof Autocomplete.Group>) => (
  <Autocomplete.Group className={cn(styles.group, className)} {...props} />
);

const AutocompleteGroupLabel = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof Autocomplete.GroupLabel>) => (
  <Autocomplete.GroupLabel className={cn(styles.groupLabel, className)} {...props} />
);

const AutocompleteSeparator = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof Autocomplete.Separator>) => (
  <Autocomplete.Separator className={cn(styles.separator, className)} {...props} />
);

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