"use client";

import { Menubar } from "@base-ui-components/react/menubar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuPositioner,
  DropdownMenuPopup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuArrow,
  DropdownMenuSubmenuRoot,
  DropdownMenuSubmenuTrigger,
} from "../dropdown-menu/dropdown-menu";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./menubar.module.css";

function MenubarRoot({ className, ...props }: React.ComponentProps<typeof Menubar>) {
  return <Menubar className={cn(styles.root, className)} {...props} />;
}

function MenubarMenuRoot({ ...props }: React.ComponentProps<typeof DropdownMenu>) {
  return <DropdownMenu {...props} />;
}

function MenubarMenuTrigger({ ...props }: React.ComponentProps<typeof DropdownMenuTrigger>) {
  return <DropdownMenuTrigger {...props} />;
}

const MenubarMenuPortal = DropdownMenuPortal;

function MenubarMenuPositioner({ className, ...props }: React.ComponentProps<typeof DropdownMenuPositioner>) {
  return <DropdownMenuPositioner className={cn(styles.menuPositioner, className)} side="bottom" align="start" {...props} />;
}

function MenubarMenuPopup({ className, ...props }: React.ComponentProps<typeof DropdownMenuPopup>) {
  return <DropdownMenuPopup className={cn(styles.menuPopup, className)} {...props} />;
}

interface MenubarMenuItemProps extends React.ComponentProps<typeof DropdownMenuItem> {
  icon?: ReactNode;
}

function MenubarMenuItem({ className, icon, children, ...props }: MenubarMenuItemProps) {
  return (
    <DropdownMenuItem className={cn(styles.menuItem, className)} icon={icon} {...props}>
      {children}
    </DropdownMenuItem>
  );
}

function MenubarMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownMenuSeparator>) {
  return <DropdownMenuSeparator className={cn(styles.menuSeparator, className)} {...props} />;
}

function MenubarMenuArrow({ className, ...props }: React.ComponentProps<typeof DropdownMenuArrow>) {
  return <DropdownMenuArrow className={cn(styles.menuArrow, className)} {...props} />;
}

function MenubarMenuSubmenuRoot({ ...props }: React.ComponentProps<typeof DropdownMenuSubmenuRoot>) {
  return <DropdownMenuSubmenuRoot {...props} />;
}

function MenubarMenuSubmenuTrigger({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubmenuTrigger>) {
  return <DropdownMenuSubmenuTrigger className={cn(styles.menuSubmenuTrigger, className)} {...props} />;
}

export {
  MenubarRoot as Menubar,
  MenubarMenuRoot as MenubarMenu,
  MenubarMenuTrigger,
  MenubarMenuPortal,
  MenubarMenuPositioner,
  MenubarMenuPopup,
  MenubarMenuItem,
  MenubarMenuSeparator,
  MenubarMenuArrow,
  MenubarMenuSubmenuRoot,
  MenubarMenuSubmenuTrigger,
};
