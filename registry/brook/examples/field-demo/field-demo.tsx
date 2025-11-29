import {
  Field,
  FieldControl,
  FieldLabel,
} from "@/registry/brook/ui/field/field";
import { Input } from "@/registry/brook/ui/input/input";
import styles from "./field-demo.module.css";

export default function FieldDemo() {
  return (
    <Field className={styles.field}>
      <FieldLabel>Email</FieldLabel>
      <FieldControl placeholder="Enter your email" render={<Input />} type="email" />
    </Field>
  );
}
