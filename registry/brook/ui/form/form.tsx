"use client";

import { Form } from "@base-ui-components/react/form";
import { cn } from "@/lib/utils";
import styles from "./form.module.css";
import { Field, FieldControl, FieldLabel, FieldDescription, FieldError } from "../field/field";

const FormRoot = ({ className, ...props }: React.ComponentProps<typeof Form>) => (
  <Form className={cn(styles.root, className)} {...props} />
);

const FormGroup = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn(styles.formGroup, className)} {...props} />
);

const FormRow = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn(styles.formRow, className)} {...props} />
);

const FormActions = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn(styles.formActions, className)} {...props} />
);

export {
  FormRoot as Form,
  Field as FormField,
  FieldControl as FormControl,
  FieldLabel as FormLabel,
  FieldDescription as FormDescription,
  FieldError as FormError,
  FormGroup,
  FormRow,
  FormActions,
};
