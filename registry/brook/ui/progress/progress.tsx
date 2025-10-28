"use client";

import { Progress } from "@base-ui-components/react/progress";
import { cn } from "@/lib/utils";
import styles from "./progress.module.css";

function ProgressRoot({
  className,
  ...props
}: Progress.Root.Props) {
  return <Progress.Root className={cn(styles.root, className)} {...props} />;
}

function ProgressLabel({
  className,
  ...props
}: Progress.Label.Props) {
  return <Progress.Label className={cn(styles.label, className)} {...props} />;
}

function ProgressTrack({
  className,
  ...props
}: Progress.Track.Props) {
  return <Progress.Track className={cn(styles.track, className)} {...props} />;
}

function ProgressIndicator({
  className,
  ...props
}: Progress.Indicator.Props) {
  return (
    <Progress.Indicator
      data-slot="progress-indicator"
      className={cn(styles.indicator, className)}
      {...props}
    />
  );
}

function ProgressValue({
  className,
  ...props
}: Progress.Value.Props) {
  return <Progress.Value className={cn(styles.value, className)} {...props} />;
}

export {
  ProgressRoot as Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
};
