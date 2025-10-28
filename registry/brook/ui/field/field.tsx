"use client";

import { Field } from "@base-ui-components/react/field";
import { cn } from "@/lib/utils";
import styles from "./field.module.css";

function FieldRoot({
  className,
  ...props
}: Field.Root.Props) {
  return (
    <Field.Root
      className={cn(styles.root, className)}
      validationMode="onBlur"
      {...props}
    />
  );
}

function FieldControl({
  className,
  ...props
}: Field.Control.Props) {
  return <Field.Control className={cn(styles.control, className)} {...props} />;
}

function FieldLabel({
  className,
  ...props
}: Field.Label.Props) {
  return <Field.Label className={cn(styles.label, className)} {...props} />;
}

function FieldDescription({
  className,
  ...props
}: Field.Description.Props) {
  return (
    <Field.Description
      className={cn(styles.description, className)}
      {...props}
    />
  );
}

function FieldError({
  className,
  ...props
}: Field.Error.Props) {
  return <Field.Error className={cn(styles.error, className)} {...props} />;
}

export {
  FieldRoot as Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
};
