"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import { cn } from "@/lib/utils";
import styles from "./preview-card.module.css";

function PreviewCardRoot({ ...props }: PreviewCard.Root.Props) {
  return <PreviewCard.Root {...props} />;
}

function PreviewCardTrigger({
  className,
  ...props
}: PreviewCard.Trigger.Props) {
  return (
    <PreviewCard.Trigger
      className={cn(styles.trigger, className)}
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
      className={cn(styles.backdrop, className)}
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
      className={cn(styles.positioner, className)}
      data-slot="previewcard-positioner"
      {...props}
    />
  );
}

function PreviewCardPopup({ className, ...props }: PreviewCard.Popup.Props) {
  return (
    <PreviewCard.Popup
      className={cn(styles.popup, className)}
      data-slot="previewcard-popup"
      {...props}
    />
  );
}

function PreviewCardArrow({ className, ...props }: PreviewCard.Arrow.Props) {
  return (
    <PreviewCard.Arrow
      className={cn(styles.arrow, className)}
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
