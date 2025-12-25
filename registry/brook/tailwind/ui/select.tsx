"use client";

import { Select } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils-tailwind";

function SelectRoot<Value, Multiple extends boolean | undefined = undefined>(
  props: React.ComponentProps<typeof Select.Root<Value, Multiple>>
) {
  return <Select.Root<Value, Multiple> {...props} />;
}

function SelectTrigger({ className, children, ...props }: React.ComponentProps<typeof Select.Trigger>) {
  return (
    <Select.Trigger
      className={cn(
        "min-w-36 bg-[var(--mix-card-50-bg)] max-md:min-w-28",
        "hover:not-disabled:bg-[var(--accent)] hover:not-disabled:text-[var(--foreground)]",
        "focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2",
        "data-[popup-open]:bg-[var(--muted)] data-[popup-open]:text-[var(--foreground)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      data-slot="select-trigger"
      nativeButton
      {...props}
    >
      {children}
    </Select.Trigger>
  );
}

function SelectValue({ className, children, ...props }: React.ComponentProps<typeof Select.Value>) {
  return (
    <Select.Value
      className={cn(
        "!leading-[1.25] flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left",
        "data-[placeholder]:text-[var(--muted-foreground)]",
        className
      )}
      data-slot="select-value"
      {...props}
    >
      {children}
    </Select.Value>
  );
}

function SelectIcon({ className, children, ...props }: React.ComponentProps<typeof Select.Icon>) {
  return (
    <Select.Icon
      className={cn(
        "ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform duration-200 ease-in-out",
        "[.trigger[data-popup-open]_&]:rotate-180",
        className
      )}
      data-slot="select-icon"
      {...props}
    >
      {children || <ChevronDown size={16} />}
    </Select.Icon>
  );
}

function SelectPortal({ ...props }: React.ComponentProps<typeof Select.Portal>) {
  return <Select.Portal {...props} />;
}

function SelectOverlay({ className, ...props }: React.ComponentProps<typeof Select.Backdrop>) {
  return (
    <Select.Backdrop
      className={cn("fixed inset-0 z-140 bg-[rgba(0,0,0,0.5)] transition-opacity duration-150", className)}
      data-slot="select-backdrop"
      {...props}
    />
  );
}

function SelectPositioner({ className, ...props }: React.ComponentProps<typeof Select.Positioner>) {
  return <Select.Positioner className={cn("z-150", className)} {...props} />;
}

function SelectScrollUpArrow({ className, children, ...props }: React.ComponentProps<typeof Select.ScrollUpArrow>) {
  return (
    <Select.ScrollUpArrow
      className={cn(
        "flex h-6 cursor-pointer items-center justify-center border-none bg-[var(--mix-card-33-bg)] text-[var(--foreground)] transition-colors duration-200 ease-in-out",
        "hover:bg-[var(--muted)]",
        "data-[state=hidden]:hidden",
        className
      )}
      data-slot="select-scrolluparrow"
      {...props}
    >
      {children || <ChevronDown size={16} style={{ transform: "rotate(180deg)" }} />}
    </Select.ScrollUpArrow>
  );
}

function SelectPopup({ className, ...props }: React.ComponentProps<typeof Select.Popup>) {
  return (
    <Select.Popup
      className={cn(
        "z-[150] min-w-[var(--anchor-width)] origin-[var(--transform-origin)] overflow-y-auto rounded-[var(--radius)]",
        "border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.8)] bg-[var(--popover)] shadow-[var(--shadow-border-stack)]",
        "transition-[transform,scale,opacity] duration-250 ease-[var(--ease-out-expo)]",
        "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
        "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
        "data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none",
        "data-[side=none]:data-[ending-style]:transition-none",
        className
      )}
      data-slot="select-popup"
      {...props}
    />
  );
}

function SelectArrow({ className, ...props }: React.ComponentProps<typeof Select.Arrow>) {
  return (
    <Select.Arrow
      className={cn(
        "-z-[1] h-3 w-3 rotate-45 border border-[var(--border)] border-r-0 border-b-0 bg-[var(--mix-card-33-bg)]",
        className
      )}
      data-slot="select-arrow"
      {...props}
    />
  );
}

function SelectScrollDownArrow({ className, children, ...props }: React.ComponentProps<typeof Select.ScrollDownArrow>) {
  return (
    <Select.ScrollDownArrow
      className={cn(
        "flex h-6 cursor-pointer items-center justify-center border-none bg-[var(--mix-card-33-bg)] text-[var(--foreground)] transition-colors duration-200 ease-in-out",
        "hover:bg-[var(--muted)]",
        "data-[state=hidden]:hidden",
        className
      )}
      data-slot="select-scrolldownarrow"
      {...props}
    >
      {children || <ChevronDown size={16} />}
    </Select.ScrollDownArrow>
  );
}

function SelectList({ className, ...props }: React.ComponentProps<typeof Select.List>) {
  return <Select.List className={cn("p-0", className)} data-slot="select-list" {...props} />;
}

function SelectItem({ className, ...props }: React.ComponentProps<typeof Select.Item>) {
  return (
    <Select.Item
      className={cn(
        "mx-1 flex min-h-8 cursor-pointer items-center justify-between gap-3 rounded-[0.3125rem] px-2 pr-1.5 text-[var(--foreground)] text-sm outline-none",
        "hover:not-disabled:bg-[var(--accent)]",
        "data-[highlighted]:bg-[var(--muted)] data-[highlighted]:text-[var(--foreground)]",
        "data-[selected]:bg-transparent",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      data-slot="select-item"
      {...props}
    />
  );
}

function SelectItemText({ className, ...props }: React.ComponentProps<typeof Select.ItemText>) {
  return (
    <Select.ItemText
      className={cn("flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left", className)}
      data-slot="select-itemtext"
      {...props}
    />
  );
}

function SelectGroup({ className, ...props }: React.ComponentProps<typeof Select.Group>) {
  return <Select.Group className={cn("p-0", className)} {...props} />;
}

function SelectGroupLabel({ className, ...props }: React.ComponentProps<typeof Select.GroupLabel>) {
  return (
    <Select.GroupLabel
      className={cn(
        "px-3 py-1.5 font-semibold text-[var(--muted-foreground)] text-xs uppercase tracking-wider",
        className
      )}
      data-slot="select-grouplabel"
      {...props}
    />
  );
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof Select.Separator>) {
  return (
    <Select.Separator
      className={cn("my-1 h-px bg-[var(--color-border)]", className)}
      data-slot="select-separator"
      {...props}
    />
  );
}

function SelectItemIndicator({ className, children, ...props }: React.ComponentProps<typeof Select.ItemIndicator>) {
  return (
    <Select.ItemIndicator
      className={cn(
        "ml-2 h-4 w-4 shrink-0 opacity-0",

        "transition-opacity duration-200 ease-in-out",
        "[[data-selected]_&]:opacity-100",
        className
      )}
      data-slot="select-itemindicator"
      {...props}
    >
      {children || <Check size={16} />}
    </Select.ItemIndicator>
  );
}

function SelectSpacer() {
  return <div style={{ height: "4px", width: "100%" }} />;
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
  SelectSpacer,
  SelectTrigger,
  SelectValue,
};
