"use client";

import { OTPFieldPreview as OTPFieldPrimitive } from "@base-ui/react/otp-field";
import { cn } from "@/lib/utils-tailwind";

function OTPFieldRoot({ className, ...props }: OTPFieldPrimitive.Root.Props) {
  return (
    <OTPFieldPrimitive.Root
      className={cn("inline-flex items-center gap-2", className)}
      data-slot="otpfield-root"
      {...props}
    />
  );
}

function OTPFieldInput({ className, ...props }: OTPFieldPrimitive.Input.Props) {
  return (
    <OTPFieldPrimitive.Input
      className={(state: OTPFieldPrimitive.Input.State) =>
        cn(
          "h-10 w-10 rounded-[var(--radius)] border-none bg-[var(--popover)] text-center text-foreground tabular-nums transition-all duration-150 ease-out",
          "shadow-[0_0_0_1px_oklch(from_var(--border)_l_c_h_/_0.5)]",
          "focus:shadow-[0_0_0_1px_var(--ring),0_0_0_3px_oklch(from_var(--ring)_l_c_h_/_0.2)] focus:outline-none",
          "focus-visible:shadow-[0_0_0_1px_var(--ring),0_0_0_3px_oklch(from_var(--ring)_l_c_h_/_0.2)] focus-visible:outline-none",
          "data-[focused]:shadow-[0_0_0_1px_var(--ring),0_0_0_3px_oklch(from_var(--ring)_l_c_h_/_0.2)] data-[focused]:outline-none",
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
          "data-[invalid]:shadow-[0_0_0_1px_var(--destructive)]",
          "data-[invalid]:data-[focused]:shadow-[0_0_0_1px_var(--destructive),0_0_0_3px_oklch(from_var(--destructive)_l_c_h_/_0.2)] data-[invalid]:focus:shadow-[0_0_0_1px_var(--destructive),0_0_0_3px_oklch(from_var(--destructive)_l_c_h_/_0.2)]",
          typeof className === "function" ? className(state) : className,
        )
      }
      data-slot="otpfield-input"
      {...props}
    />
  );
}

function OTPFieldSeparator({ className, ...props }: OTPFieldPrimitive.Separator.Props) {
  return (
    <OTPFieldPrimitive.Separator
      className={cn("h-px w-2 bg-[var(--border)]", className)}
      data-slot="otpfield-separator"
      {...props}
    />
  );
}

export { OTPFieldRoot as OTPField, OTPFieldInput, OTPFieldSeparator };
