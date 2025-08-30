import {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
} from "@/registry/brook/ui/number-field/number-field";

export default function NumberFieldDemo() {
  return (
    <NumberField
      defaultValue={10}
      min={0}
      max={100}
      step={1}
      style={{ maxWidth: "12rem" }}
    >
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