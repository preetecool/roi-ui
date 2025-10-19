"use client";

import { cn } from "@/lib/utils";
import { Command as CommandPrimitive } from "cmdk";
import { Command } from "lucide-react";
import { Children, cloneElement, isValidElement } from "react";
import styles from "./command.module.css";

function CommandRoot({ className, ...props }: React.ComponentPropsWithoutRef<typeof CommandPrimitive>) {
  return <CommandPrimitive className={cn(styles.root, className)} {...props} />;
}

function CommandDialog({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Dialog>) {
  return <CommandPrimitive.Dialog className={cn(styles.dialog, className)} {...props} />;
}

function CommandInput({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof CommandPrimitive.Input>) {
  return <CommandPrimitive.Input className={cn(styles.input, className)} {...props} />;
}

function CommandList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>) {
  return <CommandPrimitive.List className={cn(styles.list, className)} {...props} />;
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
            const typedChild = child as React.ReactElement<React.HTMLAttributes<HTMLElement>>;
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
  return <CommandPrimitive.Group className={cn(styles.group, className)} {...props} />;
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>) {
  return <CommandPrimitive.Empty className={cn(styles.empty, className)} {...props} />;
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>) {
  return <CommandPrimitive.Separator className={cn(styles.separator, className)} {...props} />;
}

function CommandLoading({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>) {
  return <CommandPrimitive.Loading className={cn(styles.loading, className)} {...props} />;
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
