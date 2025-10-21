"use client";

import { PreviewCard } from "@base-ui-components/react/preview-card";
import { cn } from "@/lib/utils";
import styles from "./preview-card.module.css";

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
    <PreviewCard.Trigger className={cn(styles.trigger, className)} {...props} />
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
      className={cn(styles.backdrop, className)}
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
      className={cn(styles.positioner, className)}
      {...props}
    />
  );
}

function PreviewCardPopup({
  className,
  ...props
}: React.ComponentProps<typeof PreviewCard.Popup>) {
  return (
    <PreviewCard.Popup className={cn(styles.popup, className)} {...props} />
  );
}

function PreviewCardArrow({
  className,
  ...props
}: React.ComponentProps<typeof PreviewCard.Arrow>) {
  return (
    <PreviewCard.Arrow className={cn(styles.arrow, className)} {...props} />
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
