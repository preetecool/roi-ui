"use client";

import {
  SliderControl,
  SliderIndicator,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from "@/registry/brook/ui/slider/slider";
import { useState } from "react";
import styles from "./slider-demo.module.css";

export default function SliderDemo() {
  const [value, setValue] = useState(50);

  return (
    <div className={styles.container}>
      <div className={styles.valueDisplay}>{Math.round(value)}</div>
      <SliderRoot
        defaultValue={50}
        max={100}
        min={0}
        onValueChange={(value) =>
          setValue(Array.isArray(value) ? value[0] : value)
        }
        step={1}
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
