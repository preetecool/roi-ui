import {
  Field,
  FieldControl,
  FieldLabel,
} from "@/registry/brook/tailwind/ui/field";
import {
  Fieldset,
  FieldsetLegend,
} from "@/registry/brook/tailwind/ui/fieldset";
import { Input } from "@/registry/brook/tailwind/ui/input";

export default function FieldsetDemo() {
  return (
    <Fieldset className="max-w-80">
      <FieldsetLegend>Shipping Address</FieldsetLegend>

      <Field className="w-full">
        <FieldLabel>Full Name</FieldLabel>
        <FieldControl placeholder="John Doe" render={<Input />} />
      </Field>

      <Field className="w-full">
        <FieldLabel>Street Address</FieldLabel>
        <FieldControl placeholder="123 Main Street" render={<Input />} />
      </Field>
    </Fieldset>
  );
}
