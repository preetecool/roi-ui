"use client";

import { Popover } from "@base-ui-components/react/popover";
import { cn } from "@/lib/tw-utils";

function PopoverRoot({ ...props }: Popover.Root.Props) {
  return <Popover.Root {...props} />;
}

function PopoverTrigger({
  className,
  render,
  ...props
}: Popover.Trigger.Props) {
  return (
    <Popover.Trigger
      data-slot="popover-trigger"
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
}: Popover.Backdrop.Props) {
  return (
    <Popover.Backdrop
      data-slot="popover-backdrop"
      className={cn("fixed inset-0 z-[998] bg-[oklch(0_0_0_/_0.1)]", className)}
      {...props}
    />
  );
}

function PopoverPositioner({
  className,
  ...props
}: Popover.Positioner.Props) {
  return (
    <Popover.Positioner
      data-slot="popover-positioner"
      className={cn("absolute z-[999]", className)}
      {...props}
    />
  );
}

function PopoverPopup({
  className,
  ...props
}: Popover.Popup.Props) {
  return (
    <Popover.Popup
      data-slot="popover-popup"
      className={cn(
        "relative box-border origin-[var(--transform-origin)] rounded-[var(--radius)] bg-[var(--mix-card-33-bg)] px-4 py-2 text-[var(--popover-foreground)]",
        "transition-[transform_150ms_ease,opacity_150ms_ease]",
        "outline outline-[0.5px] outline-[var(--color-border-60)]",
        "shadow-[0px_1px_2px_var(--color-border-10),0px_1px_2px_var(--color-border-10),0px_1px_1px_var(--color-border-10)]",
        "z-[1000]",
        "data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
        "data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
        "focus-visible:outline-1 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-1",
        "[&[data-theme='dark']]:-outline-offset-1 [&[data-theme='dark']]:outline-[0.5px] [&[data-theme='dark']]:outline-[var(--color-border-60)]",
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
}: Popover.Arrow.Props) {
  return (
    <Popover.Arrow
      data-slot="popover-arrow"
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
}: Popover.Title.Props) {
  return (
    <Popover.Title
      data-slot="popover-title"
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
}: Popover.Description.Props) {
  return (
    <Popover.Description
      data-slot="popover-description"
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
}: Popover.Close.Props) {
  return (
    <Popover.Close
      data-slot="popover-close"
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
}: Popover.Popup.Props) {
  return (
    <PopoverPortal>
      <PopoverPositioner sideOffset={8}>
        <PopoverPopup
          className={cn(
            "relative box-border origin-[var(--transform-origin)] rounded-[var(--radius)] bg-[var(--mix-card-33-bg)] px-4 py-2 text-[var(--popover-foreground)]",
            "transition-[transform_150ms_ease,opacity_150ms_ease]",
            "outline outline-[0.5px] outline-[var(--color-border-60)]",
            "shadow-[0px_1px_2px_var(--color-border-10),0px_1px_2px_var(--color-border-10),0px_1px_1px_var(--color-border-10)]",
            "z-[1000]",
            "data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
            "focus-visible:outline-1 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-1",
            "[&[data-theme='dark']]:-outline-offset-1 [&[data-theme='dark']]:outline-[0.5px] [&[data-theme='dark']]:outline-[var(--color-border-60)]",
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
