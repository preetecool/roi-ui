"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Command } from "lucide-react";
import { Children, cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";
import styles from "./command.module.css";

function CommandRoot({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive>) {
  return <CommandPrimitive className={cn(styles.root, className)} {...props} />;
}

function CommandDialog({
  children,
  open,
  onOpenChange,
  ...props
}: Dialog.Root.Props & {
  children?: React.ReactNode;
}) {
  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open} {...props}>
      <Dialog.Portal>
        <Dialog.Backdrop className={cn(styles.dialogOverlay)} />
        <Dialog.Popup className={cn(styles.dialogContent)}>
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function CommandInput({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof CommandPrimitive.Input>) {
  return (
    <CommandPrimitive.Input
      className={cn(styles.input, className)}
      data-slot="commandprimitive-input"
      {...props}
    />
  );
}

function CommandList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      className={cn(styles.list, className)}
      data-slot="commandprimitive-list"
      {...props}
    />
  );
}

function CommandItem({
  className,
  icon,
  keyboardShortcut,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & {
  icon?: boolean;
  keyboardShortcut?: string;
}) {
  const processedChildren =
    icon && Children.count(children) > 0
      ? Children.map(children, (child, index) => {
          if (index === 0 && isValidElement(child)) {
            const typedChild = child as React.ReactElement<
              React.HTMLAttributes<HTMLElement>
            >;
            return cloneElement(typedChild, {
              className: cn(styles.iconBackground, typedChild.props.className),
            });
          }
          return child;
        })
      : children;

  return (
    <CommandPrimitive.Item className={cn(styles.item, className)} {...props}>
      {processedChildren}
      {keyboardShortcut && (
        <span className={styles.keyboardShortcut}>
          <Command size={11} />
          {keyboardShortcut}
        </span>
      )}
    </CommandPrimitive.Item>
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      className={cn(styles.group, className)}
      data-slot="commandprimitive-group"
      {...props}
    />
  );
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      className={cn(styles.empty, className)}
      data-slot="commandprimitive-empty"
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      className={cn(styles.separator, className)}
      data-slot="commandprimitive-separator"
      {...props}
    />
  );
}

function CommandLoading({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>) {
  return (
    <CommandPrimitive.Loading
      className={cn(styles.loading, className)}
      data-slot="commandprimitive-loading"
      {...props}
    />
  );
}

export {
  CommandRoot as Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
  CommandSeparator,
};
