import {
  Field,
  FieldControl,
  FieldLabel,
} from "@/registry/brook/ui/field/field";
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

      <Field className={styles.field}>
        <FieldLabel>Full Name</FieldLabel>
        <FieldControl placeholder="John Doe" render={<Input />} />
      </Field>

      <Field className={styles.field}>
        <FieldLabel>Street Address</FieldLabel>
        <FieldControl placeholder="123 Main Street" render={<Input />} />
      </Field>
    </Fieldset>
  );
}
