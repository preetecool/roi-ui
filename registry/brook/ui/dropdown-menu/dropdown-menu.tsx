"use client";

import { Menu } from "@base-ui-components/react/menu";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./dropdown-menu.module.css";

function DropdownMenuRoot({ ...props }: Menu.Root.Props) {
  return <Menu.Root {...props} />;
}

function DropdownMenuTrigger({ className, ...props }: Menu.Trigger.Props) {
  return <Menu.Trigger {...props} className={cn(styles.trigger, className)} />;
}

const DropdownMenuPortal = Menu.Portal;

function DropdownMenuPositioner({
  className,
  ...props
}: Menu.Positioner.Props) {
  return (
    <Menu.Positioner
      className={cn(styles.positioner, className)}
      data-slot="menu-positioner"
      side="top"
      {...props}
    />
  );
}

function DropdownMenuPopup({ className, ...props }: Menu.Popup.Props) {
  return <Menu.Popup className={cn(styles.popup, className)} {...props} />;
}

interface DropdownMenuItemProps extends Menu.Item.Props {
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
  variant?: "default" | "destructive";
}

function DropdownMenuItem({
  className,
  icon,
  children,
  variant = "default",
  ...props
}: DropdownMenuItemProps) {
  return (
    <Menu.Item
      className={cn(styles.item, className)}
      data-variant={variant === "destructive" ? "destructive" : undefined}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </Menu.Item>
  );
}

function DropdownMenuSeparator({ className, ...props }: Menu.Separator.Props) {
  return (
    <div className={styles.seperatorWrapper}>
      <Menu.Separator className={cn(styles.separator, className)} {...props} />
    </div>
  );
}

function DropdownMenuArrow({ className, ...props }: Menu.Arrow.Props) {
  return <Menu.Arrow className={cn(styles.arrow, className)} {...props} />;
}

function DropdownMenuSubmenuRoot({ ...props }: Menu.SubmenuRoot.Props) {
  return <Menu.SubmenuRoot {...props} />;
}

function DropdownMenuSubmenuTrigger({
  className,
  children,
  ...props
}: Menu.SubmenuTrigger.Props) {
  return (
    <Menu.SubmenuTrigger
      className={cn(styles.submenuTrigger, className)}
      data-slot="menu-submenutrigger"
      {...props}
    >
      {children}
      <ChevronRight className={styles.submenuIcon} size={16} />
    </Menu.SubmenuTrigger>
  );
}

function DropdownMenuRadioGroup({
  className,
  ...props
}: Menu.RadioGroup.Props) {
  return <Menu.RadioGroup className={className} {...props} />;
}

interface DropdownMenuRadioItemProps extends Menu.RadioItem.Props {
  className?: string;
  children?: ReactNode;
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: DropdownMenuRadioItemProps) {
  return (
    <Menu.RadioItem className={cn(styles.item, className)} {...props}>
      {children}
    </Menu.RadioItem>
  );
}

function DropdownMenuRadioItemIndicator({
  className,
  ...props
}: Menu.RadioItemIndicator.Props) {
  return (
    <Menu.RadioItemIndicator
      className={cn(styles.radioIndicator, className)}
      {...props}
    />
  );
}

function DropdownMenuSpacer() {
  return <div style={{ height: "4px", width: "100%" }} />;
}

export {
  DropdownMenuRoot as DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuItem,
  DropdownMenuPopup,
  DropdownMenuPortal,
  DropdownMenuPositioner,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRadioItemIndicator,
  DropdownMenuSeparator,
  DropdownMenuSpacer,
  DropdownMenuSubmenuRoot,
  DropdownMenuSubmenuTrigger,
  DropdownMenuTrigger,
};
