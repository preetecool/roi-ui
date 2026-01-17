"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { Dialog } from "@base-ui/react/dialog";
import type React from "react";
import { cn } from "@/lib/utils-tailwind";

function CommandDialog({ ...props }: Dialog.Root.Props) {
  return <Dialog.Root {...props} />;
}

function CommandDialogTrigger({ ...props }: Dialog.Trigger.Props) {
  return <Dialog.Trigger data-slot="command-dialog-trigger" {...props} />;
}

const CommandDialogPortal = Dialog.Portal;

function CommandDialogBackdrop({ className, ...props }: Dialog.Backdrop.Props) {
  return (
    <Dialog.Backdrop
      className={cn(
        "fixed inset-0 z-[var(--dialog-z)] bg-[var(--dialog-overlay)] transition-opacity duration-150",
        "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        className
      )}
      data-slot="command-dialog-backdrop"
      {...props}
    />
  );
}

function CommandDialogPopup({
  className,
  children,
  ...props
}: Dialog.Popup.Props & { children?: React.ReactNode }) {
  return (
    <CommandDialogPortal>
      <CommandDialogBackdrop />
      <Dialog.Popup
        className={cn(
          "fixed left-1/2 top-1/2 z-[101] -translate-x-1/2 -translate-y-1/2",
          "w-[calc(100%-2rem)] max-w-[560px] rounded-[var(--radius)]",
          "border-none bg-[var(--background)]",
          "shadow-[0_0_0_0.5px_oklch(from_var(--border)_l_c_h_/_0.5),var(--shadow-lg)]",
          "transition-all duration-150",
          "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
          "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
          "max-sm:w-[calc(100%-2rem)] max-sm:max-w-none",
          className
        )}
        data-slot="command-dialog-popup"
        {...props}
      >
        {children}
      </Dialog.Popup>
    </CommandDialogPortal>
  );
}

function Command({
  autoHighlight = "always",
  keepHighlight = true,
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Root> & { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden text-[var(--foreground)]",
        className
      )}
      data-slot="command"
    >
      <Autocomplete.Root
        autoHighlight={autoHighlight}
        filter={null}
        inline
        keepHighlight={keepHighlight}
        open
        {...props}
      />
    </div>
  );
}

function CommandInput({
  className,
  placeholder = "Search...",
  ...props
}: React.ComponentProps<typeof Autocomplete.Input>) {
  return (
    <div
      className="flex items-center gap-3 p-3 shadow-[inset_0_-0.5px_0_0_oklch(from_var(--border)_l_c_h_/_0.5)]"
      data-slot="command-input-wrapper"
    >
      <Autocomplete.Input
        autoFocus
        className={cn(
          "flex h-6 w-full border-none bg-transparent text-sm outline-none",
          "text-[var(--foreground)] caret-[var(--primary)]",
          "placeholder:text-[var(--muted-foreground)]",
          "focus:outline-none",
          "max-sm:text-[0.9375rem] max-sm:placeholder:text-[0.9375rem]",
          className
        )}
        data-slot="command-input"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

function CommandList({ className, ...props }: React.ComponentProps<typeof Autocomplete.List>) {
  return (
    <Autocomplete.List
      className={cn(
        "max-h-[300px] overflow-auto p-1 outline-none",
        "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[oklch(from_var(--border)_l_c_h_/_0.5)]",
        "hover:scrollbar-thumb-[oklch(from_var(--border)_l_c_h_/_0.7)]",
        "[&::-webkit-scrollbar]:w-1.5",
        "[&::-webkit-scrollbar-track]:bg-transparent",
        "[&::-webkit-scrollbar-thumb]:rounded-[3px] [&::-webkit-scrollbar-thumb]:bg-[oklch(from_var(--border)_l_c_h_/_0.5)]",
        "[&::-webkit-scrollbar-thumb:hover]:bg-[oklch(from_var(--border)_l_c_h_/_0.7)]",
        "max-sm:max-h-[250px] max-sm:p-1.5",
        className
      )}
      data-slot="command-list"
      {...props}
    />
  );
}

function CommandEmpty({ className, children, ...props }: React.ComponentProps<typeof Autocomplete.Empty>) {
  return (
    <Autocomplete.Empty
      className={cn(
        "p-6 text-center text-sm text-[var(--muted-foreground)]",
        "max-sm:px-4 max-sm:py-7 max-sm:text-[0.9375rem]",
        className
      )}
      data-slot="command-empty"
      {...props}
    >
      {children || "No results found."}
    </Autocomplete.Empty>
  );
}

function CommandGroup({ className, ...props }: React.ComponentProps<typeof Autocomplete.Group>) {
  return (
    <Autocomplete.Group
      className={cn("overflow-hidden py-1 text-[var(--foreground)]", className)}
      data-slot="command-group"
      {...props}
    />
  );
}

function CommandGroupLabel({ className, ...props }: React.ComponentProps<typeof Autocomplete.GroupLabel>) {
  return (
    <Autocomplete.GroupLabel
      className={cn(
        "px-2 pb-1 pt-2 text-[0.71875rem] font-medium uppercase tracking-wide text-[var(--muted-foreground)]",
        "max-sm:px-2.5 max-sm:text-[0.8125rem]",
        className
      )}
      data-slot="command-group-label"
      {...props}
    />
  );
}

function CommandCollection({ ...props }: React.ComponentProps<typeof Autocomplete.Collection>) {
  return <Autocomplete.Collection data-slot="command-collection" {...props} />;
}

function CommandItem({ className, ...props }: React.ComponentProps<typeof Autocomplete.Item>) {
  return (
    <Autocomplete.Item
      className={cn(
        "flex min-h-[2.5rem] cursor-pointer select-none items-center gap-2 rounded-none border border-transparent",
        "px-[0.375rem] py-[0.625rem] text-sm font-normal leading-[normal] outline-none",
        "hover:bg-[var(--mix-card-50-bg)] data-[highlighted]:bg-[var(--mix-card-50-bg)]",
        "focus-visible:z-[1] focus-visible:outline-2 focus-visible:outline-[var(--primary)] focus-visible:outline-offset-2",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-[var(--muted-foreground)]",
        "max-sm:min-h-[2.75rem] max-sm:gap-3 max-sm:px-2.5 max-sm:py-3 max-sm:text-[0.9375rem]",
        "max-sm:[&_svg]:h-[1.125rem] max-sm:[&_svg]:w-[1.125rem]",
        className
      )}
      data-slot="command-item"
      {...props}
    />
  );
}

function CommandSeparator({ className, ...props }: React.ComponentProps<typeof Autocomplete.Separator>) {
  return (
    <Autocomplete.Separator
      className={cn("my-1 h-[0.5px] w-full bg-[oklch(from_var(--border)_l_c_h_/_0.4)]", className)}
      data-slot="command-separator"
      {...props}
    />
  );
}

function CommandFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-3 border-t-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.5)]",
        "bg-[oklch(from_var(--muted)_l_c_h_/_0.2)] px-4 py-3",
        className
      )}
      data-slot="command-footer"
      {...props}
    />
  );
}

function CommandShortcut({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "ml-auto flex items-center gap-1 border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.5)]",
        "bg-[var(--background)] px-1 py-0.5 font-mono text-xs font-medium text-[var(--muted-foreground)]",
        "[&_svg]:shrink-0",
        "max-sm:px-1.5 max-sm:py-[0.1875rem] max-sm:text-[0.8125rem]",
        className
      )}
      data-slot="command-shortcut"
      {...props}
    />
  );
}

export {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogBackdrop,
  CommandDialogPopup,
  CommandDialogPortal,
  CommandDialogTrigger,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
