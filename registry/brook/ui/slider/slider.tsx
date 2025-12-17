"use client";

import { Slider } from "@base-ui/react/slider";
import { cn } from "@/lib/utils";
import styles from "./slider.module.css";

function SliderRoot({ className, ...props }: Slider.Root.Props) {
  return <Slider.Root className={cn(styles.root, className)} {...props} />;
}

function SliderControl({ className, ...props }: Slider.Control.Props) {
  return <Slider.Control className={cn(styles.control, className)} data-slot="slider-control" {...props} />;
}

function SliderTrack({ className, ...props }: Slider.Track.Props) {
  return <Slider.Track className={cn(styles.track, className)} {...props} />;
}

function SliderIndicator({ className, ...props }: Slider.Indicator.Props) {
  return <Slider.Indicator className={cn(styles.indicator, className)} data-slot="slider-indicator" {...props} />;
}

function SliderThumb({ className, ...props }: Slider.Thumb.Props) {
  return <Slider.Thumb className={cn(styles.thumb, className)} {...props} />;
}

function SliderValue({ className, ...props }: Slider.Value.Props) {
  return <Slider.Value className={cn(styles.value, className)} {...props} />;
}

export { SliderRoot as Slider, SliderControl, SliderIndicator, SliderRoot, SliderThumb, SliderTrack, SliderValue };
