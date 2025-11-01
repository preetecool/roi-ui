"use client";

import { ContextMenu } from "@base-ui-components/react/context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import type React from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/tw-utils";

function ContextMenuRoot({ ...props }: ContextMenu.Root.Props) {
  return <ContextMenu.Root {...props} />;
}

function ContextMenuTrigger({
  className,
  ...props
}: ContextMenu.Trigger.Props) {
  return (
    <ContextMenu.Trigger
      className={cn("select-none outline-none", className)}
      data-slot="contextmenu-trigger"
      {...props}
    />
  );
}

const ContextMenuPortal = ContextMenu.Portal;

function ContextMenuBackdrop({
  className,
  ...props
}: ContextMenu.Backdrop.Props) {
  return (
    <ContextMenu.Backdrop
      className={cn(
        "fixed inset-0 z-[140] bg-black/80 opacity-0 transition-opacity duration-150",
        "data-[open]:opacity-100",
        className
      )}
      data-slot="contextmenu-backdrop"
      {...props}
    />
  );
}

function ContextMenuPositioner({
  className,
  ...props
}: ContextMenu.Positioner.Props) {
  return (
    <ContextMenu.Positioner
      className={cn("absolute z-[150] outline-none", className)}
      data-slot="contextmenu-positioner"
      {...props}
    />
  );
}

function ContextMenuPopup({ className, ...props }: ContextMenu.Popup.Props) {
  return (
    <ContextMenu.Popup
      className={cn(
        "box-border min-w-[140px] bg-[var(--mix-card-50-bg)]",
        "rounded-[var(--radius)] border-[0.5px] border-border/60",
        "flex flex-col shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
        "origin-[top_center] transition-[transform,scale,opacity] duration-[150ms] ease-[var(--ease-out-expo)]",
        "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
        "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
        "data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none",
        "data-[side=none]:data-[ending-style]:transition-none",
        "max-sm:max-w-[calc(100vw-2rem)] max-sm:p-1.5",
        className
      )}
      data-slot="contextmenu-popup"
      {...props}
    />
  );
}

function ContextMenuArrow({ className, ...props }: ContextMenu.Arrow.Props) {
  return (
    <ContextMenu.Arrow
      className={cn("fill-background stroke-1 stroke-border", className)}
      data-slot="contextmenu-arrow"
      {...props}
    />
  );
}

interface ContextMenuItemProps extends ContextMenu.Item.Props {
  icon?: ReactNode;
  inset?: boolean;
  className?: string;
  children?: ReactNode;
  variant?: "default" | "destructive";
}

function ContextMenuItem({
  className,
  icon,
  children,
  inset = false,
  variant = "default",
  ...props
}: ContextMenuItemProps) {
  return (
    <ContextMenu.Item
      className={cn(
        "flex h-8 items-center gap-3 px-2 pr-1.5 font-normal text-sm leading-tight",
        "m-0 cursor-pointer justify-start rounded-[0.3rem] text-foreground",
        "relative isolate",
        "before:absolute before:inset-x-1 before:inset-y-0 before:content-['']",
        "before:-z-10 before:rounded-[0.3rem] before:bg-transparent",
        "data-[popup-open]:before:bg-accent/70",
        "data-[highlighted]:before:bg-accent/70",
        "hover:before:bg-accent/70",
        "focus:outline-none focus:before:bg-accent/70",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "data-[disabled]:hover:bg-transparent",
        variant !== "destructive" && [
          "[&:hover_.context-menu-shortcut]:text-secondary-foreground",
          "[&:hover_.context-menu-icon]:text-secondary-foreground [&:hover_.context-menu-icon]:opacity-100",
        ],
        variant === "destructive" && [
          "text-[var(--destructive)]",
          "[&_.context-menu-icon]:text-[var(--destructive)]",
          "[&_.context-menu-shortcut]:text-[var(--destructive)]",
          "hover:before:!bg-[var(--destructive)]",
          "hover:!text-[var(--destructive-foreground)]",
          "hover:[&_.context-menu-icon]:!text-[var(--destructive-foreground)]",
          "hover:[&_.context-menu-shortcut]:!text-[var(--destructive-foreground)]",
        ],
        inset && "pl-8",
        "max-sm:min-h-11 max-sm:gap-3 max-sm:px-2.5 max-sm:py-2.5 max-sm:text-[0.9375rem]",
        className
      )}
      data-slot="contextmenu-item"
      {...props}
    >
      {icon && (
        <span className="context-menu-icon ml-1 flex items-center justify-center text-muted-foreground">
          {icon}
        </span>
      )}
      {children}
    </ContextMenu.Item>
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  ...props
}: ContextMenu.CheckboxItem.Props) {
  return (
    <ContextMenu.CheckboxItem
      className={cn(
        "relative flex items-center gap-2 px-2 py-1.5 pl-8 text-sm",
        "cursor-pointer select-none rounded-[calc(var(--radius)-2px)] outline-none",
        "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
        "hover:bg-muted hover:text-accent-foreground data-[highlighted]:bg-muted data-[highlighted]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "max-sm:min-h-11 max-sm:px-3 max-sm:py-2.5 max-sm:pl-9 max-sm:text-[0.9375rem]",
        className
      )}
      data-slot="contextmenu-checkboxitem"
      {...props}
    >
      <span className="absolute left-2 flex h-4 w-4 items-center justify-center max-sm:left-3 max-sm:h-[1.125rem] max-sm:w-[1.125rem]">
        <Check size={16} />
      </span>
      {children}
    </ContextMenu.CheckboxItem>
  );
}

function ContextMenuRadioItem({
  className,
  children,
  ...props
}: ContextMenu.RadioItem.Props) {
  return (
    <ContextMenu.RadioItem
      className={cn(
        "relative flex items-center gap-2 px-2 py-1.5 pl-8 text-sm",
        "cursor-pointer select-none rounded-[calc(var(--radius)-2px)] outline-none",
        "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
        "hover:bg-muted hover:text-accent-foreground data-[highlighted]:bg-muted data-[highlighted]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "max-sm:min-h-11 max-sm:px-3 max-sm:py-2.5 max-sm:pl-9 max-sm:text-[0.9375rem]",
        className
      )}
      data-slot="contextmenu-radioitem"
      {...props}
    >
      <span className="absolute left-2 flex h-4 w-4 items-center justify-center max-sm:left-3 max-sm:h-[1.125rem] max-sm:w-[1.125rem]">
        <Circle fill="currentColor" size={8} />
      </span>
      {children}
    </ContextMenu.RadioItem>
  );
}

function ContextMenuRadioGroup({
  className,
  ...props
}: ContextMenu.RadioGroup.Props) {
  return <ContextMenu.RadioGroup className={cn(className)} {...props} />;
}

function ContextMenuLabel({
  className,
  inset = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }) {
  return (
    <div
      className={cn(
        "px-2 pt-3 pb-1.5 font-medium text-muted-foreground text-xs uppercase tracking-wide",
        inset && "pl-8",
        "max-sm:px-3 max-sm:py-2.5 max-sm:pt-3.5 max-sm:text-[0.8125rem]",
        className
      )}
      {...props}
    />
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: ContextMenu.Separator.Props) {
  return (
    <div className="py-[5px]">
      <ContextMenu.Separator
        className={cn("h-px border-border/60 border-b-[0.5px]", className)}
        {...props}
      />
    </div>
  );
}

function ContextMenuSubmenuRoot({ ...props }: ContextMenu.SubmenuRoot.Props) {
  return <ContextMenu.SubmenuRoot {...props} />;
}

function ContextMenuSubmenuTrigger({
  className,
  inset = false,
  children,
  ...props
}: ContextMenu.SubmenuTrigger.Props & {
  inset?: boolean;
}) {
  return (
    <ContextMenu.SubmenuTrigger
      className={cn(
        "flex h-8 items-center gap-3 px-2 pr-1.5 font-normal text-sm leading-tight",
        "m-0 cursor-pointer justify-start rounded-[0.3rem] text-foreground",
        "relative isolate",
        "before:absolute before:inset-x-1 before:inset-y-0 before:content-['']",
        "before:-z-10 before:rounded-[0.3rem] before:bg-transparent",
        "data-[popup-open]:before:bg-accent/70",
        "data-[highlighted]:before:bg-accent/70",
        "hover:before:bg-accent/70",
        "[&:hover_.submenu-icon]:text-secondary-foreground",
        "[&:hover>svg]:text-secondary-foreground [&>svg]:text-muted-foreground",
        inset && "pl-8",
        "max-sm:min-h-11 max-sm:px-2.5 max-sm:py-2.5 max-sm:text-[0.9375rem]",
        className
      )}
      data-slot="contextmenu-submenutrigger"
      {...props}
    >
      {children}
      <ChevronRight
        className="submenu-icon ml-auto h-4 w-4 text-muted-foreground opacity-60 max-sm:h-[1.125rem] max-sm:w-[1.125rem]"
        size={16}
      />
    </ContextMenu.SubmenuTrigger>
  );
}

function ContextMenuGroup({ className, ...props }: ContextMenu.Group.Props) {
  return (
    <ContextMenu.Group
      className={cn("overflow-hidden", className)}
      data-slot="contextmenu-group"
      {...props}
    />
  );
}

function ContextMenuShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "context-menu-shortcut mr-1 ml-auto text-muted-foreground text-xs tracking-wide opacity-60",
        "max-sm:hidden",
        className
      )}
      {...props}
    />
  );
}

function ContextMenuSpacer() {
  return <div className="h-1 w-full" />;
}

export {
  ContextMenuRoot as ContextMenu,
  ContextMenuArrow,
  ContextMenuBackdrop,
  ContextMenuCheckboxItem,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPopup,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSpacer,
  ContextMenuSubmenuRoot,
  ContextMenuSubmenuTrigger,
  ContextMenuTrigger,
};
