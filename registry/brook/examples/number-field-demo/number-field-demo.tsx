import {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
} from "@/registry/brook/ui/number-field/number-field";
import styles from "./number-field-demo.module.css";

export default function NumberFieldDemo() {
  return (
    <NumberField
      defaultValue={10}
      min={0}
      max={100}
      step={1}
      className={styles.numberField}
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