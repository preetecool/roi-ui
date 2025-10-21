"use client";

import { Input } from "@base-ui-components/react/input";
import { cn } from "@/lib/utils";
import styles from "./input.module.css";

interface InputProps extends React.ComponentProps<typeof Input> {
  variant?: "default" | "error";
}

function InputRoot({ className, variant = "default", ...props }: InputProps) {
  return (
    <Input className={cn(styles.base, styles[variant], className)} {...props} />
  );
}

export { InputRoot as Input };
