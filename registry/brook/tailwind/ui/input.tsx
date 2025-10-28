"use client";

import { Input } from "@base-ui-components/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/tw-utils";

const inputVariants = cva(
  [
    "flex h-10 w-full rounded-[var(--radius)] border border-border bg-[var(--mix-card-50-bg)] px-3",
    "text-foreground text-sm transition-all duration-150 ease-out",
    "placeholder:text-muted-foreground placeholder:text-sm",
    "data-[focused]:border-ring data-[focused]:shadow-[0_0_0_2px_var(--ring)/0.2] data-[focused]:outline-none",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    "data-[invalid]:border-destructive",
    "data-[invalid]:data-[focused]:border-destructive data-[invalid]:data-[focused]:shadow-[0_0_0_2px_var(--destructive)/0.2] data-[invalid]:focus:border-destructive",
    "data-[valid]:border-[var(--success,var(--primary))]",
  ],
  {
    variants: {
      variant: {
        default: "",
        error: "border-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface InputProps
  extends React.ComponentProps<typeof Input>,
    VariantProps<typeof inputVariants> {}

function InputRoot({ className, variant = "default", ...props }: InputProps) {
  return (
    <Input className={cn(inputVariants({ variant }), className)} {...props} />
  );
}

export { InputRoot as Input };
