"use client";

import { Field } from "@base-ui-components/react/field";
import { cn } from "@/lib/utils";
import styles from "./field.module.css";

function FieldRoot({ className, ...props }: Field.Root.Props) {
  return (
    <Field.Root
      className={cn(styles.root, className)}
      data-slot="field"
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: Field.Label.Props) {
  return (
    <Field.Label
      className={cn(styles.label, className)}
      data-slot="field-label"
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: Field.Description.Props) {
  return (
    <Field.Description
      className={cn(styles.description, className)}
      data-slot="field-description"
      {...props}
    />
  );
}

function FieldError({ className, ...props }: Field.Error.Props) {
  return (
    <Field.Error
      className={cn(styles.error, className)}
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
