"use client";

import { Meter } from "@base-ui/react/meter";
import { cn } from "@/lib/utils-tailwind";

function MeterRoot({ className, ...props }: Meter.Root.Props) {
  return <Meter.Root className={cn("flex w-full flex-col gap-2", className)} data-slot="meter-root" {...props} />;
}

function MeterLabel({ className, ...props }: Meter.Label.Props) {
  return (
    <Meter.Label
      className={cn("font-medium text-secondary-foreground text-sm leading-[1.4]", className)}
      data-slot="meter-label"
      {...props}
    />
  );
}

function MeterTrack({ className, ...props }: Meter.Track.Props) {
  return (
    <Meter.Track
      className={cn("relative h-2 w-full overflow-hidden rounded-none bg-[var(--mix-card-75-bg)]", className)}
      data-slot="meter-track"
      {...props}
    />
  );
}

function MeterIndicator({ className, ...props }: Meter.Indicator.Props) {
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
      data-slot="meter-indicator"
      {...props}
    />
  );
}

function MeterValue({ className, ...props }: Meter.Value.Props) {
  return (
    <Meter.Value
      className={cn("font-medium text-muted-foreground text-xs leading-[1.4]", className)}
      data-slot="meter-value"
      {...props}
    />
  );
}

export { MeterRoot as Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue };
