import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
} from "@/registry/brook/tailwind/ui/number-field";

export default function NumberFieldDemo() {
  return (
    <NumberField className="max-w-48" defaultValue={10} max={100} min={0} step={1}>
      <NumberFieldScrubArea>
        <NumberFieldScrubAreaCursor />
      </NumberFieldScrubArea>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput placeholder="Enter a number..." />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  );
}
