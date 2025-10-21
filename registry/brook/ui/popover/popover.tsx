"use client";

import { Popover } from "@base-ui-components/react/popover";
import { cn } from "@/lib/utils";
import styles from "./popover.module.css";

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
      className={cn(styles.trigger, className)}
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
    <Popover.Backdrop className={cn(styles.backdrop, className)} {...props} />
  );
}

function PopoverPositioner({
  className,
  ...props
}: React.ComponentProps<typeof Popover.Positioner>) {
  return (
    <Popover.Positioner
      className={cn(styles.positioner, className)}
      {...props}
    />
  );
}

function PopoverPopup({
  className,
  ...props
}: React.ComponentProps<typeof Popover.Popup>) {
  return <Popover.Popup className={cn(styles.popup, className)} {...props} />;
}

function PopoverArrow({
  className,
  ...props
}: React.ComponentProps<typeof Popover.Arrow>) {
  return <Popover.Arrow className={cn(styles.arrow, className)} {...props} />;
}

function PopoverTitle({
  className,
  ...props
}: React.ComponentProps<typeof Popover.Title>) {
  return <Popover.Title className={cn(styles.title, className)} {...props} />;
}

function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<typeof Popover.Description>) {
  return (
    <Popover.Description
      className={cn(styles.description, className)}
      {...props}
    />
  );
}

function PopoverClose({
  className,
  ...props
}: React.ComponentProps<typeof Popover.Close>) {
  return <Popover.Close className={cn(styles.close, className)} {...props} />;
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
