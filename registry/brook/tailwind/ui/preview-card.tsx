"use client";

import { PreviewCard } from "@base-ui-components/react/preview-card";
import { cn } from "@/lib/tw-utils";

function PreviewCardRoot({
  ...props
}: React.ComponentProps<typeof PreviewCard.Root>) {
  return <PreviewCard.Root {...props} />;
}

function PreviewCardTrigger({
  className,
  ...props
}: React.ComponentProps<typeof PreviewCard.Trigger>) {
  return (
    <PreviewCard.Trigger
      className={cn(
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
        className
      )}
      {...props}
    />
  );
}

function PreviewCardPortal({
  ...props
}: React.ComponentProps<typeof PreviewCard.Portal>) {
  return <PreviewCard.Portal {...props} />;
}

function PreviewCardBackdrop({
  className,
  ...props
}: React.ComponentProps<typeof PreviewCard.Backdrop>) {
  return (
    <PreviewCard.Backdrop
      className={cn("fixed inset-0 z-[140]", className)}
      {...props}
    />
  );
}

function PreviewCardPositioner({
  className,
  ...props
}: React.ComponentProps<typeof PreviewCard.Positioner>) {
  return (
    <PreviewCard.Positioner
      className={cn("absolute z-[150]", className)}
      {...props}
    />
  );
}

function PreviewCardPopup({
  className,
  ...props
}: React.ComponentProps<typeof PreviewCard.Popup>) {
  return (
    <PreviewCard.Popup
      className={cn(
        "border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.8)] bg-[var(--mix-card-33-bg)]",
        "z-[150] max-w-80 rounded-[var(--radius-lg)] p-4 shadow-lg",
        "origin-[var(--transform-origin)]",
        "data-[state=open]:animate-[scaleIn_0.2s_ease-out]",
        "data-[state=closed]:animate-[scaleOut_0.15s_ease-in]",
        className
      )}
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

function PreviewCardArrow({
  className,
  ...props
}: React.ComponentProps<typeof PreviewCard.Arrow>) {
  return (
    <PreviewCard.Arrow
      className={cn(
        "h-[5px] w-2.5 fill-[var(--mix-card-33-bg)] stroke-1 stroke-border",
        className
      )}
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
