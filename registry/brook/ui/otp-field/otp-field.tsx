"use client";

import { OTPFieldPreview as OTPFieldPrimitive } from "@base-ui/react/otp-field";
import { cn } from "@/lib/utils";
import styles from "./otp-field.module.css";

function OTPFieldRoot({ className, ...props }: OTPFieldPrimitive.Root.Props) {
  return <OTPFieldPrimitive.Root className={cn(styles.root, className)} data-slot="otpfield-root" {...props} />;
}

function OTPFieldInput({ className, ...props }: OTPFieldPrimitive.Input.Props) {
  return (
    <OTPFieldPrimitive.Input
      className={(state: OTPFieldPrimitive.Input.State) =>
        cn(styles.input, typeof className === "function" ? className(state) : className)
      }
      data-slot="otpfield-input"
      {...props}
    />
  );
}

function OTPFieldSeparator({ className, ...props }: OTPFieldPrimitive.Separator.Props) {
  return (
    <OTPFieldPrimitive.Separator
      className={cn(styles.separator, className)}
      data-slot="otpfield-separator"
      {...props}
    />
  );
}

export { OTPFieldRoot as OTPField, OTPFieldInput, OTPFieldSeparator };
