"use client";

import { Meter } from "@base-ui-components/react/meter";
import { cn } from "@/lib/utils";
import styles from "./meter.module.css";

function MeterRoot({
  className,
  ...props
}: React.ComponentProps<typeof Meter.Root>) {
  return <Meter.Root className={cn(styles.root, className)} {...props} />;
}

function MeterLabel({
  className,
  ...props
}: React.ComponentProps<typeof Meter.Label>) {
  return <Meter.Label className={cn(styles.label, className)} {...props} />;
}

function MeterTrack({
  className,
  ...props
}: React.ComponentProps<typeof Meter.Track>) {
  return <Meter.Track className={cn(styles.track, className)} {...props} />;
}

function MeterIndicator({
  className,
  ...props
}: React.ComponentProps<typeof Meter.Indicator>) {
  return (
    <Meter.Indicator className={cn(styles.indicator, className)} {...props} />
  );
}

function MeterValue({
  className,
  ...props
}: React.ComponentProps<typeof Meter.Value>) {
  return <Meter.Value className={cn(styles.value, className)} {...props} />;
}

export {
  MeterRoot as Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
};
