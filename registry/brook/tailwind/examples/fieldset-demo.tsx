import { Field, FieldLabel } from "@/registry/brook/tailwind/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/brook/tailwind/ui/fieldset";
import { Input } from "@/registry/brook/tailwind/ui/input";

export default function FieldsetDemo() {
  return (
    <Fieldset className="max-w-80">
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
