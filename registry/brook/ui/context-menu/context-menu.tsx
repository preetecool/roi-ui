"use client";

import { ContextMenu } from "@base-ui-components/react/context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils";
import styles from "./context-menu.module.css";

function ContextMenuRoot({
  ...props
}: React.ComponentProps<typeof ContextMenu.Root>) {
  return <ContextMenu.Root {...props} />;
}

function ContextMenuTrigger({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenu.Trigger>) {
  return (
    <ContextMenu.Trigger className={cn(styles.trigger, className)} {...props} />
  );
}

const ContextMenuPortal = ContextMenu.Portal;

function ContextMenuBackdrop({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenu.Backdrop>) {
  return (
    <ContextMenu.Backdrop
      className={cn(styles.backdrop, className)}
      {...props}
    />
  );
}

function ContextMenuPositioner({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenu.Positioner>) {
  return (
    <ContextMenu.Positioner
      className={cn(styles.positioner, className)}
      sideOffset={4}
      {...props}
    />
  );
}

function ContextMenuPopup({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenu.Popup>) {
  return (
    <ContextMenu.Popup className={cn(styles.popup, className)} {...props} />
  );
}

function ContextMenuArrow({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenu.Arrow>) {
  return (
    <ContextMenu.Arrow className={cn(styles.arrow, className)} {...props} />
  );
}

function ContextMenuItem({
  className,
  inset = false,
  ...props
}: React.ComponentProps<typeof ContextMenu.Item> & { inset?: boolean }) {
  return (
    <ContextMenu.Item
      className={cn(styles.item, inset && styles.inset, className)}
      {...props}
    />
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenu.CheckboxItem>) {
  return (
    <ContextMenu.CheckboxItem
      className={cn(styles.checkboxItem, className)}
      {...props}
    >
      <span className={styles.itemIndicator}>
        <Check size={16} />
      </span>
      {children}
    </ContextMenu.CheckboxItem>
  );
}

function ContextMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenu.RadioItem>) {
  return (
    <ContextMenu.RadioItem
      className={cn(styles.radioItem, className)}
      {...props}
    >
      <span className={styles.itemIndicator}>
        <Circle fill="currentColor" size={8} />
      </span>
      {children}
    </ContextMenu.RadioItem>
  );
}

function ContextMenuRadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenu.RadioGroup>) {
  return <ContextMenu.RadioGroup className={cn(className)} {...props} />;
}

function ContextMenuLabel({
  className,
  inset = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }) {
  return (
    <div
      className={cn(styles.label, inset && styles.inset, className)}
      {...props}
    />
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenu.Separator>) {
  return (
    <ContextMenu.Separator
      className={cn(styles.separator, className)}
      {...props}
    />
  );
}

function ContextMenuSubmenuRoot({
  ...props
}: React.ComponentProps<typeof ContextMenu.SubmenuRoot>) {
  return <ContextMenu.SubmenuRoot {...props} />;
}

function ContextMenuSubmenuTrigger({
  className,
  inset = false,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenu.SubmenuTrigger> & {
  inset?: boolean;
}) {
  return (
    <ContextMenu.SubmenuTrigger
      className={cn(styles.submenuTrigger, inset && styles.inset, className)}
      {...props}
    >
      {children}
      <ChevronRight className={styles.submenuIcon} size={16} />
    </ContextMenu.SubmenuTrigger>
  );
}

function ContextMenuGroup({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenu.Group>) {
  return (
    <ContextMenu.Group className={cn(styles.group, className)} {...props} />
  );
}

function ContextMenuShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn(styles.shortcut, className)} {...props} />;
}

export {
  ContextMenuRoot as ContextMenu,
  ContextMenuTrigger,
  ContextMenuPortal,
  ContextMenuBackdrop,
  ContextMenuPositioner,
  ContextMenuPopup,
  ContextMenuArrow,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuRadioGroup,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSubmenuRoot,
  ContextMenuSubmenuTrigger,
  ContextMenuGroup,
  ContextMenuShortcut,
};
