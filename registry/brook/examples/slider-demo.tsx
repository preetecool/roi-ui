import {
  SliderRoot,
  SliderControl,
  SliderTrack,
  SliderIndicator,
  SliderThumb,
  SliderValue,
} from "@/registry/brook/ui/slider/slider";

export default function SliderDemo() {
  return (
    <div style={{ padding: "2rem", width: "300px" }}>
      <SliderRoot defaultValue={[50]}>
        <SliderValue />
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
