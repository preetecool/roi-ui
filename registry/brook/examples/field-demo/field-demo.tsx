import { Field, FieldControl, FieldLabel, FieldDescription } from "@/registry/brook/ui/field/field";
import styles from "./field-demo.module.css";

export default function FieldDemo() {
  return (
    <Field className={styles.field}>
      <FieldLabel>Email</FieldLabel>
      <FieldControl type="email" placeholder="Enter your email" />
      <FieldDescription>We&apos;ll never share your email with anyone else</FieldDescription>
    </Field>
  );
}
