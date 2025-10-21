"use client";

import { Field } from "@base-ui-components/react/field";
import { cn } from "@/lib/utils";
import styles from "./field.module.css";

function FieldRoot({
  className,
  ...props
}: React.ComponentProps<typeof Field.Root>) {
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
}: React.ComponentProps<typeof Field.Control>) {
  return <Field.Control className={cn(styles.control, className)} {...props} />;
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Field.Label>) {
  return <Field.Label className={cn(styles.label, className)} {...props} />;
}

function FieldDescription({
  className,
  ...props
}: React.ComponentProps<typeof Field.Description>) {
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
}: React.ComponentProps<typeof Field.Error>) {
  return <Field.Error className={cn(styles.error, className)} {...props} />;
}

export {
  FieldRoot as Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
};
