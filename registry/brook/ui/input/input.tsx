"use client";

import { Input } from "@base-ui/react/input";
import { cn } from "@/lib/utils";
import styles from "./input.module.css";

interface InputProps extends Input.Props {
  variant?: "default" | "error";
}

function InputRoot({ className, variant = "default", ...props }: InputProps) {
  return (
    <Input
      className={(state: Input.State) =>
        cn(
          styles.base,
          styles[variant],
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  );
}

export { InputRoot as Input };
