"use client";

import { PreviewCard } from "@base-ui-components/react/preview-card";
import { cn } from "@/lib/utils";
import styles from "./preview-card.module.css";

const PreviewCardRoot = ({ ...props }: React.ComponentProps<typeof PreviewCard.Root>) => (
  <PreviewCard.Root {...props} />
);

const PreviewCardTrigger = ({ className, ...props }: React.ComponentProps<typeof PreviewCard.Trigger>) => (
  <PreviewCard.Trigger className={cn(styles.trigger, className)} {...props} />
);

const PreviewCardPortal = ({ ...props }: React.ComponentProps<typeof PreviewCard.Portal>) => (
  <PreviewCard.Portal {...props} />
);

const PreviewCardBackdrop = ({ className, ...props }: React.ComponentProps<typeof PreviewCard.Backdrop>) => (
  <PreviewCard.Backdrop className={cn(styles.backdrop, className)} {...props} />
);

const PreviewCardPositioner = ({ className, ...props }: React.ComponentProps<typeof PreviewCard.Positioner>) => (
  <PreviewCard.Positioner className={cn(styles.positioner, className)} {...props} />
);

const PreviewCardPopup = ({ className, ...props }: React.ComponentProps<typeof PreviewCard.Popup>) => (
  <PreviewCard.Popup className={cn(styles.popup, className)} {...props} />
);

const PreviewCardArrow = ({ className, ...props }: React.ComponentProps<typeof PreviewCard.Arrow>) => (
  <PreviewCard.Arrow className={cn(styles.arrow, className)} {...props} />
);

export {
  PreviewCardRoot as PreviewCard,
  PreviewCardTrigger,
  PreviewCardPortal,
  PreviewCardBackdrop,
  PreviewCardPositioner,
  PreviewCardPopup,
  PreviewCardArrow,
};
