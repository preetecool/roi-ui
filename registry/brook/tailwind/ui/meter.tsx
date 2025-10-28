"use client";

import { Meter } from "@base-ui-components/react/meter";
import { cn } from "@/lib/tw-utils";

function MeterRoot({
  className,
  ...props
}: Meter.Root.Props) {
  return (
    <Meter.Root
      data-slot="meter-root"
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    />
  );
}

function MeterLabel({
  className,
  ...props
}: Meter.Label.Props) {
  return (
    <Meter.Label
      data-slot="meter-label"
      className={cn("font-medium text-secondary-foreground text-sm", className)}
      {...props}
    />
  );
}

function MeterTrack({
  className,
  ...props
}: Meter.Track.Props) {
  return (
    <Meter.Track
      data-slot="meter-track"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-none bg-[var(--mix-card-75-bg)]",
        className
      )}
      {...props}
    />
  );
}

function MeterIndicator({
  className,
  ...props
}: Meter.Indicator.Props) {
  return (
    <Meter.Indicator
      data-slot="meter-indicator"
      className={cn(
        "h-full rounded-none bg-[oklch(from_var(--foreground)_l_c_h_/_0.5)]",
        "transition-all duration-150 ease-out",
        "w-[var(--meter-indicator-width)]",
        "[.root[data-value=high]_&]:bg-destructive",
        "[.root[data-value=medium]_&]:bg-[hsl(45_93%_47%)]",
        "[.root[data-value=low]_&]:bg-primary",
        className
      )}
      {...props}
    />
  );
}

function MeterValue({
  className,
  ...props
}: Meter.Value.Props) {
  return (
    <Meter.Value
      data-slot="meter-value"
      className={cn("font-medium text-muted-foreground text-xs", className)}
      {...props}
    />
  );
}

export {
  MeterRoot as Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
};
