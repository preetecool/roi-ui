"use client";

import { Progress } from "@base-ui-components/react/progress";
import { cn } from "@/lib/utils";
import styles from "./progress.module.css";

const ProgressRoot = ({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Root>) => (
  <Progress.Root className={cn(styles.root, className)} {...props} />
);

const ProgressLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Label>) => (
  <Progress.Label className={cn(styles.label, className)} {...props} />
);

const ProgressTrack = ({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Track>) => (
  <Progress.Track className={cn(styles.track, className)} {...props} />
);

const ProgressIndicator = ({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Indicator>) => (
  <Progress.Indicator className={cn(styles.indicator, className)} {...props} />
);

const ProgressValue = ({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Value>) => (
  <Progress.Value className={cn(styles.value, className)} {...props} />
);

export {
  ProgressRoot as Progress,
  ProgressLabel,
  ProgressTrack,
  ProgressIndicator,
  ProgressValue,
};