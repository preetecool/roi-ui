"use client";

import { Progress } from "@base-ui-components/react/progress";
import { cn } from "@/lib/utils";
import styles from "./progress.module.css";

function ProgressRoot({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Root>) {
  return <Progress.Root className={cn(styles.root, className)} {...props} />;
}

function ProgressLabel({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Label>) {
  return <Progress.Label className={cn(styles.label, className)} {...props} />;
}

function ProgressTrack({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Track>) {
  return <Progress.Track className={cn(styles.track, className)} {...props} />;
}

function ProgressIndicator({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Indicator>) {
  return (
    <Progress.Indicator
      className={cn(styles.indicator, className)}
      {...props}
    />
  );
}

function ProgressValue({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Value>) {
  return <Progress.Value className={cn(styles.value, className)} {...props} />;
}

export {
  ProgressRoot as Progress,
  ProgressLabel,
  ProgressTrack,
  ProgressIndicator,
  ProgressValue,
};
