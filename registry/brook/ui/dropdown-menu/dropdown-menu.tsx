"use client";

import { Menu } from "@base-ui-components/react/menu";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./dropdown-menu.module.css";

function DropdownMenuRoot({
  ...props
}: Menu.Root.Props) {
  return <Menu.Root {...props} />;
}

function DropdownMenuTrigger({
  className,
  ...props
}: Menu.Trigger.Props) {
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
      side="top"
      {...props}
    />
  );
}

function DropdownMenuPopup({
  className,
  ...props
}: Menu.Popup.Props) {
  return <Menu.Popup className={cn(styles.popup, className)} {...props} />;
}

interface DropdownMenuItemProps extends Menu.Item.Props {
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

function DropdownMenuItem({
  className,
  icon,
  children,
  ...props
}: DropdownMenuItemProps) {
  return (
    <Menu.Item className={cn(styles.item, className)} {...props}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </Menu.Item>
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: Menu.Separator.Props) {
  return (
    <div className={styles.seperatorWrapper}>
      <Menu.Separator className={cn(styles.separator, className)} {...props} />
    </div>
  );
}

function DropdownMenuArrow({
  className,
  ...props
}: Menu.Arrow.Props) {
  return <Menu.Arrow className={cn(styles.arrow, className)} {...props} />;
}

function DropdownMenuSubmenuRoot({
  ...props
}: Menu.SubmenuRoot.Props) {
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
      {...props}
    >
      {children}
      <ChevronRight className={styles.submenuIcon} size={16} />
    </Menu.SubmenuTrigger>
  );
}

export {
  DropdownMenuRoot as DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuItem,
  DropdownMenuPopup,
  DropdownMenuPortal,
  DropdownMenuPositioner,
  DropdownMenuSeparator,
  DropdownMenuSubmenuRoot,
  DropdownMenuSubmenuTrigger,
  DropdownMenuTrigger,
};
