"use client";

import { Input } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils-tailwind";

const inputVariants = cva(
  [
    "flex h-10 w-full rounded-[var(--radius)] border-none bg-[var(--popover)] px-3",
    "text-foreground text-sm transition-all duration-150 ease-out",
    "shadow-[0_0_0_1px_oklch(from_var(--border)_l_c_h_/_0.5)]",
    "placeholder:text-muted-foreground placeholder:text-sm",
    "focus:shadow-[0_0_0_1px_var(--ring),0_0_0_3px_oklch(from_var(--ring)_l_c_h_/_0.2)] focus:outline-none",
    "focus-visible:shadow-[0_0_0_1px_var(--ring),0_0_0_3px_oklch(from_var(--ring)_l_c_h_/_0.2)] focus-visible:outline-none",
    "data-[focused]:shadow-[0_0_0_1px_var(--ring),0_0_0_3px_oklch(from_var(--ring)_l_c_h_/_0.2)] data-[focused]:outline-none",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    "data-[invalid]:shadow-[0_0_0_1px_var(--destructive)]",
    "data-[invalid]:data-[focused]:shadow-[0_0_0_1px_var(--destructive),0_0_0_3px_oklch(from_var(--destructive)_l_c_h_/_0.2)] data-[invalid]:focus:shadow-[0_0_0_1px_var(--destructive),0_0_0_3px_oklch(from_var(--destructive)_l_c_h_/_0.2)]",
  ],
  {
    variants: {
      variant: {
        default: "",
        error: "shadow-[0_0_0_1px_var(--destructive)]",
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
