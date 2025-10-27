"use client";

import { Form } from "@base-ui-components/react/form";
import type React from "react";
import { cn } from "@/lib/tw-utils";

function FormRoot({ className, ...props }: React.ComponentProps<typeof Form>) {
  return <Form className={cn("mt-4 w-full", className)} {...props} />;
}

function FormGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />;
}

function FormRow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 max-sm:flex-col max-sm:items-stretch",
        className
      )}
      {...props}
    />
  );
}

function FormActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mt-6 flex justify-end gap-3",
        "max-sm:flex-col max-sm:justify-stretch",
        className
      )}
      {...props}
    />
  );
}

export { FormRoot as Form, FormActions, FormGroup, FormRow };
