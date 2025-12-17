"use client";

import { Input } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils-tailwind";

const inputVariants = cva(
  [
    "flex h-10 w-full rounded-[var(--radius)] border border-border bg-[var(--mix-card-50-bg)] px-3",
    "text-foreground text-sm transition-all duration-150 ease-out",
    "placeholder:text-muted-foreground placeholder:text-sm",
    "focus:border-ring focus:shadow-[0_0_0_2px_var(--ring)/0.2] focus:outline-none",
    "focus-visible:border-ring focus-visible:shadow-[0_0_0_2px_var(--ring)/0.2] focus-visible:outline-none",
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

interface InputProps extends Input.Props, VariantProps<typeof inputVariants> {}

function InputRoot({ className, variant = "default", ...props }: InputProps) {
  return (
    <Input
      className={(state: Input.State) =>
        cn(inputVariants({ variant }), typeof className === "function" ? className(state) : className)
      }
      {...props}
    />
  );
}

export { InputRoot as Input, type InputProps };
