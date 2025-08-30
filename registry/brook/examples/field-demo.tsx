import { Field, FieldControl, FieldLabel, FieldDescription } from "@/registry/brook/ui/field/field";

export default function FieldDemo() {
  return (
    <Field style={{ maxWidth: "24rem" }}>
      <FieldLabel>Email</FieldLabel>
      <FieldControl type="email" placeholder="Enter your email" />
      <FieldDescription>We&apos;ll never share your email with anyone else</FieldDescription>
    </Field>
  );
}
