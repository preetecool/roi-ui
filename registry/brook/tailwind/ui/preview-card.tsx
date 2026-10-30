"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import { cn } from "@/lib/utils-tailwind";

function PreviewCardRoot({ ...props }: PreviewCard.Root.Props) {
  return <PreviewCard.Root {...props} />;
}

function PreviewCardTrigger({ className, ...props }: PreviewCard.Trigger.Props) {
  return (
    <PreviewCard.Trigger
      className={cn(
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
        className
      )}
      data-slot="previewcard-trigger"
      {...props}
    />
  );
}

function PreviewCardPortal({ ...props }: PreviewCard.Portal.Props) {
  return <PreviewCard.Portal {...props} />;
}

function PreviewCardBackdrop({ className, ...props }: PreviewCard.Backdrop.Props) {
  return (
    <PreviewCard.Backdrop
      className={cn("fixed inset-0 z-[140]", className)}
      data-slot="previewcard-backdrop"
      {...props}
    />
  );
}

function PreviewCardPositioner({ className, ...props }: PreviewCard.Positioner.Props) {
  return (
    <PreviewCard.Positioner
      className={cn("absolute z-[150]", className)}
      data-slot="previewcard-positioner"
      {...props}
    />
  );
}

function PreviewCardPopup({ className, ...props }: PreviewCard.Popup.Props) {
  return (
    <PreviewCard.Popup
      className={cn(
        "bg-[var(--popover)]",
        "z-[150] max-w-80 rounded-[var(--radius-lg)] p-4",
        "shadow-[0_0_0_0.5px_oklch(from_var(--border)_l_c_h_/_0.8),oklch(from_var(--border)_l_c_h_/_0.2)_0px_0.5px_0.5px,oklch(from_var(--border)_l_c_h_/_0.2)_0px_0.5px_0.5px,oklch(from_var(--border)_l_c_h_/_0.2)_0px_0.5px_0.5px]",
        "[transform-origin:var(--transform-origin)]",
        "transition-[scale,opacity] duration-250 ease-[var(--ease-out-expo)] motion-reduce:transition-opacity",
        "data-[ending-style]:scale-90 data-[starting-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
        className
      )}
      data-slot="previewcard-popup"
      {...props}
    />
  );
}

function PreviewCardArrow({ className, ...props }: PreviewCard.Arrow.Props) {
  return (
    <PreviewCard.Arrow
      className={cn("h-[5px] w-2.5 fill-[var(--popover)] stroke-1 stroke-border", className)}
      data-slot="previewcard-arrow"
      {...props}
    />
  );
}

export {
  PreviewCardRoot as PreviewCard,
  PreviewCardArrow,
  PreviewCardBackdrop,
  PreviewCardPopup,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardTrigger,
};
