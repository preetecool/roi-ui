import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
} from "@/registry/brook/ui/number-field/number-field";
import styles from "./number-field-demo.module.css";

export default function NumberFieldDemo() {
  return (
    <NumberField
      className={styles.numberField}
      defaultValue={10}
      max={100}
      min={0}
      step={1}
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
