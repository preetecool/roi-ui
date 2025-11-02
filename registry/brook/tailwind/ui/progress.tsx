"use client";

import { Progress } from "@base-ui-components/react/progress";
import { cn } from "@/lib/utils-tailwind";

function ProgressRoot({ className, ...props }: Progress.Root.Props) {
  return (
    <Progress.Root
      className={cn("flex w-full flex-col gap-2", className)}
      data-slot="progress-root"
      {...props}
    />
  );
}

function ProgressLabel({ className, ...props }: Progress.Label.Props) {
  return (
    <Progress.Label
      className={cn("font-medium text-[var(--foreground)] text-sm", className)}
      data-slot="progress-label"
      {...props}
    />
  );
}

function ProgressTrack({ className, ...props }: Progress.Track.Props) {
  return (
    <Progress.Track
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-none bg-[var(--mix-card-75-bg)]",
        className
      )}
      data-slot="progress-track"
      {...props}
    />
  );
}

function ProgressIndicator({ className, ...props }: Progress.Indicator.Props) {
  return (
    <Progress.Indicator
      className={cn(
        "h-full w-[var(--progress-indicator-width)] rounded-none bg-[var(--primary)] transition-all duration-150 ease-out",
        "[.root[data-indeterminate]_&]:w-[40%] [.root[data-indeterminate]_&]:animate-[indeterminate_2s_infinite_linear]",
        className
      )}
      data-slot="progress-indicator"
      {...props}
    />
  );
}

function ProgressValue({ className, ...props }: Progress.Value.Props) {
  return (
    <Progress.Value
      className={cn(
        "font-medium text-[var(--muted-foreground)] text-xs",
        className
      )}
      data-slot="progress-value"
      {...props}
    />
  );
}

export {
  ProgressRoot as Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
};
