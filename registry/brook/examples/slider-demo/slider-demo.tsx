"use client";

import { useState } from "react";
import {
  SliderRoot,
  SliderControl,
  SliderTrack,
  SliderIndicator,
  SliderThumb,
} from "@/registry/brook/ui/slider/slider";
import styles from "./slider-demo.module.css";

export default function SliderDemo() {
  const [value, setValue] = useState(50);

  return (
    <div className={styles.container}>
      <div className={styles.valueDisplay}>
        {Math.round(value)}
      </div>
      <SliderRoot 
        defaultValue={50} 
        min={0} 
        max={100} 
        step={1}
        onValueChange={(value) => setValue(Array.isArray(value) ? value[0] : value)}
      >
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
            <SliderThumb />
          </SliderTrack>
        </SliderControl>
      </SliderRoot>
    </div>
  );
}
