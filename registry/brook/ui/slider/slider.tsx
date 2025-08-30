"use client";

import { Slider } from "@base-ui-components/react/slider";
import { cn } from "@/lib/utils";
import styles from "./slider.module.css";

const SliderRoot = ({ className, ...props }: React.ComponentProps<typeof Slider.Root>) => {
  return <Slider.Root className={cn(styles.root, className)} {...props} />;
};

const SliderControl = ({ className, ...props }: React.ComponentProps<typeof Slider.Control>) => (
  <Slider.Control className={cn(styles.control, className)} {...props} />
);

const SliderTrack = ({ className, ...props }: React.ComponentProps<typeof Slider.Track>) => (
  <Slider.Track className={cn(styles.track, className)} {...props} />
);

const SliderIndicator = ({ className, ...props }: React.ComponentProps<typeof Slider.Indicator>) => (
  <Slider.Indicator className={cn(styles.indicator, className)} {...props} />
);

const SliderThumb = ({ className, ...props }: React.ComponentProps<typeof Slider.Thumb>) => (
  <Slider.Thumb className={cn(styles.thumb, className)} {...props} />
);

const SliderValue = ({ className, ...props }: React.ComponentProps<typeof Slider.Value>) => (
  <Slider.Value className={cn(styles.value, className)} {...props} />
);

export { SliderRoot, SliderControl, SliderTrack, SliderIndicator, SliderThumb, SliderValue };
