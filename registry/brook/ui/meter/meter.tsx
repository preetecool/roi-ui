"use client";

import { Meter } from "@base-ui-components/react/meter";
import { cn } from "@/lib/utils";
import styles from "./meter.module.css";

function MeterRoot({
  className,
  ...props
}: Meter.Root.Props) {
  return <Meter.Root className={cn(styles.root, className)} {...props} />;
}

function MeterLabel({
  className,
  ...props
}: Meter.Label.Props) {
  return <Meter.Label className={cn(styles.label, className)} {...props} />;
}

function MeterTrack({
  className,
  ...props
}: Meter.Track.Props) {
  return <Meter.Track className={cn(styles.track, className)} {...props} />;
}

function MeterIndicator({
  className,
  ...props
}: Meter.Indicator.Props) {
  return (
    <Meter.Indicator data-slot="meter-indicator" className={cn(styles.indicator, className)} {...props} />
  );
}

function MeterValue({
  className,
  ...props
}: Meter.Value.Props) {
  return <Meter.Value className={cn(styles.value, className)} {...props} />;
}

export {
  MeterRoot as Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
};
