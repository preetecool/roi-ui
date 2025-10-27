"use client";

import { Popover } from "@base-ui-components/react/popover";
import { cn } from "@/lib/tw-utils";

function PopoverRoot({ ...props }: React.ComponentProps<typeof Popover.Root>) {
  return <Popover.Root {...props} />;
}

function PopoverTrigger({
  className,
  render,
  ...props
}: React.ComponentProps<typeof Popover.Trigger>) {
  return (
    <Popover.Trigger
      className={cn(
        "hover:bg-[var(--accent)]",
        "active:bg-[var(--accent)]",
        "data-[popup-open]:bg-[var(--accent)]",
        "focus-visible:-outline-offset-1 focus-visible:outline-2 focus-visible:outline-[var(--ring)]",
        className
      )}
      render={render}
      {...props}
    />
  );
}

const PopoverPortal = Popover.Portal;

function PopoverBackdrop({
  className,
  ...props
}: React.ComponentProps<typeof Popover.Backdrop>) {
  return (
    <Popover.Backdrop
      className={cn("fixed inset-0 z-[998] bg-[oklch(0_0_0_/_0.1)]", className)}
      {...props}
    />
  );
}

function PopoverPositioner({
  className,
  ...props
}: React.ComponentProps<typeof Popover.Positioner>) {
  return (
    <Popover.Positioner
      className={cn("absolute z-[999]", className)}
      {...props}
    />
  );
}

function PopoverPopup({
  className,
  ...props
}: React.ComponentProps<typeof Popover.Popup>) {
  return (
    <Popover.Popup
      className={cn(
        "relative box-border origin-[var(--transform-origin)] rounded-[var(--radius)] bg-[var(--mix-card-33-bg)] px-4 py-2 text-[var(--popover-foreground)]",
        "transition-[transform_150ms_ease,opacity_150ms_ease]",
        "outline outline-0.5 outline-[oklch(from_var(--border)_l_c_h_/_0.6)]",
        "shadow-[oklch(from_var(--border)_l_c_h_/_0.1)_0px_1px_2px,oklch(from_var(--border)_l_c_h_/_0.1)_0px_1px_2px,oklch(from_var(--border)_l_c_h_/_0.1)_0px_1px_1px]",
        "z-[1000]",
        "data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
        "data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
        "focus-visible:outline-1 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-1",
        "[&[data-theme='dark']]:-outline-offset-1 [&[data-theme='dark']]:outline-0.5 [&[data-theme='dark']]:outline-[oklch(from_var(--border)_l_c_h_/_0.7)]",
        "max-sm:m-4 max-sm:max-w-[calc(100vw-2rem)]",
        className
      )}
      {...props}
    />
  );
}

function PopoverArrow({
  className,
  ...props
}: React.ComponentProps<typeof Popover.Arrow>) {
  return (
    <Popover.Arrow
      className={cn(
        "flex",
        "data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
        "data-[side=bottom]:top-[-8px] data-[side=bottom]:rotate-0",
        "data-[side=left]:right-[-13px] data-[side=left]:rotate-90",
        "data-[side=right]:-rotate-90 data-[side=right]:left-[-13px]",
        "[&_svg]:fill-[var(--mix-card-33-bg)] [&_svg]:stroke-1 [&_svg]:stroke-[var(--border)]",
        className
      )}
      {...props}
    />
  );
}

function PopoverTitle({
  className,
  ...props
}: React.ComponentProps<typeof Popover.Title>) {
  return (
    <Popover.Title
      className={cn(
        "m-0 font-medium text-[var(--popover-foreground)] text-base leading-6",
        className
      )}
      {...props}
    />
  );
}

function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<typeof Popover.Description>) {
  return (
    <Popover.Description
      className={cn(
        "m-0 text-[var(--muted-foreground)] text-base leading-6",
        className
      )}
      {...props}
    />
  );
}

function PopoverClose({
  className,
  ...props
}: React.ComponentProps<typeof Popover.Close>) {
  return (
    <Popover.Close
      className={cn(
        "all-unset absolute top-1 right-1 box-border inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-[var(--radius)] p-0 text-[var(--muted-foreground)]",
        "transition-[background-color_150ms_ease,color_150ms_ease]",
        "hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
        "focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2",
        "[&_svg]:h-4 [&_svg]:w-4",
        className
      )}
      {...props}
    />
  );
}

function PopoverContent({
  className,
  style,
  ...props
}: React.ComponentProps<typeof Popover.Popup>) {
  return (
    <PopoverPortal>
      <PopoverPositioner sideOffset={8}>
        <PopoverPopup
          className={cn(
            "relative box-border origin-[var(--transform-origin)] rounded-[var(--radius)] bg-[var(--mix-card-33-bg)] px-4 py-2 text-[var(--popover-foreground)]",
            "transition-[transform_150ms_ease,opacity_150ms_ease]",
            "outline outline-0.5 outline-[oklch(from_var(--border)_l_c_h_/_0.6)]",
            "shadow-[oklch(from_var(--border)_l_c_h_/_0.1)_0px_1px_2px,oklch(from_var(--border)_l_c_h_/_0.1)_0px_1px_2px,oklch(from_var(--border)_l_c_h_/_0.1)_0px_1px_1px]",
            "z-[1000]",
            "data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
            "focus-visible:outline-1 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-1",
            "[&[data-theme='dark']]:-outline-offset-1 [&[data-theme='dark']]:outline-0.5 [&[data-theme='dark']]:outline-[oklch(from_var(--border)_l_c_h_/_0.7)]",
            "max-sm:m-4 max-sm:max-w-[calc(100vw-2rem)]",
            className
          )}
          style={style}
          {...props}
        />
      </PopoverPositioner>
    </PopoverPortal>
  );
}

export {
  PopoverRoot as Popover,
  PopoverArrow,
  PopoverBackdrop,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
};
