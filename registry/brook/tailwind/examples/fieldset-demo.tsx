import {
  Field,
  FieldControl,
  FieldLabel,
} from "@/registry/brook/tailwind/ui/field";
import {
  Fieldset,
  FieldsetLegend,
} from "@/registry/brook/tailwind/ui/fieldset";

export default function FieldsetDemo() {
  return (
    <Fieldset className="max-w-80">
      <FieldsetLegend>Shipping Address</FieldsetLegend>

      <Field className="w-full">
        <FieldLabel>Full Name</FieldLabel>
        <FieldControl placeholder="John Doe" />
      </Field>

      <Field className="w-full">
        <FieldLabel>Street Address</FieldLabel>
        <FieldControl placeholder="123 Main Street" />
      </Field>
    </Fieldset>
  );
}
