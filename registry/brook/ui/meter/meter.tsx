"use client";

import { Meter } from "@base-ui-components/react/meter";
import { cn } from "@/lib/utils";
import styles from "./meter.module.css";

const MeterRoot = ({
  className,
  ...props
}: React.ComponentProps<typeof Meter.Root>) => (
  <Meter.Root className={cn(styles.root, className)} {...props} />
);

const MeterLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof Meter.Label>) => (
  <Meter.Label className={cn(styles.label, className)} {...props} />
);

const MeterTrack = ({
  className,
  ...props
}: React.ComponentProps<typeof Meter.Track>) => (
  <Meter.Track className={cn(styles.track, className)} {...props} />
);

const MeterIndicator = ({
  className,
  ...props
}: React.ComponentProps<typeof Meter.Indicator>) => (
  <Meter.Indicator className={cn(styles.indicator, className)} {...props} />
);

const MeterValue = ({
  className,
  ...props
}: React.ComponentProps<typeof Meter.Value>) => (
  <Meter.Value className={cn(styles.value, className)} {...props} />
);

export {
  MeterRoot as Meter,
  MeterLabel,
  MeterTrack,
  MeterIndicator,
  MeterValue,
};