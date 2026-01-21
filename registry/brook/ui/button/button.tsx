"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import styles from "./button.module.css";

const buttonVariants = cva(styles.base, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
      destructive: styles.destructive,
      ghost: styles.ghost,
      outline: styles.outline,
      link: styles.link,
    },
    size: {
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
      icon: styles.icon,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

function Spinner() {
  return (
    <svg className={styles.spinner} fill="none" height="16" viewBox="0 0 24 24" width="16">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeDasharray="31.416"
        strokeDashoffset="31.416"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArrowPointer({ pointLeft = false, pointExternal = false }: { pointLeft?: boolean; pointExternal?: boolean }) {
  return (
    <svg
      className={cn(styles.arrow, pointLeft && styles.arrowLeft, pointExternal && styles.arrowExternal)}
      fill="none"
      viewBox="0 0 14 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          className={styles.arrowPoint}
          d={pointLeft ? "M14.8 1l-4 4 4 4" : "M-0.8 1l4 4-4 4"}
          fill="none"
          stroke="currentColor"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeWidth="2"
        />
        <path
          className={styles.arrowShaft}
          d={pointLeft ? "M14.8 5H9.8" : "M0 5h4.8"}
          fill="none"
          stroke="currentColor"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}

function Button({ className, variant, size, ...props }: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive className={cn(buttonVariants({ variant, size, className }))} data-slot="button" {...props} />;
}

export { Button, buttonVariants, Spinner, ArrowPointer };
