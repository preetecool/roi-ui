"use client";

import { Menu } from "@base-ui-components/react/menu";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./dropdown-menu.module.css";

const DropdownMenuRoot = ({ ...props }: React.ComponentProps<typeof Menu.Root>) => {
  return <Menu.Root {...props} />;
};

const DropdownMenuTrigger = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Menu.Trigger>) => {
  return <Menu.Trigger {...props} className={cn(styles.trigger, className)} />;
};

const DropdownMenuPortal = Menu.Portal;

const DropdownMenuPositioner = ({ className, ...props }: React.ComponentProps<typeof Menu.Positioner>) => (
  <Menu.Positioner className={cn(styles.positioner, className)} side="bottom" align="start" {...props} />
);

const DropdownMenuPopup = ({ className, ...props }: React.ComponentProps<typeof Menu.Popup>) => (
  <Menu.Popup className={cn(styles.popup, className)} {...props} />
);

interface DropdownMenuItemProps extends React.ComponentProps<typeof Menu.Item> {
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

const DropdownMenuItem = ({ className, icon, children, ...props }: DropdownMenuItemProps) => (
  <Menu.Item className={cn(styles.item, className)} nativeButton {...props}>
    {icon && <span className={styles.icon}>{icon}</span>}
    {children}
  </Menu.Item>
);

const DropdownMenuSeparator = ({ className, ...props }: React.ComponentProps<typeof Menu.Separator>) => (
  <Menu.Separator className={cn(styles.separator, className)} {...props} />
);

const DropdownMenuArrow = ({ className, ...props }: React.ComponentProps<typeof Menu.Arrow>) => (
  <Menu.Arrow className={cn(styles.arrow, className)} {...props} />
);

const DropdownMenuSubmenuRoot = ({ ...props }: React.ComponentProps<typeof Menu.SubmenuRoot>) => {
  return <Menu.SubmenuRoot {...props} />;
};

const DropdownMenuSubmenuTrigger = ({ className, ...props }: React.ComponentProps<typeof Menu.SubmenuTrigger>) => (
  <Menu.SubmenuTrigger className={cn(styles.submenuTrigger, className)} {...props} />
);

export {
  DropdownMenuRoot as DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuPositioner,
  DropdownMenuPopup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuArrow,
  DropdownMenuSubmenuRoot,
  DropdownMenuSubmenuTrigger,
};
