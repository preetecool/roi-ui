"use client";

import { Menubar } from "@base-ui-components/react/menubar";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils-tailwind";
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
} from "./dropdown-menu";

function MenubarRoot({
  className,
  ...props
}: React.ComponentProps<typeof Menubar>) {
  return (
    <Menubar
      className={cn(
        "flex items-center bg-[var(--mix-card-50-bg)]",
        "rounded-[var(--radius)] border-[0.5px] border-[var(--color-border-60)]",
        "shadow-[0px_0.5px_0.5px_var(--shadow-color),0px_0.5px_0.5px_var(--shadow-color),0px_0.5px_0.5px_var(--shadow-color)]",
        "gap-0.5 p-0.5",
        "max-sm:gap-1.5 max-sm:p-1.5",
        className
      )}
      {...props}
    />
  );
}

function MenubarMenuRoot({
  ...props
}: React.ComponentProps<typeof DropdownMenu>) {
  return <DropdownMenu {...props} />;
}

function MenubarMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuTrigger>) {
  return <DropdownMenuTrigger {...props} />;
}

const MenubarMenuPortal = DropdownMenuPortal;

function MenubarMenuPositioner({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPositioner>) {
  return (
    <DropdownMenuPositioner
      align="start"
      className={cn("absolute left-0 z-[150]", className)}
      side="bottom"
      {...props}
    />
  );
}

function MenubarMenuPopup({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPopup>) {
  return (
    <DropdownMenuPopup
      className={cn(
        "min-w-[170px] bg-[var(--mix-card-50-bg)]",
        "rounded-[var(--radius)] border-[0.5px] border-[var(--color-border-60)]",
        "flex flex-col",
        "shadow-[0px_0.5px_0.5px_var(--shadow-color),0px_0.5px_0.5px_var(--shadow-color),0px_0.5px_0.5px_var(--shadow-color)]",
        "origin-[top_center] transition-[transform,scale,opacity] duration-[150ms] ease-[var(--ease-out-expo)]",
        "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
        "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
        "data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none",
        "data-[side=none]:data-[ending-style]:transition-none",
        "max-sm:max-w-[calc(100vw-2rem)] max-sm:p-1.5",
        className
      )}
      {...props}
    />
  );
}

interface MenubarMenuItemProps
  extends React.ComponentProps<typeof DropdownMenuItem> {
  icon?: ReactNode;
}

function MenubarMenuItem({
  className,
  icon,
  children,
  ...props
}: MenubarMenuItemProps) {
  return (
    <DropdownMenuItem
      className={className}
      icon={icon}
      style={icon ? undefined : { paddingLeft: "12px" }}
      {...props}
    >
      {children}
    </DropdownMenuItem>
  );
}

function MenubarMenuSeparator({
  ...props
}: React.ComponentProps<typeof DropdownMenuSeparator>) {
  return <DropdownMenuSeparator {...props} />;
}

function MenubarMenuArrow({
  ...props
}: React.ComponentProps<typeof DropdownMenuArrow>) {
  return <DropdownMenuArrow {...props} />;
}

function MenubarMenuSubmenuRoot({
  ...props
}: React.ComponentProps<typeof DropdownMenuSubmenuRoot>) {
  return <DropdownMenuSubmenuRoot {...props} />;
}

function MenubarMenuSubmenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubmenuTrigger>) {
  // Check if children contains an icon element (checking for common icon props)
  const hasIcon =
    typeof children === "object" &&
    children !== null &&
    "type" in children &&
    typeof children.type === "function";

  return (
    <DropdownMenuSubmenuTrigger
      className={className}
      style={hasIcon ? undefined : { paddingLeft: "12px" }}
      {...props}
    >
      {children}
    </DropdownMenuSubmenuTrigger>
  );
}

function MenubarMenuShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "mr-1 ml-auto text-muted-foreground text-xs tracking-wider opacity-60",
        "max-sm:hidden",
        className
      )}
      {...props}
    />
  );
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
