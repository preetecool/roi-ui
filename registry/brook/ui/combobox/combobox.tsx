"use client";

import { Combobox } from "@base-ui/react/combobox";
import { Check, ChevronsUpDown, X } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/registry/brook/ui/input/input";
import styles from "./combobox.module.css";

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
    <Combobox.Trigger className={cn(styles.trigger, className)} {...props}>
      {children}
      <ChevronsUpDown className={styles.icon} size={16} />
    </Combobox.Trigger>
  );
}

function ComboboxInput({ className, ...props }: Combobox.Input.Props) {
  return <Combobox.Input className={className} render={<Input />} {...props} />;
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
      className={cn(styles.positioner, className)}
      data-slot="combobox-positioner"
      sideOffset={4}
      {...props}
    />
  );
}

function ComboboxPopup({
  className,
  children,
  ...props
}: Combobox.Popup.Props) {
  return (
    <Combobox.Popup className={cn(styles.popup, className)} {...props}>
      <div style={{ height: "4px", width: "100%", flexShrink: 0 }} />
      {children}
      <div style={{ height: "4px", width: "100%", flexShrink: 0 }} />
    </Combobox.Popup>
  );
}

function ComboboxList({ className, ...props }: Combobox.List.Props) {
  return (
    <Combobox.List
      className={cn(styles.list, className)}
      data-slot="combobox-list"
      {...props}
    />
  );
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
      className={cn(styles.itemIndicator, className)}
      data-slot="combobox-itemindicator"
      {...props}
    >
      {children || <Check size={16} />}
    </Combobox.ItemIndicator>
  );
}

function ComboboxGroup({ className, ...props }: Combobox.Group.Props) {
  return <Combobox.Group className={cn(styles.group, className)} {...props} />;
}

function ComboboxGroupLabel({
  className,
  ...props
}: Combobox.GroupLabel.Props) {
  return (
    <Combobox.GroupLabel
      className={cn(styles.groupLabel, className)}
      data-slot="combobox-grouplabel"
      {...props}
    />
  );
}

function ComboboxArrow({ className, ...props }: Combobox.Arrow.Props) {
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

function ComboboxChips({
  className,
  ref,
  ...props
}: Combobox.Chips.Props & { ref?: React.Ref<HTMLDivElement> }) {
  return <Combobox.Chips className={cn(styles.chips, className)} ref={ref} {...props} />;
}

function ComboboxChip({
  className,
  ...props
}: Combobox.Chip.Props) {
  return <Combobox.Chip className={cn(styles.chip, className)} {...props} />;
}

function ComboboxChipRemove({
  className,
  children,
  ...props
}: Combobox.ChipRemove.Props) {
  return (
    <Combobox.ChipRemove className={cn(styles.chipRemove, className)} {...props}>
      {children || <X size={14} />}
    </Combobox.ChipRemove>
  );
}

function ComboboxChipsInput({ className, ...props }: Combobox.Input.Props) {
  return <Combobox.Input className={cn(styles.chipsInput, className)} {...props} />;
}

const ComboboxValue = Combobox.Value;

export {
  ComboboxRoot as Combobox,
  ComboboxArrow,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxChipsInput,
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
  ComboboxValue,
};
