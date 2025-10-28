"use client";

import { PreviewCard } from "@base-ui-components/react/preview-card";
import { cn } from "@/lib/utils";
import styles from "./preview-card.module.css";

function PreviewCardRoot({
  ...props
}: PreviewCard.Root.Props) {
  return <PreviewCard.Root {...props} />;
}

function PreviewCardTrigger({
  className,
  ...props
}: PreviewCard.Trigger.Props) {
  return (
    <PreviewCard.Trigger data-slot="previewcard-trigger" className={cn(styles.trigger, className)} {...props} />
  );
}

function PreviewCardPortal({
  ...props
}: PreviewCard.Portal.Props) {
  return <PreviewCard.Portal {...props} />;
}

function PreviewCardBackdrop({
  className,
  ...props
}: PreviewCard.Backdrop.Props) {
  return (
    <PreviewCard.Backdrop
      data-slot="previewcard-backdrop"
      className={cn(styles.backdrop, className)}
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
      data-slot="previewcard-positioner"
      className={cn(styles.positioner, className)}
      {...props}
    />
  );
}

function PreviewCardPopup({
  className,
  ...props
}: PreviewCard.Popup.Props) {
  return (
    <PreviewCard.Popup data-slot="previewcard-popup" className={cn(styles.popup, className)} {...props} />
  );
}

function PreviewCardArrow({
  className,
  ...props
}: PreviewCard.Arrow.Props) {
  return (
    <PreviewCard.Arrow data-slot="previewcard-arrow" className={cn(styles.arrow, className)} {...props} />
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
