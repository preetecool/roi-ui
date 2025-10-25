"use client";

import { Menu } from "@base-ui-components/react/menu";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./dropdown-menu.module.css";

function DropdownMenuRoot({
  ...props
}: React.ComponentProps<typeof Menu.Root>) {
  return <Menu.Root {...props} />;
}

function DropdownMenuTrigger({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Menu.Trigger>) {
  return <Menu.Trigger {...props} className={cn(styles.trigger, className)} />;
}

const DropdownMenuPortal = Menu.Portal;

function DropdownMenuPositioner({
  className,
  ...props
}: React.ComponentProps<typeof Menu.Positioner>) {
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
}: React.ComponentProps<typeof Menu.Popup>) {
  return <Menu.Popup className={cn(styles.popup, className)} {...props} />;
}

interface DropdownMenuItemProps extends React.ComponentProps<typeof Menu.Item> {
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
}: React.ComponentProps<typeof Menu.Separator>) {
  return (
    <div className={styles.seperatorWrapper}>
      <Menu.Separator className={cn(styles.separator, className)} {...props} />
    </div>
  );
}

function DropdownMenuArrow({
  className,
  ...props
}: React.ComponentProps<typeof Menu.Arrow>) {
  return <Menu.Arrow className={cn(styles.arrow, className)} {...props} />;
}

function DropdownMenuSubmenuRoot({
  ...props
}: React.ComponentProps<typeof Menu.SubmenuRoot>) {
  return <Menu.SubmenuRoot {...props} />;
}

function DropdownMenuSubmenuTrigger({
  className,
  ...props
}: React.ComponentProps<typeof Menu.SubmenuTrigger>) {
  return (
    <Menu.SubmenuTrigger
      className={cn(styles.submenuTrigger, className)}
      {...props}
    />
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
