"use client";

import { Field } from "@base-ui-components/react/field";
import { cn } from "@/lib/utils";
import styles from "./field.module.css";

const FieldRoot = ({ className, ...props }: React.ComponentProps<typeof Field.Root>) => (
  <Field.Root className={cn(styles.root, className)} validationMode="onBlur" {...props} />
);

const FieldControl = ({ className, ...props }: React.ComponentProps<typeof Field.Control>) => (
  <Field.Control className={cn(styles.control, className)} {...props} />
);

const FieldLabel = ({ className, ...props }: React.ComponentProps<typeof Field.Label>) => (
  <Field.Label className={cn(styles.label, className)} {...props} />
);

const FieldDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof Field.Description>) => (
  <Field.Description className={cn(styles.description, className)} {...props} />
);

const FieldError = ({ className, ...props }: React.ComponentProps<typeof Field.Error>) => (
  <Field.Error className={cn(styles.error, className)} {...props} />
);

export { FieldRoot as Field, FieldControl, FieldLabel, FieldDescription, FieldError };
