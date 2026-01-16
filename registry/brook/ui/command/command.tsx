"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { Dialog } from "@base-ui/react/dialog";
import type React from "react";
import { cn } from "@/lib/utils";
import styles from "./command.module.css";

function CommandDialog({ ...props }: Dialog.Root.Props) {
  return <Dialog.Root {...props} />;
}

function CommandDialogTrigger({ ...props }: Dialog.Trigger.Props) {
  return <Dialog.Trigger data-slot="command-dialog-trigger" {...props} />;
}

const CommandDialogPortal = Dialog.Portal;

function CommandDialogBackdrop({ className, ...props }: Dialog.Backdrop.Props) {
  return <Dialog.Backdrop className={cn(styles.backdrop, className)} data-slot="command-dialog-backdrop" {...props} />;
}

function CommandDialogPopup({
  className,
  children,
  ...props
}: Dialog.Popup.Props & { children?: React.ReactNode }) {
  return (
    <CommandDialogPortal>
      <CommandDialogBackdrop />
      <Dialog.Popup className={cn(styles.dialogPopup, className)} data-slot="command-dialog-popup" {...props}>
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
    <div className={cn(styles.root, className)} data-slot="command">
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
    <div className={styles.inputWrapper} data-slot="command-input-wrapper">
      <Autocomplete.Input
        autoFocus
        className={cn(styles.input, className)}
        data-slot="command-input"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

function CommandList({ className, ...props }: React.ComponentProps<typeof Autocomplete.List>) {
  return <Autocomplete.List className={cn(styles.list, className)} data-slot="command-list" {...props} />;
}

function CommandEmpty({ className, children, ...props }: React.ComponentProps<typeof Autocomplete.Empty>) {
  return (
    <Autocomplete.Empty className={cn(styles.empty, className)} data-slot="command-empty" {...props}>
      {children || "No results found."}
    </Autocomplete.Empty>
  );
}

function CommandGroup({ className, ...props }: React.ComponentProps<typeof Autocomplete.Group>) {
  return <Autocomplete.Group className={cn(styles.group, className)} data-slot="command-group" {...props} />;
}

function CommandGroupLabel({ className, ...props }: React.ComponentProps<typeof Autocomplete.GroupLabel>) {
  return (
    <Autocomplete.GroupLabel className={cn(styles.groupLabel, className)} data-slot="command-group-label" {...props} />
  );
}

function CommandCollection({ ...props }: React.ComponentProps<typeof Autocomplete.Collection>) {
  return <Autocomplete.Collection data-slot="command-collection" {...props} />;
}

function CommandItem({ className, ...props }: React.ComponentProps<typeof Autocomplete.Item>) {
  return <Autocomplete.Item className={cn(styles.item, className)} data-slot="command-item" {...props} />;
}

function CommandSeparator({ className, ...props }: React.ComponentProps<typeof Autocomplete.Separator>) {
  return (
    <Autocomplete.Separator className={cn(styles.separator, className)} data-slot="command-separator" {...props} />
  );
}

function CommandFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.footer, className)} data-slot="command-footer" {...props} />;
}

function CommandShortcut({ className, ...props }: React.ComponentProps<"kbd">) {
  return <kbd className={cn(styles.shortcut, className)} data-slot="command-shortcut" {...props} />;
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
