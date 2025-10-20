"use client";

import { cn } from "@/lib/utils";
import { Form } from "@base-ui-components/react/form";
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../field/field";
import styles from "./form.module.css";

function FormRoot({ className, ...props }: React.ComponentProps<typeof Form>) {
  return <Form className={cn(styles.root, className)} {...props} />;
}

function FormGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.formGroup, className)} {...props} />;
}

function FormRow({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.formRow, className)} {...props} />;
}

function FormActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.formActions, className)} {...props} />;
}

export {
  FormRoot as Form,
  FormActions,
  FieldControl as FormControl,
  FieldDescription as FormDescription,
  FieldError as FormError,
  Field as FormField,
  FormGroup,
  FieldLabel as FormLabel,
  FormRow,
};
