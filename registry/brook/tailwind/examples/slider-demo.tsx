"use client";

import { useState } from "react";
import { Slider, SliderControl, SliderIndicator, SliderThumb, SliderTrack } from "@/registry/brook/tailwind/ui/slider";

const DEFAULT_SLIDER_VALUE = 50;

export default function SliderDemo() {
  const [value, setValue] = useState(DEFAULT_SLIDER_VALUE);

  return (
    <div className="w-[300px] p-8 max-[640px]:w-full max-[640px]:p-4">
      <div className="mb-2 min-w-[3ch] font-medium font-mono text-foreground text-sm leading-[1.5] max-[640px]:text-[0.9375rem]">
        {Math.round(value)}
      </div>
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
