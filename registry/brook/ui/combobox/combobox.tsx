"use client";

import { Combobox } from "@base-ui-components/react/combobox";
import { Check, ChevronsUpDown, X } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils";
import styles from "./combobox.module.css";

function ComboboxRoot<ItemValue>({
  ...props
}: React.ComponentProps<typeof Combobox.Root<ItemValue>>) {
  return <Combobox.Root<ItemValue> {...props} />;
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Combobox.Trigger>) {
  return (
    <Combobox.Trigger className={cn(styles.trigger, className)} {...props}>
      {children}
      <ChevronsUpDown className={styles.icon} size={16} />
    </Combobox.Trigger>
  );
}

function ComboboxInput({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Input>) {
  return <Combobox.Input className={cn(styles.input, className)} {...props} />;
}

function ComboboxClear({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Combobox.Clear>) {
  return (
    <Combobox.Clear className={cn(styles.clear, className)} {...props}>
      {children || <X size={16} />}
    </Combobox.Clear>
  );
}

const ComboboxPortal = Combobox.Portal;

function ComboboxPositioner({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Positioner>) {
  return (
    <Combobox.Positioner
      className={cn(styles.positioner, className)}
      sideOffset={4}
      {...props}
    />
  );
}

function ComboboxPopup({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Popup>) {
  return <Combobox.Popup className={cn(styles.popup, className)} {...props} />;
}

function ComboboxList({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.List>) {
  return <Combobox.List className={cn(styles.list, className)} {...props} />;
}

function ComboboxEmpty({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Combobox.Empty>) {
  return (
    <Combobox.Empty className={cn(styles.empty, className)} {...props}>
      {children || "No items found"}
    </Combobox.Empty>
  );
}

function ComboboxItem({
  className,
  children,
  indicatorPosition = "left",
  ...props
}: React.ComponentProps<typeof Combobox.Item> & {
  indicatorPosition?: "left" | "right";
}) {
  return (
    <Combobox.Item className={cn(styles.item, className)} {...props}>
      {indicatorPosition === "left" && (
        <Combobox.ItemIndicator className={styles.itemIndicator}>
          <Check size={16} />
        </Combobox.ItemIndicator>
      )}
      {children}
      {indicatorPosition === "right" && (
        <Combobox.ItemIndicator className={styles.itemIndicator}>
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
}: React.ComponentProps<typeof Combobox.ItemIndicator>) {
  return (
    <Combobox.ItemIndicator
      className={cn(styles.itemIndicator, className)}
      {...props}
    >
      {children || <Check size={16} />}
    </Combobox.ItemIndicator>
  );
}

function ComboboxGroup({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Group>) {
  return <Combobox.Group className={cn(styles.group, className)} {...props} />;
}

function ComboboxGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.GroupLabel>) {
  return (
    <Combobox.GroupLabel
      className={cn(styles.groupLabel, className)}
      {...props}
    />
  );
}

function ComboboxArrow({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Arrow>) {
  return <Combobox.Arrow className={cn(styles.arrow, className)} {...props} />;
}

function ComboboxNoItems({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn(styles.noItems, className)} {...props}>
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
