"use client";

import { Button } from "@base-ui/react/button";
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

/**
 * ArrowPointer component for displaying directional arrows within buttons.
 *
 * @param pointLeft - When true, arrow points left instead of right
 * @param pointExternal - When true, applies external link arrow styling (diagonal orientation)
 *
 * @example
 * ```tsx
 * // Right-pointing arrow (default)
 * <ArrowPointer />
 *
 * // Left-pointing arrow
 * <ArrowPointer pointLeft />
 *
 * // External link arrow
 * <ArrowPointer pointExternal />
 * ```
 */
function ArrowPointer({ pointLeft = false, pointExternal = false }: { pointLeft?: boolean; pointExternal?: boolean }) {
  return (
    <svg
      className={cn(styles.arrow, pointLeft ? styles.arrowLeft : null, pointExternal ? styles.arrowExternal : null)}
      fill="none"
      viewBox="0 0 14 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fillRule="nonzero">
        <path
          className={styles.arrowPoint}
          d={pointLeft ? "M14.8 1l-4 4 4 4" : "M-0.8 1l4 4-4 4"}
          stroke="currentColor"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeWidth="2"
        />
        <path
          className={styles.arrowShaft}
          d={pointLeft ? "M14.8 5H9.8" : "M0 5h4.8"}
          stroke="currentColor"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}

interface ButtonRootProps
  extends Omit<React.ComponentProps<"button">, "className" | "style">,
    VariantProps<typeof buttonVariants> {
  className?: string | ((state: Button.State) => string | undefined);
  style?: React.CSSProperties | ((state: Button.State) => React.CSSProperties | undefined);
  render?: React.ReactElement | ((props: React.HTMLAttributes<HTMLElement>, state: Button.State) => React.ReactElement);
  focusableWhenDisabled?: boolean;
  nativeButton?: boolean;
  showArrow?: boolean;
  pointLeft?: boolean;
  pointExternal?: boolean;
  loading?: boolean;
}

function ButtonRoot({
  className,
  variant,
  size,
  showArrow = false,
  pointLeft = false,
  pointExternal = false,
  loading = false,
  children,
  render,
  nativeButton,
  ...props
}: ButtonRootProps) {
  const decoratedChildren = (
    <>
      {loading ? <Spinner /> : null}
      {!loading && showArrow && pointLeft && <ArrowPointer pointExternal={pointExternal} pointLeft />}
      {children}
      {!loading && showArrow && !pointLeft && <ArrowPointer pointExternal={pointExternal} />}
    </>
  );

  // Auto-detect nativeButton based on render prop if not explicitly set
  const isNativeButton = nativeButton ?? (render ? false : undefined);

  return (
    <Button
      className={cn(buttonVariants({ variant, size }), loading ? styles.loading : null, className)}
      data-slot="button"
      disabled={props.disabled || loading}
      focusableWhenDisabled={loading}
      nativeButton={isNativeButton}
      {...(render !== undefined && { render })}
      {...props}
    >
      {decoratedChildren}
    </Button>
  );
}

export { ButtonRoot as Button, ArrowPointer };
