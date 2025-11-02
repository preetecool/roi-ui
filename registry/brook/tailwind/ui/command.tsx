"use client";

import { Command as CommandPrimitive } from "cmdk";
import { Command } from "lucide-react";
import { Children, cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils-tailwind";

function CommandRoot({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      className={cn(
        "[&[cmdk-root]]:flex [&[cmdk-root]]:w-full [&[cmdk-root]]:flex-col",
        "[&[cmdk-root]]:h-full [&[cmdk-root]]:max-h-[400px] [&[cmdk-root]]:overflow-hidden",
        "[&[cmdk-root]]:border-[0.5px] [&[cmdk-root]]:border-border/70 [&[cmdk-root]]:text-foreground",
        "max-sm:[&[cmdk-root]]:h-auto",
        className
      )}
      {...props}
    />
  );
}

function CommandDialog({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Dialog>) {
  return (
    <CommandPrimitive.Dialog
      className={cn(
        "[&[cmdk-dialog]]:fixed [&[cmdk-dialog]]:inset-0 [&[cmdk-dialog]]:z-50",
        "[&[cmdk-dialog]]:flex [&[cmdk-dialog]]:items-center [&[cmdk-dialog]]:bg-black/80",
        "[&[cmdk-dialog]]:justify-center [&[cmdk-dialog]]:p-4",
        "[&[cmdk-dialog]]:animate-[command-dialog-in_200ms_ease-out]",
        "[&[cmdk-dialog]_.root]:w-full [&[cmdk-dialog]_.root]:max-w-[32rem]",
        "[&[cmdk-dialog]_.root]:rounded-[var(--radius)] [&[cmdk-dialog]_.root]:shadow-lg",
        "[&[cmdk-dialog]_.root]:border-[0.5px] [&[cmdk-dialog]_.root]:border-border/50",
        "[&[cmdk-dialog]_.root]:bg-card",
        "max-sm:[&[cmdk-dialog]_.root]:m-4 max-sm:[&[cmdk-dialog]_.root]:max-w-[calc(100vw-2rem)]",
        className
      )}
      data-slot="commandprimitive-dialog"
      {...props}
    />
  );
}

function CommandInput({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof CommandPrimitive.Input>) {
  return (
    <CommandPrimitive.Input
      className={cn(
        "[&[cmdk-input]]:flex [&[cmdk-input]]:h-11 [&[cmdk-input]]:w-full",
        "[&[cmdk-input]]:border-none [&[cmdk-input]]:bg-transparent",
        "[&[cmdk-input]]:px-3 [&[cmdk-input]]:py-3 [&[cmdk-input]]:text-sm",
        "[&[cmdk-input]]:text-foreground [&[cmdk-input]]:outline-none",
        "[&[cmdk-input]]:caret-primary",
        "[&[cmdk-input]]:placeholder:text-muted-foreground",
        "[&[cmdk-input]]:focus:outline-none",
        "[&[cmdk-root]:focus-within_&[cmdk-input]]:outline-none",
        "max-sm:[&[cmdk-input]]:h-12 max-sm:[&[cmdk-input]]:text-[0.9375rem]",
        "max-sm:[&[cmdk-input]]:px-3 max-sm:[&[cmdk-input]]:py-3",
        "max-sm:[&[cmdk-input]]:placeholder:text-[0.9375rem]",
        className
      )}
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
      className={cn(
        "[&[cmdk-list]]:max-h-[300px] [&[cmdk-list]]:overflow-auto [&[cmdk-list]]:p-1",
        "[&[cmdk-list]]:scrollbar-thin",
        "max-sm:[&[cmdk-list]]:max-h-[250px] max-sm:[&[cmdk-list]]:p-1.5",
        className
      )}
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
              className: cn(
                "flex items-center justify-center border-[0.5px] border-border/50 bg-muted p-1.5",
                typedChild.props.className
              ),
            });
          }
          return child;
        })
      : children;

  return (
    <CommandPrimitive.Item
      className={cn(
        "[&[cmdk-item]]:relative [&[cmdk-item]]:flex [&[cmdk-item]]:cursor-pointer",
        "[&[cmdk-item]]:select-none [&[cmdk-item]]:items-center",
        "[&[cmdk-item]]:px-2 [&[cmdk-item]]:py-2 [&[cmdk-item]]:text-sm",
        "[&[cmdk-item]]:mt-2 [&[cmdk-item]]:gap-2 [&[cmdk-item]]:outline-none",
        "[&[cmdk-item]]:isolate",
        "[&[cmdk-item]]:before:absolute [&[cmdk-item]]:before:inset-0 [&[cmdk-item]]:before:content-['']",
        "[&[cmdk-item]]:before:-z-10 [&[cmdk-item]]:before:bg-transparent",
        "[&[cmdk-item]]:hover:before:bg-[var(--mix-card-80-muted)]",
        "[&[cmdk-item][data-selected=true]]:before:bg-[var(--mix-card-80-muted)]",
        "[&[cmdk-item][data-disabled=true]]:pointer-events-none [&[cmdk-item][data-disabled=true]]:opacity-50",
        "[&[cmdk-item]_svg:not(.keyboard-shortcut_svg)]:h-4 [&[cmdk-item]_svg:not(.keyboard-shortcut_svg)]:w-4",
        "[&[cmdk-item]_svg:not(.keyboard-shortcut_svg)]:flex-shrink-0",
        "[&[cmdk-item]:has(svg)]:p-1",
        "max-sm:[&[cmdk-item]]:min-h-11 max-sm:[&[cmdk-item]]:px-2.5 max-sm:[&[cmdk-item]]:py-3",
        "max-sm:[&[cmdk-item]]:gap-3 max-sm:[&[cmdk-item]]:text-[0.9375rem]",
        "max-sm:[&[cmdk-item]:has(svg)]:px-2.5 max-sm:[&[cmdk-item]:has(svg)]:py-2",
        "max-sm:[&[cmdk-item]_svg:not(.keyboard-shortcut_svg)]:h-[1.125rem]",
        "max-sm:[&[cmdk-item]_svg:not(.keyboard-shortcut_svg)]:w-[1.125rem]",
        className
      )}
      data-slot="commandprimitive-item"
      {...props}
    >
      {processedChildren}
      {keyboardShortcut && (
        <span
          className={cn(
            "ml-auto border-[0.5px] border-border/50 bg-background px-1 py-0.5",
            "font-medium font-mono text-muted-foreground text-xs",
            "flex items-center gap-1",
            "max-sm:px-1.5 max-sm:py-0.5 max-sm:text-[0.8125rem]"
          )}
        >
          <Command className="flex-shrink-0" size={11} />
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
      className={cn(
        "[&[cmdk-group]]:overflow-hidden [&[cmdk-group]]:py-1 [&[cmdk-group]]:text-foreground",
        "[&[cmdk-group]_[cmdk-group-heading]]:px-2 [&[cmdk-group]_[cmdk-group-heading]]:text-[0.71875rem]",
        "[&[cmdk-group]_[cmdk-group-heading]]:font-medium [&[cmdk-group]_[cmdk-group-heading]]:text-muted-foreground",
        "[&[cmdk-group]_[cmdk-group-heading]]:uppercase [&[cmdk-group]_[cmdk-group-heading]]:tracking-wide",
        "max-sm:[&[cmdk-group]_[cmdk-group-heading]]:text-[0.8125rem]",
        "max-sm:[&[cmdk-group]_[cmdk-group-heading]]:px-2.5",
        className
      )}
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
      className={cn(
        "[&[cmdk-empty]]:p-6 [&[cmdk-empty]]:text-center [&[cmdk-empty]]:text-muted-foreground",
        "[&[cmdk-empty]]:text-sm",
        "max-sm:[&[cmdk-empty]]:px-4 max-sm:[&[cmdk-empty]]:py-7 max-sm:[&[cmdk-empty]]:text-[0.9375rem]",
        className
      )}
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
      className={cn(
        "[&[cmdk-separator]]:h-px [&[cmdk-separator]]:w-full",
        "[&[cmdk-separator]]:my-1 [&[cmdk-separator]]:bg-border/40",
        className
      )}
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
      className={cn(
        "[&[cmdk-loading]]:flex [&[cmdk-loading]]:items-center [&[cmdk-loading]]:p-4",
        "[&[cmdk-loading]]:justify-center [&[cmdk-loading]]:text-muted-foreground",
        "[&[cmdk-loading]]:text-sm",
        className
      )}
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
