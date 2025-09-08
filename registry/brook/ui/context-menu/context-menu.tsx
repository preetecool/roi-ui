"use client";

import { ContextMenu } from "@base-ui-components/react/context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./context-menu.module.css";
import React from "react";

const ContextMenuRoot = ({ 
  ...props 
}: React.ComponentProps<typeof ContextMenu.Root>) => (
  <ContextMenu.Root {...props} />
);

const ContextMenuTrigger = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof ContextMenu.Trigger>) => (
  <ContextMenu.Trigger className={cn(styles.trigger, className)} {...props} />
);

const ContextMenuPortal = ContextMenu.Portal;

const ContextMenuBackdrop = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof ContextMenu.Backdrop>) => (
  <ContextMenu.Backdrop 
    className={cn(styles.backdrop, className)}
    {...props}
  />
);

const ContextMenuPositioner = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof ContextMenu.Positioner>) => (
  <ContextMenu.Positioner 
    className={cn(styles.positioner, className)}
    sideOffset={4}
    {...props}
  />
);

const ContextMenuPopup = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof ContextMenu.Popup>) => (
  <ContextMenu.Popup className={cn(styles.popup, className)} {...props} />
);

const ContextMenuArrow = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof ContextMenu.Arrow>) => (
  <ContextMenu.Arrow className={cn(styles.arrow, className)} {...props} />
);

const ContextMenuItem = ({ 
  className,
  inset = false,
  ...props 
}: React.ComponentProps<typeof ContextMenu.Item> & { inset?: boolean }) => (
  <ContextMenu.Item 
    className={cn(styles.item, inset && styles.inset, className)} 
    {...props} 
  />
);

const ContextMenuCheckboxItem = ({ 
  className,
  children,
  ...props 
}: React.ComponentProps<typeof ContextMenu.CheckboxItem>) => (
  <ContextMenu.CheckboxItem className={cn(styles.checkboxItem, className)} {...props}>
    <span className={styles.itemIndicator}>
      <Check size={16} />
    </span>
    {children}
  </ContextMenu.CheckboxItem>
);

const ContextMenuRadioItem = ({ 
  className,
  children,
  ...props 
}: React.ComponentProps<typeof ContextMenu.RadioItem>) => (
  <ContextMenu.RadioItem className={cn(styles.radioItem, className)} {...props}>
    <span className={styles.itemIndicator}>
      <Circle size={8} fill="currentColor" />
    </span>
    {children}
  </ContextMenu.RadioItem>
);

const ContextMenuRadioGroup = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof ContextMenu.RadioGroup>) => (
  <ContextMenu.RadioGroup className={cn(className)} {...props} />
);

const ContextMenuLabel = ({ 
  className,
  inset = false,
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }) => (
  <div 
    className={cn(styles.label, inset && styles.inset, className)} 
    {...props} 
  />
);

const ContextMenuSeparator = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof ContextMenu.Separator>) => (
  <ContextMenu.Separator className={cn(styles.separator, className)} {...props} />
);

const ContextMenuSubmenuRoot = ({ 
  ...props 
}: React.ComponentProps<typeof ContextMenu.SubmenuRoot>) => (
  <ContextMenu.SubmenuRoot {...props} />
);

const ContextMenuSubmenuTrigger = ({ 
  className,
  inset = false,
  children,
  ...props 
}: React.ComponentProps<typeof ContextMenu.SubmenuTrigger> & { inset?: boolean }) => (
  <ContextMenu.SubmenuTrigger 
    className={cn(styles.submenuTrigger, inset && styles.inset, className)} 
    {...props}
  >
    {children}
    <ChevronRight size={16} className={styles.submenuIcon} />
  </ContextMenu.SubmenuTrigger>
);

const ContextMenuGroup = ({ 
  className,
  ...props 
}: React.ComponentProps<typeof ContextMenu.Group>) => (
  <ContextMenu.Group className={cn(styles.group, className)} {...props} />
);

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(styles.shortcut, className)}
      {...props}
    />
  );
};

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