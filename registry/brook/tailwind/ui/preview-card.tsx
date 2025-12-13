"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import { cn } from "@/lib/utils-tailwind";

function PreviewCardRoot({ ...props }: PreviewCard.Root.Props) {
  return <PreviewCard.Root {...props} />;
}

function PreviewCardTrigger({
  className,
  ...props
}: PreviewCard.Trigger.Props) {
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

function PreviewCardBackdrop({
  className,
  ...props
}: PreviewCard.Backdrop.Props) {
  return (
    <PreviewCard.Backdrop
      className={cn("fixed inset-0 z-[140]", className)}
      data-slot="previewcard-backdrop"
      {...props}
    />
  );
}

function PreviewCardPositioner({
  className,
  ...props
}: PreviewCard.Positioner.Props) {
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
        "border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.8)] bg-[var(--popover)]",
        "z-[150] max-w-80 rounded-[var(--radius-lg)] p-4",
        "shadow-[oklch(from_var(--border)_l_c_h_/_0.2)_0px_0.5px_0.5px,oklch(from_var(--border)_l_c_h_/_0.2)_0px_0.5px_0.5px,oklch(from_var(--border)_l_c_h_/_0.2)_0px_0.5px_0.5px]",
        "origin-[var(--transform-origin)]",
        "data-[state=open]:animate-[scaleIn_0.25s_var(--ease-out-expo)]",
        "data-[state=closed]:animate-[scaleOut_0.25s_var(--ease-out-expo)]",
        className
      )}
      data-slot="previewcard-popup"
      {...props}
    >
      {props.children}
      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes scaleOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.9);
          }
        }
      `}</style>
    </PreviewCard.Popup>
  );
}

function PreviewCardArrow({ className, ...props }: PreviewCard.Arrow.Props) {
  return (
    <PreviewCard.Arrow
      className={cn(
        "h-[5px] w-2.5 fill-[var(--popover)] stroke-1 stroke-border",
        className
      )}
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
