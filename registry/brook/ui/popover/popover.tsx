"use client";

import { Popover } from "@base-ui-components/react/popover";
import { cn } from "@/lib/utils";
import styles from "./popover.module.css";

const PopoverRoot = ({ ...props }: React.ComponentProps<typeof Popover.Root>) => {
  return <Popover.Root {...props} />;
};

const PopoverTrigger = ({ className, ...props }: React.ComponentProps<typeof Popover.Trigger>) => {
  return <Popover.Trigger className={cn(styles.trigger, className)} {...props} />;
};

const PopoverPortal = Popover.Portal;

const PopoverBackdrop = ({ className, ...props }: React.ComponentProps<typeof Popover.Backdrop>) => (
  <Popover.Backdrop className={cn(styles.backdrop, className)} {...props} />
);

const PopoverPositioner = ({ className, ...props }: React.ComponentProps<typeof Popover.Positioner>) => (
  <Popover.Positioner className={cn(styles.positioner, className)} {...props} />
);

const PopoverPopup = ({ className, ...props }: React.ComponentProps<typeof Popover.Popup>) => (
  <Popover.Popup className={cn(styles.popup, className)} {...props} />
);

const PopoverArrow = ({ className, ...props }: React.ComponentProps<typeof Popover.Arrow>) => (
  <Popover.Arrow className={cn(styles.arrow, className)} {...props} />
);

const PopoverTitle = ({ className, ...props }: React.ComponentProps<typeof Popover.Title>) => (
  <Popover.Title className={cn(styles.title, className)} {...props} />
);

const PopoverDescription = ({ className, ...props }: React.ComponentProps<typeof Popover.Description>) => (
  <Popover.Description className={cn(styles.description, className)} {...props} />
);

const PopoverClose = ({ className, ...props }: React.ComponentProps<typeof Popover.Close>) => (
  <Popover.Close className={cn(styles.close, className)} {...props} />
);

const PopoverContent = ({ className, style, ...props }: React.ComponentProps<typeof Popover.Popup>) => (
  <PopoverPortal>
    <PopoverPositioner sideOffset={4}>
      <PopoverPopup className={cn(styles.popup, className)} style={style} {...props} />
    </PopoverPositioner>
  </PopoverPortal>
);

export {
  PopoverRoot as Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverBackdrop,
  PopoverPositioner,
  PopoverPopup,
  PopoverArrow,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
  PopoverContent,
};
