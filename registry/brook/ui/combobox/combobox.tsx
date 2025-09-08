"use client";

import { Combobox } from "@base-ui-components/react/combobox";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./combobox.module.css";
import React from "react";

const ComboboxRoot = ({ ...props }: React.ComponentProps<typeof Combobox.Root>) => (
  <Combobox.Root {...props} />
);

const ComboboxTrigger = ({ 
  className, 
  children,
  ...props 
}: React.ComponentProps<typeof Combobox.Trigger>) => (
  <Combobox.Trigger className={cn(styles.trigger, className)} {...props}>
    {children}
    <ChevronsUpDown size={16} className={styles.icon} />
  </Combobox.Trigger>
);

const ComboboxInput = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof Combobox.Input>) => (
  <Combobox.Input 
    className={cn(styles.input, className)} 
    {...props}
  />
);

const ComboboxClear = ({ 
  className,
  children,
  ...props 
}: React.ComponentProps<typeof Combobox.Clear>) => (
  <Combobox.Clear className={cn(styles.clear, className)} {...props}>
    {children || <X size={16} />}
  </Combobox.Clear>
);

const ComboboxPortal = Combobox.Portal;

const ComboboxPositioner = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof Combobox.Positioner>) => (
  <Combobox.Positioner 
    className={cn(styles.positioner, className)}
    sideOffset={4}
    {...props}
  />
);

const ComboboxPopup = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof Combobox.Popup>) => (
  <Combobox.Popup className={cn(styles.popup, className)} {...props} />
);

const ComboboxList = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof Combobox.List>) => (
  <Combobox.List className={cn(styles.list, className)} {...props} />
);

const ComboboxEmpty = ({ 
  className,
  children,
  ...props 
}: React.ComponentProps<typeof Combobox.Empty>) => (
  <Combobox.Empty className={cn(styles.empty, className)} {...props}>
    {children || "No items found"}
  </Combobox.Empty>
);

const ComboboxItem = ({ 
  className,
  children,
  ...props 
}: React.ComponentProps<typeof Combobox.Item>) => (
  <Combobox.Item className={cn(styles.item, className)} {...props}>
    <Combobox.ItemIndicator className={styles.itemIndicator}>
      <Check size={16} />
    </Combobox.ItemIndicator>
    {children}
  </Combobox.Item>
);

const ComboboxItemIndicator = ({ 
  className,
  children,
  ...props 
}: React.ComponentProps<typeof Combobox.ItemIndicator>) => (
  <Combobox.ItemIndicator className={cn(styles.itemIndicator, className)} {...props}>
    {children || <Check size={16} />}
  </Combobox.ItemIndicator>
);

const ComboboxGroup = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof Combobox.Group>) => (
  <Combobox.Group className={cn(styles.group, className)} {...props} />
);

const ComboboxGroupLabel = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof Combobox.GroupLabel>) => (
  <Combobox.GroupLabel className={cn(styles.groupLabel, className)} {...props} />
);

const ComboboxArrow = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof Combobox.Arrow>) => (
  <Combobox.Arrow className={cn(styles.arrow, className)} {...props} />
);

const ComboboxNoItems = ({ 
  className,
  children,
  ...props 
}: React.ComponentProps<"div">) => (
  <div className={cn(styles.noItems, className)} {...props}>
    {children || "No items found"}
  </div>
);

export {
  ComboboxRoot as Combobox,
  ComboboxTrigger,
  ComboboxInput,
  ComboboxClear,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxPopup,
  ComboboxList,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxArrow,
  ComboboxNoItems,
};