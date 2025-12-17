"use client";

import { Menubar } from "@base-ui/react/menubar";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuItem,
  DropdownMenuPopup,
  DropdownMenuPortal,
  DropdownMenuPositioner,
  DropdownMenuSeparator,
  DropdownMenuSubmenuRoot,
  DropdownMenuSubmenuTrigger,
  DropdownMenuTrigger,
} from "../dropdown-menu/dropdown-menu";
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
  return (
    <DropdownMenuPositioner align="start" className={cn(styles.menuPositioner, className)} side="bottom" {...props} />
  );
}

function MenubarMenuPopup({ className, ...props }: React.ComponentProps<typeof DropdownMenuPopup>) {
  return <DropdownMenuPopup className={cn(styles.menuPopup, className)} {...props} />;
}

interface MenubarMenuItemProps extends React.ComponentProps<typeof DropdownMenuItem> {
  icon?: ReactNode;
}

function MenubarMenuItem({ className, icon, children, ...props }: MenubarMenuItemProps) {
  return (
    <DropdownMenuItem className={className} icon={icon} style={icon ? undefined : { paddingLeft: "12px" }} {...props}>
      {children}
    </DropdownMenuItem>
  );
}

function MenubarMenuSeparator({ ...props }: React.ComponentProps<typeof DropdownMenuSeparator>) {
  return <DropdownMenuSeparator {...props} />;
}

function MenubarMenuArrow({ ...props }: React.ComponentProps<typeof DropdownMenuArrow>) {
  return <DropdownMenuArrow {...props} />;
}

function MenubarMenuSubmenuRoot({ ...props }: React.ComponentProps<typeof DropdownMenuSubmenuRoot>) {
  return <DropdownMenuSubmenuRoot {...props} />;
}

function MenubarMenuSubmenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubmenuTrigger>) {
  // Check if children contains an icon element (checking for common icon props)
  const hasIcon =
    typeof children === "object" && children !== null && "type" in children && typeof children.type === "function";

  return (
    <DropdownMenuSubmenuTrigger className={className} style={hasIcon ? undefined : { paddingLeft: "12px" }} {...props}>
      {children}
    </DropdownMenuSubmenuTrigger>
  );
}

function MenubarMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn(styles.shortcut, className)} {...props} />;
}

function MenubarMenuSpacer() {
  return <div style={{ height: "4px", width: "100%" }} />;
}

export {
  MenubarRoot as Menubar,
  MenubarMenuRoot as MenubarMenu,
  MenubarMenuArrow,
  MenubarMenuItem,
  MenubarMenuPopup,
  MenubarMenuPortal,
  MenubarMenuPositioner,
  MenubarMenuSeparator,
  MenubarMenuShortcut,
  MenubarMenuSpacer,
  MenubarMenuSubmenuRoot,
  MenubarMenuSubmenuTrigger,
  MenubarMenuTrigger,
};
