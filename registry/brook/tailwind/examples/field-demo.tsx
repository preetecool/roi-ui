import {
  Field,
  FieldControl,
  FieldLabel,
} from "@/registry/brook/tailwind/ui/field";
import { Input } from "@/registry/brook/tailwind/ui/input";

export default function FieldDemo() {
  return (
    <Field className="max-w-96">
      <FieldLabel>Email</FieldLabel>
      <FieldControl placeholder="Enter your email" render={<Input />} type="email" />
    </Field>
  );
}
