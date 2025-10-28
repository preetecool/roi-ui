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
}: Combobox.Trigger.Props) {
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
}: Combobox.Input.Props) {
  return <Combobox.Input className={cn(styles.input, className)} {...props} />;
}

function ComboboxClear({
  className,
  children,
  ...props
}: Combobox.Clear.Props) {
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
}: Combobox.Positioner.Props) {
  return (
    <Combobox.Positioner
      data-slot="combobox-positioner"
      className={cn(styles.positioner, className)}
      sideOffset={4}
      {...props}
    />
  );
}

function ComboboxPopup({
  className,
  ...props
}: Combobox.Popup.Props) {
  return <Combobox.Popup className={cn(styles.popup, className)} {...props} />;
}

function ComboboxList({
  className,
  ...props
}: Combobox.List.Props) {
  return <Combobox.List className={cn(styles.list, className)} {...props} />;
}

function ComboboxEmpty({
  className,
  children,
  ...props
}: Combobox.Empty.Props) {
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
}: Combobox.Item.Props & {
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
}: Combobox.ItemIndicator.Props) {
  return (
    <Combobox.ItemIndicator
      data-slot="combobox-itemindicator"
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
}: Combobox.Group.Props) {
  return <Combobox.Group className={cn(styles.group, className)} {...props} />;
}

function ComboboxGroupLabel({
  className,
  ...props
}: Combobox.GroupLabel.Props) {
  return (
    <Combobox.GroupLabel
      data-slot="combobox-grouplabel"
      className={cn(styles.groupLabel, className)}
      {...props}
    />
  );
}

function ComboboxArrow({
  className,
  ...props
}: Combobox.Arrow.Props) {
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
