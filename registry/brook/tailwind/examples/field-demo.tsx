import { Field, FieldLabel } from "@/registry/brook/tailwind/ui/field";
import { Input } from "@/registry/brook/tailwind/ui/input";

export default function FieldDemo() {
  return (
    <Field className="max-w-96">
      <FieldLabel>Email</FieldLabel>
      <Input placeholder="Enter your email" />
    </Field>
  );
}
