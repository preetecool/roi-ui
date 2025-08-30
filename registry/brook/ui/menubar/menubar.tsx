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

const MenubarRoot = ({ className, ...props }: React.ComponentProps<typeof Menubar>) => (
  <Menubar className={cn(styles.root, className)} {...props} />
);

const MenubarMenuRoot = ({ ...props }: React.ComponentProps<typeof DropdownMenu>) => {
  return <DropdownMenu {...props} />;
};

const MenubarMenuTrigger = ({ ...props }: React.ComponentProps<typeof DropdownMenuTrigger>) => {
  return <DropdownMenuTrigger {...props} />;
};

const MenubarMenuPortal = DropdownMenuPortal;

const MenubarMenuPositioner = ({ className, ...props }: React.ComponentProps<typeof DropdownMenuPositioner>) => (
  <DropdownMenuPositioner className={cn(styles.menuPositioner, className)} side="bottom" align="start" {...props} />
);

const MenubarMenuPopup = ({ className, ...props }: React.ComponentProps<typeof DropdownMenuPopup>) => (
  <DropdownMenuPopup className={cn(styles.menuPopup, className)} {...props} />
);

interface MenubarMenuItemProps extends React.ComponentProps<typeof DropdownMenuItem> {
  icon?: ReactNode;
}

const MenubarMenuItem = ({ className, icon, children, ...props }: MenubarMenuItemProps) => (
  <DropdownMenuItem className={cn(styles.menuItem, className)} icon={icon} {...props}>
    {children}
  </DropdownMenuItem>
);

const MenubarMenuSeparator = ({ className, ...props }: React.ComponentProps<typeof DropdownMenuSeparator>) => (
  <DropdownMenuSeparator className={cn(styles.menuSeparator, className)} {...props} />
);

const MenubarMenuArrow = ({ className, ...props }: React.ComponentProps<typeof DropdownMenuArrow>) => (
  <DropdownMenuArrow className={cn(styles.menuArrow, className)} {...props} />
);

const MenubarMenuSubmenuRoot = ({ ...props }: React.ComponentProps<typeof DropdownMenuSubmenuRoot>) => {
  return <DropdownMenuSubmenuRoot {...props} />;
};

const MenubarMenuSubmenuTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubmenuTrigger>) => (
  <DropdownMenuSubmenuTrigger className={cn(styles.menuSubmenuTrigger, className)} {...props} />
);

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
