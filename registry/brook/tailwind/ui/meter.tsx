"use client";

import { Meter } from "@base-ui-components/react/meter";
import { cn } from "@/lib/tw-utils";

function MeterRoot({
  className,
  ...props
}: React.ComponentProps<typeof Meter.Root>) {
  return (
    <Meter.Root
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    />
  );
}

function MeterLabel({
  className,
  ...props
}: React.ComponentProps<typeof Meter.Label>) {
  return (
    <Meter.Label
      className={cn("font-medium text-secondary-foreground text-sm", className)}
      {...props}
    />
  );
}

function MeterTrack({
  className,
  ...props
}: React.ComponentProps<typeof Meter.Track>) {
  return (
    <Meter.Track
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
}: React.ComponentProps<typeof Meter.Indicator>) {
  return (
    <Meter.Indicator
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
}: React.ComponentProps<typeof Meter.Value>) {
  return (
    <Meter.Value
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
