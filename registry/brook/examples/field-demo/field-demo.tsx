import { Field, FieldLabel } from "@/registry/brook/ui/field/field";
import { Input } from "@/registry/brook/ui/input/input";
import styles from "./field-demo.module.css";

export default function FieldDemo() {
  return (
    <Field className={styles.field}>
      <FieldLabel>Email</FieldLabel>
      <Input placeholder="Enter your email" />
    </Field>
  );
}
