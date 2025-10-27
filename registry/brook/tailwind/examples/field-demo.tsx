import {
  Field,
  FieldControl,
  FieldLabel,
} from "@/registry/brook/tailwind/ui/field";

export default function FieldDemo() {
  return (
    <Field className="max-w-96">
      <FieldLabel>Email</FieldLabel>
      <FieldControl placeholder="Enter your email" type="email" />
    </Field>
  );
}
