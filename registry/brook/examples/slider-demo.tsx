"use client";

import { useState } from "react";
import {
  SliderRoot,
  SliderControl,
  SliderTrack,
  SliderIndicator,
  SliderThumb,
} from "@/registry/brook/ui/slider/slider";

export default function SliderDemo() {
  const [value, setValue] = useState(50);

  return (
    <div style={{ padding: "2rem", width: "300px" }}>
      <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "var(--foreground)", marginBottom: "0.5rem", fontFamily: "monospace", minWidth: "3ch" }}>
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
