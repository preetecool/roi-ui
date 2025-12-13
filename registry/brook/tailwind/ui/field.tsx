"use client";

import { Field } from "@base-ui/react/field";
import { cn } from "@/lib/utils-tailwind";

function FieldRoot({ className, ...props }: Field.Root.Props) {
  return (
    <Field.Root
      className={cn("flex w-full flex-col items-start gap-2", className)}
      data-slot="field"
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: Field.Label.Props) {
  return (
    <Field.Label
      className={cn("inline-flex items-center gap-2 text-sm/4", className)}
      data-slot="field-label"
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: Field.Description.Props) {
  return (
    <Field.Description
      className={cn("text-muted-foreground text-xs", className)}
      data-slot="field-description"
      {...props}
    />
  );
}

function FieldError({ className, ...props }: Field.Error.Props) {
  return (
    <Field.Error
      className={cn("text-destructive text-xs", className)}
      data-slot="field-error"
      {...props}
    />
  );
}

const FieldControl = Field.Control;
const FieldValidity = Field.Validity;

export {
  FieldRoot as Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldValidity,
};
