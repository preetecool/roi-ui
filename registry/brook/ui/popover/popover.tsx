"use client";

import { Popover } from "@base-ui-components/react/popover";
import { cn } from "@/lib/utils";
import styles from "./popover.module.css";

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
      className={cn(styles.trigger, className)}
      data-slot="popover-trigger"
      render={render}
      {...props}
    />
  );
}

const PopoverPortal = Popover.Portal;

function PopoverBackdrop({ className, ...props }: Popover.Backdrop.Props) {
  return (
    <Popover.Backdrop
      className={cn(styles.backdrop, className)}
      data-slot="popover-backdrop"
      {...props}
    />
  );
}

function PopoverPositioner({ className, ...props }: Popover.Positioner.Props) {
  return (
    <Popover.Positioner
      className={cn(styles.positioner, className)}
      {...props}
    />
  );
}

function PopoverPopup({ className, ...props }: Popover.Popup.Props) {
  return (
    <Popover.Popup
      className={cn(styles.popup, className)}
      data-slot="popover-popup"
      {...props}
    />
  );
}

function PopoverArrow({ className, ...props }: Popover.Arrow.Props) {
  return <Popover.Arrow className={cn(styles.arrow, className)} {...props} />;
}

function PopoverTitle({ className, ...props }: Popover.Title.Props) {
  return <Popover.Title className={cn(styles.title, className)} {...props} />;
}

function PopoverDescription({
  className,
  ...props
}: Popover.Description.Props) {
  return (
    <Popover.Description
      className={cn(styles.description, className)}
      data-slot="popover-description"
      {...props}
    />
  );
}

function PopoverClose({ className, ...props }: Popover.Close.Props) {
  return <Popover.Close className={cn(styles.close, className)} {...props} />;
}

function PopoverContent({ className, style, ...props }: Popover.Popup.Props) {
  return (
    <PopoverPortal>
      <PopoverPositioner sideOffset={8}>
        <PopoverPopup
          className={cn(styles.popup, className)}
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
