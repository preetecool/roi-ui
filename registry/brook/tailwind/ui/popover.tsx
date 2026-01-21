"use client";

import { Popover } from "@base-ui/react/popover";
import type * as React from "react";
import { cn } from "@/lib/utils-tailwind";

const createPopoverHandle = Popover.createHandle;

function PopoverRoot({ ...props }: Popover.Root.Props) {
  return <Popover.Root {...props} />;
}

function PopoverTrigger({ className, ...props }: Popover.Trigger.Props) {
  return (
    <Popover.Trigger
      className={cn(
        "data-[popup-open]:!bg-accent data-[popup-open]:!text-accent-foreground",
        "focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-1",
        className
      )}
      data-slot="popover-trigger"
      nativeButton
      {...props}
    />
  );
}

const PopoverPortal = Popover.Portal;

function PopoverBackdrop({ className, ...props }: Popover.Backdrop.Props) {
  return (
    <Popover.Backdrop
      className={cn("fixed inset-0 z-[998] bg-[oklch(0_0_0_/_0.1)]", className)}
      data-slot="popover-backdrop"
      {...props}
    />
  );
}

function PopoverPositioner({ className, ...props }: Popover.Positioner.Props) {
  return (
    <Popover.Positioner
      className={cn(
        "z-50 h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] data-[instant]:transition-none",
        className
      )}
      data-slot="popover-positioner"
      {...props}
    />
  );
}

function PopoverPopup({
  children,
  className,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  alignOffset = 0,
  arrow = true,
  ...props
}: Popover.Popup.Props & {
  side?: Popover.Positioner.Props["side"];
  align?: Popover.Positioner.Props["align"];
  sideOffset?: Popover.Positioner.Props["sideOffset"];
  alignOffset?: Popover.Positioner.Props["alignOffset"];
  arrow?: boolean;
}) {
  return (
    <Popover.Portal>
      <Popover.Positioner
        align={align}
        alignOffset={alignOffset}
        className="z-50 h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] data-[instant]:transition-none"
        data-slot="popover-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <Popover.Popup
          className={cn(
            "relative flex h-[var(--popup-height,auto)] w-[var(--popup-width,auto)] origin-[var(--transform-origin)] rounded-[var(--radius)] bg-popover bg-clip-padding text-popover-foreground shadow-[0_0_0_0.5px_oklch(from_var(--border)_l_c_h_/_0.8),var(--shadow-lg)] transition-[transform,opacity] duration-250 ease-[var(--ease-out-expo)] will-change-[transform,opacity] data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
            className
          )}
          data-slot="popover-popup"
          {...props}
        >
          {arrow && (
            <Popover.Arrow className="z-[1] flex data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=top]:bottom-[-8px] data-[side=right]:left-[-13px] data-[side=bottom]:rotate-0 data-[side=left]:rotate-90 data-[side=top]:rotate-180 data-[side=right]:-rotate-90">
              <ArrowSvg />
            </Popover.Arrow>
          )}
          <Popover.Viewport
            className="relative size-full max-h-[var(--available-height)] overflow-clip not-data-[transitioning]:overflow-y-auto px-[var(--viewport-inline-padding)] py-4 outline-none [--viewport-inline-padding:1rem] data-[instant]:transition-none [&[data-activation-direction~=left]_[data-current][data-starting-style]]:translate-x-[-50%] [&[data-activation-direction~=left]_[data-current][data-starting-style]]:opacity-0 [&[data-activation-direction~=left]_[data-previous][data-ending-style]]:translate-x-[50%] [&[data-activation-direction~=left]_[data-previous][data-ending-style]]:opacity-0 [&[data-activation-direction~=right]_[data-current][data-starting-style]]:translate-x-[50%] [&[data-activation-direction~=right]_[data-current][data-starting-style]]:opacity-0 [&[data-activation-direction~=right]_[data-previous][data-ending-style]]:translate-x-[-50%] [&[data-activation-direction~=right]_[data-previous][data-ending-style]]:opacity-0 [&_[data-current]]:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] [&_[data-current]]:translate-x-0 [&_[data-current]]:opacity-100 [&_[data-current]]:transition-[transform,opacity] [&_[data-current]]:duration-200 [&_[data-current]]:ease-out [&_[data-previous]]:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] [&_[data-previous]]:translate-x-0 [&_[data-previous]]:opacity-100 [&_[data-previous]]:transition-[transform,opacity] [&_[data-previous]]:duration-200 [&_[data-previous]]:ease-out"
            data-slot="popover-viewport"
          >
            {children}
          </Popover.Viewport>
        </Popover.Popup>
      </Popover.Positioner>
    </Popover.Portal>
  );
}

function ArrowSvg(props: React.ComponentProps<"svg">) {
  return (
    <svg fill="none" height="10" viewBox="0 0 20 10" width="20" {...props}>
      <path
        className="fill-popover"
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
      />
      <path
        className="fill-border"
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
      />
      <path
        className="fill-popover"
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
      />
    </svg>
  );
}

function PopoverArrow({ className, ...props }: Popover.Arrow.Props) {
  return (
    <Popover.Arrow
      className={cn(
        "z-[1] flex",
        "data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
        "data-[side=bottom]:top-[-8px] data-[side=bottom]:rotate-0",
        "data-[side=left]:right-[-13px] data-[side=left]:rotate-90",
        "data-[side=right]:-rotate-90 data-[side=right]:left-[-13px]",
        className
      )}
      data-slot="popover-arrow"
      {...props}
    />
  );
}

function PopoverTitle({ className, ...props }: Popover.Title.Props) {
  return (
    <Popover.Title
      className={cn("font-semibold text-lg leading-none", className)}
      data-slot="popover-title"
      {...props}
    />
  );
}

function PopoverDescription({ className, ...props }: Popover.Description.Props) {
  return (
    <Popover.Description
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="popover-description"
      {...props}
    />
  );
}

function PopoverClose({ className, ...props }: Popover.Close.Props) {
  return (
    <Popover.Close
      className={cn(
        "absolute top-1 right-1 box-border inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-[var(--radius)] p-0 text-muted-foreground",
        "transition-[background-color_150ms_ease,color_150ms_ease]",
        "hover:bg-muted hover:text-foreground",
        "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
        "[&_svg]:h-4 [&_svg]:w-4",
        className
      )}
      data-slot="popover-close"
      {...props}
    />
  );
}

function PopoverViewport({ className, ...props }: Popover.Viewport.Props) {
  return <Popover.Viewport className={cn("relative", className)} data-slot="popover-viewport" {...props} />;
}

function PopoverContent({ className, style, ...props }: Popover.Popup.Props) {
  return (
    <PopoverPortal>
      <PopoverPositioner sideOffset={8}>
        <Popover.Popup
          className={cn(
            "!relative box-border origin-[var(--transform-origin)] rounded-[var(--radius)] bg-popover bg-clip-padding px-4 py-2 text-popover-foreground",
            "transition-[transform,opacity] duration-250 ease-[var(--ease-out-expo)] will-change-[transform,_opacity]",
            "shadow-[0_0_0_0.5px_oklch(from_var(--border)_l_c_h_/_0.8),var(--shadow-lg)]",
            "z-[1000]",
            "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
            "focus-visible:outline-1 focus-visible:outline-ring focus-visible:outline-offset-1",
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
  PopoverViewport,
  createPopoverHandle,
};
