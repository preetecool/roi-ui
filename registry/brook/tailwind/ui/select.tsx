"use client";

import { Select } from "@base-ui-components/react/select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/tw-utils";

function SelectRoot({ ...props }: React.ComponentProps<typeof Select.Root>) {
  return <Select.Root {...props} />;
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Select.Trigger>) {
  return (
    <Select.Trigger
      className={cn(
        "min-w-36 bg-[var(--mix-card-50-bg)]",
        "hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2",
        "data-[popup-open]:bg-[var(--color-muted)] data-[popup-open]:text-[var(--color-foreground)]",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className
      )}
      nativeButton
      {...props}
    >
      {children}
    </Select.Trigger>
  );
}

function SelectValue({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Select.Value>) {
  return (
    <Select.Value
      className={cn(
        "flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left",
        "data-[placeholder]:text-[var(--color-muted-foreground)]",
        className
      )}
      {...props}
    >
      {children}
    </Select.Value>
  );
}

function SelectIcon({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Select.Icon>) {
  return (
    <Select.Icon
      className={cn(
        "ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform duration-200 ease-in-out",
        "[.trigger[data-popup-open]_&]:rotate-180",
        className
      )}
      {...props}
    >
      {children || <ChevronDown size={16} />}
    </Select.Icon>
  );
}

function SelectPortal({
  ...props
}: React.ComponentProps<typeof Select.Portal>) {
  return <Select.Portal {...props} />;
}

function SelectOverlay({
  className,
  ...props
}: React.ComponentProps<typeof Select.Backdrop>) {
  return (
    <Select.Backdrop
      className={cn(
        "fixed inset-0 z-[140] bg-[rgba(0,0,0,0.5)] transition-opacity duration-150",
        className
      )}
      {...props}
    />
  );
}

function SelectPositioner({
  className,
  ...props
}: React.ComponentProps<typeof Select.Positioner>) {
  return <Select.Positioner className={cn("z-[150]", className)} {...props} />;
}

function SelectScrollUpArrow({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Select.ScrollUpArrow>) {
  return (
    <Select.ScrollUpArrow
      className={cn(
        "flex h-6 cursor-pointer items-center justify-center border-none bg-[var(--mix-card-33-bg)] text-[var(--color-foreground)] transition-colors duration-200 ease-in-out",
        "hover:bg-[var(--color-muted)]",
        "data-[state=hidden]:hidden",
        className
      )}
      {...props}
    >
      {children || (
        <ChevronDown size={16} style={{ transform: "rotate(180deg)" }} />
      )}
    </Select.ScrollUpArrow>
  );
}

function SelectPopup({
  className,
  ...props
}: React.ComponentProps<typeof Select.Popup>) {
  return (
    <Select.Popup
      className={cn(
        "z-[150] w-[var(--anchor-width)] origin-[var(--transform-origin)] overflow-y-auto rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--mix-card-75-bg)]",
        "transition-[transform,opacity] duration-150",
        "data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
        "data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
        "data-[side=none]:transform-none data-[side=none]:opacity-100 data-[side=none]:transition-none",
        className
      )}
      {...props}
    />
  );
}

function SelectArrow({
  className,
  ...props
}: React.ComponentProps<typeof Select.Arrow>) {
  return (
    <Select.Arrow
      className={cn(
        "-z-[1] h-3 w-3 rotate-45 border border-[var(--color-border)] border-r-0 border-b-0 bg-[var(--mix-card-33-bg)]",
        className
      )}
      {...props}
    />
  );
}

function SelectScrollDownArrow({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Select.ScrollDownArrow>) {
  return (
    <Select.ScrollDownArrow
      className={cn(
        "flex h-6 cursor-pointer items-center justify-center border-none bg-[var(--mix-card-33-bg)] text-[var(--color-foreground)] transition-colors duration-200 ease-in-out",
        "hover:bg-[var(--color-muted)]",
        "data-[state=hidden]:hidden",
        className
      )}
      {...props}
    >
      {children || <ChevronDown size={16} />}
    </Select.ScrollDownArrow>
  );
}

function SelectList({
  className,
  ...props
}: React.ComponentProps<typeof Select.List>) {
  return (
    <Select.List
      className={cn("scroll-py-6 px-1 py-1", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  ...props
}: React.ComponentProps<typeof Select.Item>) {
  return (
    <Select.Item
      className={cn(
        "flex cursor-pointer items-center justify-between rounded-[calc(var(--radius)-2px)] py-2 pr-4 pl-3 text-[var(--color-foreground)] text-sm outline-none transition-all duration-200 ease-in-out",
        "hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]",
        "data-[highlighted]:bg-[var(--color-muted)] data-[highlighted]:text-[var(--color-foreground)]",
        "data-[selected]:bg-transparent",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function SelectItemText({
  className,
  ...props
}: React.ComponentProps<typeof Select.ItemText>) {
  return (
    <Select.ItemText
      className={cn(
        "flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left",
        className
      )}
      {...props}
    />
  );
}

function SelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof Select.Group>) {
  return <Select.Group className={cn("p-0", className)} {...props} />;
}

function SelectGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof Select.GroupLabel>) {
  return (
    <Select.GroupLabel
      className={cn(
        "px-3 py-1.5 font-semibold text-[var(--color-muted-foreground)] text-xs uppercase tracking-wider",
        className
      )}
      {...props}
    />
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Select.Separator>) {
  return (
    <Select.Separator
      className={cn("my-1 h-px bg-[var(--color-border)]", className)}
      {...props}
    />
  );
}

function SelectItemIndicator({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Select.ItemIndicator>) {
  return (
    <Select.ItemIndicator
      className={cn(
        "ml-2 h-4 w-4 shrink-0 opacity-0 transition-opacity duration-200 ease-in-out",
        "[.item[data-selected]_&]:opacity-100",
        className
      )}
      {...props}
    >
      {children || <Check size={16} />}
    </Select.ItemIndicator>
  );
}

export {
  SelectRoot as Select,
  SelectArrow,
  SelectGroup,
  SelectGroupLabel,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectOverlay,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectRoot,
  SelectScrollDownArrow,
  SelectScrollUpArrow,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
