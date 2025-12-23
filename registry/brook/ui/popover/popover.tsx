"use client";

import { Popover } from "@base-ui/react/popover";
import { cn } from "@/lib/utils";
import styles from "./popover.module.css";

const createPopoverHandle = Popover.createHandle;

function PopoverRoot({ ...props }: Popover.Root.Props) {
  return <Popover.Root {...props} />;
}

function PopoverTrigger({ className, ...props }: Popover.Trigger.Props) {
  return (
    <Popover.Trigger className={cn(styles.trigger, className)} data-slot="popover-trigger" nativeButton {...props} />
  );
}

const PopoverPortal = Popover.Portal;

function PopoverBackdrop({ className, ...props }: Popover.Backdrop.Props) {
  return <Popover.Backdrop className={cn(styles.backdrop, className)} data-slot="popover-backdrop" {...props} />;
}

function PopoverPositioner({ className, ...props }: Popover.Positioner.Props) {
  return <Popover.Positioner className={cn(styles.positioner, className)} data-slot="popover-positioner" {...props} />;
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
        className={styles.positioner}
        data-slot="popover-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <Popover.Popup className={cn(styles.popup, className)} data-slot="popover-popup" {...props}>
          {arrow && (
            <Popover.Arrow className={styles.arrow}>
              <ArrowSvg />
            </Popover.Arrow>
          )}
          <Popover.Viewport className={styles.viewport} data-slot="popover-viewport">
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
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        fill="var(--popover)"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        fill="var(--border)"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        fill="var(--popover)"
      />
    </svg>
  );
}

function PopoverArrow({ className, ...props }: Popover.Arrow.Props) {
  return <Popover.Arrow className={cn(styles.arrow, className)} data-slot="popover-arrow" {...props} />;
}

function PopoverTitle({ className, ...props }: Popover.Title.Props) {
  return <Popover.Title className={cn(styles.title, className)} data-slot="popover-title" {...props} />;
}

function PopoverDescription({ className, ...props }: Popover.Description.Props) {
  return (
    <Popover.Description className={cn(styles.description, className)} data-slot="popover-description" {...props} />
  );
}

function PopoverClose({ className, ...props }: Popover.Close.Props) {
  return <Popover.Close className={cn(styles.close, className)} data-slot="popover-close" {...props} />;
}

function PopoverViewport({ className, ...props }: Popover.Viewport.Props) {
  return <Popover.Viewport className={cn(styles.viewport, className)} data-slot="popover-viewport" {...props} />;
}

function PopoverContent({ className, style, ...props }: Popover.Popup.Props) {
  return (
    <PopoverPortal>
      <PopoverPositioner sideOffset={8}>
        <Popover.Popup className={cn(styles.popup, className)} data-slot="popover-popup" style={style} {...props} />
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
