"use client";

import { cn } from "@/lib/utils";
import { Slider } from "@base-ui-components/react/slider";
import styles from "./slider.module.css";

function SliderRoot({
  className,
  ...props
}: React.ComponentProps<typeof Slider.Root>) {
  return <Slider.Root className={cn(styles.root, className)} {...props} />;
}

function SliderControl({
  className,
  ...props
}: React.ComponentProps<typeof Slider.Control>) {
  return (
    <Slider.Control className={cn(styles.control, className)} {...props} />
  );
}

function SliderTrack({
  className,
  ...props
}: React.ComponentProps<typeof Slider.Track>) {
  return <Slider.Track className={cn(styles.track, className)} {...props} />;
}

function SliderIndicator({
  className,
  ...props
}: React.ComponentProps<typeof Slider.Indicator>) {
  return (
    <Slider.Indicator className={cn(styles.indicator, className)} {...props} />
  );
}

function SliderThumb({
  className,
  ...props
}: React.ComponentProps<typeof Slider.Thumb>) {
  return <Slider.Thumb className={cn(styles.thumb, className)} {...props} />;
}

function SliderValue({
  className,
  ...props
}: React.ComponentProps<typeof Slider.Value>) {
  return <Slider.Value className={cn(styles.value, className)} {...props} />;
}

export {
  SliderControl,
  SliderIndicator,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  SliderValue,
};
