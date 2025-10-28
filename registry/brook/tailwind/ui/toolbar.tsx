"use client";

import { Toolbar } from "@base-ui-components/react/toolbar";
import { cn } from "@/lib/tw-utils";

function ToolbarRoot({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof Toolbar.Root>) {
  return (
    <Toolbar.Root
      className={cn(
        "flex items-center gap-1 rounded-[var(--radius)] bg-[var(--mix-card-33-bg)]",
        "border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.9)]",
        orientation === "vertical" && "flex-col items-stretch",
        className
      )}
      orientation={orientation}
      {...props}
    />
  );
}

function ToolbarButton({
  className,
  ...props
}: React.ComponentProps<typeof Toolbar.Button>) {
  return (
    <Toolbar.Button
      className={cn(
        "inline-flex items-center justify-center gap-2 px-3 py-1.5",
        "rounded-[calc(var(--radius)-2px)] border-none bg-transparent",
        "cursor-pointer font-medium text-foreground text-sm",
        "min-h-8 min-w-8 transition-all duration-200",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=pressed]:bg-accent data-[state=pressed]:text-accent-foreground",
        "max-sm:min-h-10 max-sm:min-w-10 max-sm:px-4 max-sm:py-2 max-sm:text-[0.9375rem]",
        className
      )}
      {...props}
    />
  );
}

function ToolbarLink({
  className,
  ...props
}: React.ComponentProps<typeof Toolbar.Link>) {
  return (
    <Toolbar.Link
      className={cn(
        "inline-flex items-center justify-center gap-2 px-3 py-1.5",
        "rounded-[calc(var(--radius)-2px)] text-foreground no-underline",
        "h-8 min-w-8 font-medium text-sm leading-none transition-all duration-200",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
        "max-sm:h-10 max-sm:min-w-10 max-sm:px-4 max-sm:py-2 max-sm:text-[0.9375rem]",
        className
      )}
      {...props}
    />
  );
}

function ToolbarInput({
  className,
  ...props
}: React.ComponentProps<typeof Toolbar.Input>) {
  return (
    <Toolbar.Input
      className={cn(
        "flex-1 rounded-[calc(var(--radius)-2px)] px-3 py-1.5",
        "min-h-8 border border-border bg-input text-foreground text-sm",
        "transition-all duration-200",
        "focus:border-transparent focus:outline-2 focus:outline-ring focus:outline-offset-2",
        "placeholder:text-muted-foreground",
        "max-sm:min-h-10 max-sm:px-4 max-sm:py-2 max-sm:text-[0.9375rem]",
        className
      )}
      {...props}
    />
  );
}

function ToolbarGroup({
  className,
  ...props
}: React.ComponentProps<typeof Toolbar.Group>) {
  return (
    <Toolbar.Group
      className={cn(
        "flex items-center gap-0.5 p-0.5",
        "rounded-[calc(var(--radius)-2px)] bg-muted",
        "max-sm:gap-0.75 max-sm:p-0.75",
        className
      )}
      {...props}
    />
  );
}

function ToolbarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Toolbar.Separator>) {
  return (
    <Toolbar.Separator
      className={cn(
        "mx-1 h-6 w-px flex-shrink-0 bg-border",
        "max-sm:h-7",
        className
      )}
      {...props}
    />
  );
}

export {
  ToolbarRoot as Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator,
};
