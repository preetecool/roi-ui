"use client";

import { Field } from "@base-ui-components/react/field";
import { cn } from "@/lib/utils-tailwind";

function FieldRoot({ className, ...props }: Field.Root.Props) {
  return (
    <Field.Root
      className={cn("flex w-full flex-col items-start gap-2", className)}
      data-slot="field-root"
      validationMode="onBlur"
      {...props}
    />
  );
}

function FieldControl({ className, ...props }: Field.Control.Props) {
  return (
    <Field.Control
      className={cn(
        "m-0 box-border h-10 w-full rounded-[var(--radius)] border border-border px-3.5",
        "bg-[var(--mix-card-50-bg)] font-[inherit] text-foreground text-sm",
        "placeholder:text-muted-foreground placeholder:text-sm",
        "focus:-outline-offset-1 focus:outline-2 focus:outline-ring",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "data-[invalid]:border-destructive",
        "data-[invalid]:focus:-outline-offset-1 data-[invalid]:focus:outline-2 data-[invalid]:focus:outline-destructive",
        className
      )}
      data-slot="field-control"
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: Field.Label.Props) {
  return (
    <Field.Label
      className={cn(
        "font-normal text-foreground text-sm leading-5",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className
      )}
      data-slot="field-label"
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: Field.Description.Props) {
  return (
    <Field.Description
      className={cn("m-0 text-muted-foreground text-sm leading-5", className)}
      data-slot="field-description"
      {...props}
    />
  );
}

function FieldError({ className, ...props }: Field.Error.Props) {
  return (
    <Field.Error
      className={cn("text-destructive text-sm leading-5", className)}
      data-slot="field-error"
      {...props}
    />
  );
}

export {
  FieldRoot as Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
};
