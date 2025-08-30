"use client";

import { Children, isValidElement, cloneElement } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";
import styles from "./command.module.css";
import { Command } from "lucide-react";

const CommandRoot = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof CommandPrimitive>) => (
  <CommandPrimitive className={cn(styles.root, className)} {...props} />
);

const CommandDialog = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Dialog>) => (
  <CommandPrimitive.Dialog className={cn(styles.dialog, className)} {...props} />
);

const CommandInput = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>) => (
  <CommandPrimitive.Input className={cn(styles.input, className)} {...props} />
);

const CommandList = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>) => (
  <CommandPrimitive.List className={cn(styles.list, className)} {...props} />
);

const CommandItem = ({
  className,
  icon,
  keyboardShortcut,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & {
  icon?: boolean;
  keyboardShortcut?: string;
}) => {
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
};

const CommandGroup = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>) => (
  <CommandPrimitive.Group className={cn(styles.group, className)} {...props} />
);

const CommandEmpty = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>) => (
  <CommandPrimitive.Empty className={cn(styles.empty, className)} {...props} />
);

const CommandSeparator = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>) => (
  <CommandPrimitive.Separator className={cn(styles.separator, className)} {...props} />
);

const CommandLoading = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>) => (
  <CommandPrimitive.Loading className={cn(styles.loading, className)} {...props} />
);

export {
  CommandRoot as Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandEmpty,
  CommandSeparator,
  CommandLoading,
};
