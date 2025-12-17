"use client";

import { Slider } from "@base-ui/react/slider";
import { cn } from "@/lib/utils-tailwind";

function SliderRoot({ className, ...props }: Slider.Root.Props) {
  return (
    <Slider.Root
      className={cn(
        "relative flex w-full touch-none select-none items-center justify-center",
        "data-[orientation=vertical]:h-[200px] data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      data-slot="slider-root"
      {...props}
    />
  );
}

function SliderControl({ className, ...props }: Slider.Control.Props) {
  return (
    <Slider.Control
      className={cn(
        "box-border flex w-full touch-none select-none items-center py-3",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:px-3 data-[orientation=vertical]:py-0",
        className
      )}
      data-slot="slider-control"
      {...props}
    />
  );
}

function SliderTrack({ className, ...props }: Slider.Track.Props) {
  return (
    <Slider.Track
      className={cn(
        "h-1 w-full select-none rounded bg-[var(--mix-card-75-bg)] shadow-[inset_0_0_0_1px_var(--mix-card-75-bg)]",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1",
        "max-sm:h-1.5 max-sm:data-[orientation=vertical]:w-1.5",
        className
      )}
      data-slot="slider-track"
      {...props}
    />
  );
}

function SliderIndicator({ className, ...props }: Slider.Indicator.Props) {
  return (
    <Slider.Indicator
      className={cn("select-none rounded bg-[var(--primary)] transition-none", className)}
      data-slot="slider-indicator"
      {...props}
    />
  );
}

function SliderThumb({ className, ...props }: Slider.Thumb.Props) {
  return (
    <Slider.Thumb
      className={cn(
        "h-4 w-4 select-none rounded-full bg-[var(--foreground)] outline outline-1 outline-[var(--border)] transition-none",
        "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[var(--ring)]",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "max-sm:h-5 max-sm:w-5",
        className
      )}
      data-slot="slider-thumb"
      {...props}
    />
  );
}

function SliderValue({ className, ...props }: Slider.Value.Props) {
  return (
    <Slider.Value
      className={cn("mr-2 block font-medium text-[var(--foreground)] text-sm", className)}
      data-slot="slider-value"
      {...props}
    />
  );
}

export { SliderRoot as Slider, SliderControl, SliderIndicator, SliderRoot, SliderThumb, SliderTrack, SliderValue };
