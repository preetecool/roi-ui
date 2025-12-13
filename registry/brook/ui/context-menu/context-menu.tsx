"use client";

import { ContextMenu } from "@base-ui/react/context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import type React from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./context-menu.module.css";

function ContextMenuRoot({ ...props }: ContextMenu.Root.Props) {
  return <ContextMenu.Root {...props} />;
}

function ContextMenuTrigger({
  className,
  ...props
}: ContextMenu.Trigger.Props) {
  return (
    <ContextMenu.Trigger
      className={cn(styles.trigger, className)}
      data-slot="contextmenu-trigger"
      {...props}
    />
  );
}

const ContextMenuPortal = ContextMenu.Portal;

function ContextMenuBackdrop({
  className,
  ...props
}: ContextMenu.Backdrop.Props) {
  return (
    <ContextMenu.Backdrop
      className={cn(styles.backdrop, className)}
      data-slot="contextmenu-backdrop"
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
      className={cn(styles.positioner, className)}
      data-slot="contextmenu-positioner"
      {...props}
    />
  );
}

function ContextMenuPopup({ className, ...props }: ContextMenu.Popup.Props) {
  return (
    <ContextMenu.Popup
      className={cn(styles.popup, className)}
      data-slot="contextmenu-popup"
      {...props}
    />
  );
}

function ContextMenuArrow({ className, ...props }: ContextMenu.Arrow.Props) {
  return (
    <ContextMenu.Arrow
      className={cn(styles.arrow, className)}
      data-slot="contextmenu-arrow"
      {...props}
    />
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
      className={cn(styles.item, inset && styles.inset, className)}
      data-slot="contextmenu-item"
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
      className={cn(styles.checkboxItem, className)}
      data-slot="contextmenu-checkboxitem"
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
      className={cn(styles.radioItem, className)}
      data-slot="contextmenu-radioitem"
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

function ContextMenuSubmenuRoot({ ...props }: ContextMenu.SubmenuRoot.Props) {
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
      className={cn(styles.submenuTrigger, inset && styles.inset, className)}
      data-slot="contextmenu-submenutrigger"
      {...props}
    >
      {children}
      <ChevronRight className={styles.submenuIcon} size={16} />
    </ContextMenu.SubmenuTrigger>
  );
}

function ContextMenuGroup({ className, ...props }: ContextMenu.Group.Props) {
  return (
    <ContextMenu.Group
      className={cn(styles.group, className)}
      data-slot="contextmenu-group"
      {...props}
    />
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
