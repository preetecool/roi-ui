"use client";

import { ContextMenu } from "@base-ui-components/react/context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import type React from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./context-menu.module.css";

function ContextMenuRoot({
  ...props
}: ContextMenu.Root.Props) {
  return <ContextMenu.Root {...props} />;
}

function ContextMenuTrigger({
  className,
  ...props
}: ContextMenu.Trigger.Props) {
  return (
    <ContextMenu.Trigger data-slot="contextmenu-trigger" className={cn(styles.trigger, className)} {...props} />
  );
}

const ContextMenuPortal = ContextMenu.Portal;

function ContextMenuBackdrop({
  className,
  ...props
}: ContextMenu.Backdrop.Props) {
  return (
    <ContextMenu.Backdrop
      data-slot="contextmenu-backdrop"
      className={cn(styles.backdrop, className)}
      {...props}
    />
  );
}

function ContextMenuPositioner({
  className,
  ...props
}: ContextMenu.Positioner.Props) {
  return (
    <ContextMenu.Positioner
      data-slot="contextmenu-positioner"
      className={cn(styles.positioner, className)}
      {...props}
    />
  );
}

function ContextMenuPopup({
  className,
  ...props
}: ContextMenu.Popup.Props) {
  return (
    <ContextMenu.Popup data-slot="contextmenu-popup" className={cn(styles.popup, className)} {...props} />
  );
}

function ContextMenuArrow({
  className,
  ...props
}: ContextMenu.Arrow.Props) {
  return (
    <ContextMenu.Arrow data-slot="contextmenu-arrow" className={cn(styles.arrow, className)} {...props} />
  );
}

interface ContextMenuItemProps extends ContextMenu.Item.Props {
  icon?: ReactNode;
  inset?: boolean;
  className?: string;
  children?: ReactNode;
  variant?: "default" | "destructive";
}

function ContextMenuItem({
  className,
  icon,
  children,
  inset = false,
  variant = "default",
  ...props
}: ContextMenuItemProps) {
  return (
    <ContextMenu.Item
      data-slot="contextmenu-item"
      className={cn(
        styles.item,
        inset && styles.inset,
        className
      )}
      data-variant={variant === "destructive" ? "destructive" : undefined}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </ContextMenu.Item>
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  ...props
}: ContextMenu.CheckboxItem.Props) {
  return (
    <ContextMenu.CheckboxItem
      data-slot="contextmenu-checkboxitem"
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
}: ContextMenu.RadioItem.Props) {
  return (
    <ContextMenu.RadioItem
      data-slot="contextmenu-radioitem"
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
}: ContextMenu.RadioGroup.Props) {
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
}: ContextMenu.Separator.Props) {
  return (
    <div className={styles.seperatorWrapper}>
      <ContextMenu.Separator
        className={cn(styles.separator, className)}
        {...props}
      />
    </div>
  );
}

function ContextMenuSubmenuRoot({
  ...props
}: ContextMenu.SubmenuRoot.Props) {
  return <ContextMenu.SubmenuRoot {...props} />;
}

function ContextMenuSubmenuTrigger({
  className,
  inset = false,
  children,
  ...props
}: ContextMenu.SubmenuTrigger.Props & {
  inset?: boolean;
}) {
  return (
    <ContextMenu.SubmenuTrigger
      data-slot="contextmenu-submenutrigger"
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
}: ContextMenu.Group.Props) {
  return (
    <ContextMenu.Group data-slot="contextmenu-group" className={cn(styles.group, className)} {...props} />
  );
}

function ContextMenuShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn(styles.shortcut, className)} {...props} />;
}

function ContextMenuSpacer() {
  return <div style={{ height: "4px", width: "100%" }} />;
}

export {
  ContextMenuRoot as ContextMenu,
  ContextMenuArrow,
  ContextMenuBackdrop,
  ContextMenuCheckboxItem,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPopup,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSpacer,
  ContextMenuSubmenuRoot,
  ContextMenuSubmenuTrigger,
  ContextMenuTrigger,
};
