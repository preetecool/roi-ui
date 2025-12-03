import { Field, FieldLabel } from "@/registry/brook/ui/field/field";
import {
  Fieldset,
  FieldsetLegend,
} from "@/registry/brook/ui/fieldset/fieldset";
import { Input } from "@/registry/brook/ui/input/input";
import styles from "./fieldset-demo.module.css";

export default function FieldsetDemo() {
  return (
    <Fieldset className={styles.fieldset}>
      <FieldsetLegend>Shipping Address</FieldsetLegend>

      <Field>
        <FieldLabel>Full Name</FieldLabel>
        <Input placeholder="John Doe" />
      </Field>

      <Field>
        <FieldLabel>Street Address</FieldLabel>
        <Input placeholder="123 Main Street" />
      </Field>
    </Fieldset>
  );
}
