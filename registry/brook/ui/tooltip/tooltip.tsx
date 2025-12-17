"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import { cn } from "@/lib/utils";
import styles from "./tooltip.module.css";

function TooltipProvider({ ...props }: Tooltip.Provider.Props) {
  return <Tooltip.Provider {...props} />;
}

function TooltipRoot({ ...props }: Tooltip.Root.Props) {
  return <Tooltip.Root {...props} />;
}

function TooltipTrigger({ ...props }: Tooltip.Trigger.Props) {
  return <Tooltip.Trigger {...props} />;
}

const TooltipPortal = Tooltip.Portal;

function TooltipPositioner({ className, ...props }: Tooltip.Positioner.Props) {
  return <Tooltip.Positioner className={cn(styles.positioner, className)} data-slot="tooltip-positioner" {...props} />;
}

function TooltipPopup({ className, ...props }: Tooltip.Popup.Props) {
  return <Tooltip.Popup className={cn(styles.popup, className)} {...props} />;
}

function TooltipArrow({ className, ...props }: Tooltip.Arrow.Props) {
  return (
    <Tooltip.Arrow className={cn(styles.arrow, className)} {...props}>
      <ArrowSvg />
    </Tooltip.Arrow>
  );
}

function ArrowSvg(props: React.ComponentProps<"svg">) {
  return (
    <svg aria-hidden="true" fill="none" height="10" viewBox="0 0 20 10" width="20" {...props}>
      <path
        className={styles.arrowFill}
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
      />
      <path
        className={styles.arrowOuterStroke}
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
      />
      <path
        className={styles.arrowInnerStroke}
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
      />
    </svg>
  );
}

export {
  ArrowSvg,
  TooltipRoot as Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
};
