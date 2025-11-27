"use client";

import { Menu } from "@base-ui-components/react/menu";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils-tailwind";

function DropdownMenuRoot({ ...props }: Menu.Root.Props) {
  return <Menu.Root {...props} />;
}

function DropdownMenuTrigger({ className, ...props }: Menu.Trigger.Props) {
  return (
    <Menu.Trigger
      {...props}
      className={cn(
        "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
        "data-[popup-open]:bg-muted data-[popup-open]:text-foreground",
        "hover:data-[popup-open]:bg-muted hover:data-[popup-open]:text-foreground",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className
      )}
    />
  );
}

const DropdownMenuPortal = Menu.Portal;

function DropdownMenuPositioner({
  className,
  ...props
}: Menu.Positioner.Props) {
  return (
    <Menu.Positioner
      className={cn("absolute left-0 z-[150]", className)}
      data-slot="menu-positioner"
      side="top"
      {...props}
    />
  );
}

function DropdownMenuPopup({ className, ...props }: Menu.Popup.Props) {
  return (
    <Menu.Popup
      className={cn(
        "min-w-[170px] bg-[var(--popover)]",
        "rounded-[var(--radius)] border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.8)]",
        "flex flex-col",
        "shadow-[var(--shadow-border-stack)]",
        "origin-[top_center] transition-[transform,scale,opacity] duration-[250ms] ease-[var(--ease-out-expo)]",
        "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
        "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
        "data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none",
        "data-[side=none]:data-[ending-style]:transition-none",
        className
      )}
      data-slot="menu-popup"
      {...props}
    />
  );
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
      className={cn(
        "flex h-8 cursor-pointer items-center gap-3 rounded-[0.3125rem] px-2 pr-1.5 font-normal text-foreground text-sm leading-tight",
        "relative isolate m-0 justify-start",
        "before:-z-10 before:absolute before:inset-x-1 before:inset-y-0 before:rounded-[0.3125rem] before:bg-transparent before:content-['']",
        "data-[popup-open]:before:bg-[var(--accent)]",
        "data-[highlighted]:before:bg-[var(--accent)]",
        "hover:before:bg-[var(--accent)]",
        "focus:outline-none focus:before:bg-[var(--accent)]",
        "focus-visible:outline-none",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:bg-transparent",
        "[&:hover_span]:text-secondary-foreground [&:hover_span]:opacity-100",
        "data-[variant=destructive]:text-[var(--destructive)]",
        "data-[variant=destructive]:[&_span]:text-[var(--destructive)]",
        "data-[variant=destructive]:hover:before:!bg-[var(--destructive)]",
        "data-[variant=destructive]:hover:text-[var(--destructive-foreground)]",
        "data-[variant=destructive]:hover:[&_span]:text-[var(--destructive-foreground)]",
        !icon && "pl-3",
        className
      )}
      data-slot="menu-item"
      data-variant={variant === "destructive" ? "destructive" : undefined}
      {...props}
    >
      {icon && (
        <span className="ml-1 flex items-center justify-center text-muted-foreground">
          {icon}
        </span>
      )}
      {children}
    </Menu.Item>
  );
}

function DropdownMenuSeparator({ className, ...props }: Menu.Separator.Props) {
  return (
    <div className="py-[5px]">
      <Menu.Separator
        className={cn(
          "h-px border-[oklch(from_var(--border)_l_c_h_/_0.8)] border-b-[0.5px]",
          className
        )}
        {...props}
      />
    </div>
  );
}

function DropdownMenuArrow({ className, ...props }: Menu.Arrow.Props) {
  return (
    <Menu.Arrow
      className={cn("fill-background stroke-1 stroke-border", className)}
      data-slot="menu-arrow"
      {...props}
    />
  );
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
      className={cn(
        "flex h-8 cursor-pointer items-center gap-3 rounded-[0.3125rem] px-2 pr-1.5 font-normal text-foreground text-sm leading-tight",
        "relative isolate m-0 justify-start",
        "before:-z-10 before:absolute before:inset-x-1 before:inset-y-0 before:rounded-[0.3125rem] before:bg-transparent before:content-['']",
        "data-[popup-open]:before:bg-[oklch(from_var(--accent)_l_c_h_/_0.7)]",
        "data-[highlighted]:before:bg-[oklch(from_var(--accent)_l_c_h_/_0.7)]",
        "hover:before:bg-[oklch(from_var(--accent)_l_c_h_/_0.7)]",
        "focus:outline-none focus-visible:outline-none",
        "[&:hover_.submenu-icon]:text-secondary-foreground",
        className
      )}
      data-slot="menu-submenutrigger"
      {...props}
    >
      {children}
      <ChevronRight
        className="submenu-icon ml-auto h-4 w-4 text-muted-foreground opacity-60"
        size={16}
      />
    </Menu.SubmenuTrigger>
  );
}

function DropdownMenuRadioGroup({ ...props }: Menu.RadioGroup.Props) {
  return <Menu.RadioGroup {...props} />;
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: Menu.RadioItem.Props) {
  return (
    <Menu.RadioItem
      className={cn(
        "flex h-8 cursor-pointer items-center gap-3 rounded-[0.3125rem] px-2 pr-1.5 font-normal text-foreground text-sm leading-tight",
        "relative isolate m-0 justify-start",
        "before:-z-10 before:absolute before:inset-x-1 before:inset-y-0 before:rounded-[0.3125rem] before:bg-transparent before:content-['']",
        "data-[popup-open]:before:bg-[var(--accent)]",
        "data-[highlighted]:before:bg-[var(--accent)]",
        "hover:before:bg-[var(--accent)]",
        "focus:outline-none focus:before:bg-[var(--accent)]",
        "focus-visible:outline-none",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:bg-transparent",
        className
      )}
      data-slot="menu-radioitem"
      {...props}
    >
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
      className={cn(
        "ml-auto flex items-center justify-center text-muted-foreground",
        className
      )}
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
