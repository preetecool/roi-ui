"use client";

import { useState } from "react";
import { Slider, SliderControl, SliderIndicator, SliderThumb, SliderTrack } from "@/registry/brook/ui/slider/slider";
import styles from "./slider-demo.module.css";

const DEFAULT_SLIDER_VALUE = 50;

export default function SliderDemo() {
  const [value, setValue] = useState(DEFAULT_SLIDER_VALUE);

  return (
    <div className={styles.container}>
      <div className={styles.valueDisplay}>{Math.round(value)}</div>
      <Slider
        defaultValue={DEFAULT_SLIDER_VALUE}
        max={100}
        min={0}
        onValueChange={(newValue) => setValue(Array.isArray(newValue) ? newValue[0] : newValue)}
        step={1}
      >
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
            <SliderThumb />
          </SliderTrack>
        </SliderControl>
      </Slider>
    </div>
  );
}
