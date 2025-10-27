"use client";

import { Progress } from "@base-ui-components/react/progress";
import { cn } from "@/lib/tw-utils";

function ProgressRoot({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Root>) {
  return (
    <Progress.Root
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    />
  );
}

function ProgressLabel({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Label>) {
  return (
    <Progress.Label
      className={cn("font-medium text-[var(--foreground)] text-sm", className)}
      {...props}
    />
  );
}

function ProgressTrack({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Track>) {
  return (
    <Progress.Track
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-none bg-[var(--mix-card-75-bg)]",
        className
      )}
      {...props}
    />
  );
}

function ProgressIndicator({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Indicator>) {
  return (
    <Progress.Indicator
      className={cn(
        "h-full w-[var(--progress-indicator-width)] rounded-none bg-[var(--primary)] transition-all duration-150 ease-out",
        "[.root[data-indeterminate]_&]:w-[40%] [.root[data-indeterminate]_&]:animate-[indeterminate_2s_infinite_linear]",
        className
      )}
      {...props}
    />
  );
}

function ProgressValue({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Value>) {
  return (
    <Progress.Value
      className={cn(
        "font-medium text-[var(--muted-foreground)] text-xs",
        className
      )}
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
