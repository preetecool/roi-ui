import { cn } from "@/lib/utils";
import { useRender } from "@base-ui-components/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.spinner}>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="31.416"
        strokeDashoffset="31.416"
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
function ArrowPointer({
  pointLeft = false,
  pointExternal = false,
}: {
  pointLeft?: boolean;
  pointExternal?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(styles.arrow, pointLeft && styles.arrowLeft, pointExternal && styles.arrowExternal)}
    >
      <g fillRule="nonzero">
        <path
          d={pointLeft ? "M7.2 1l-4 4 4 4" : "M-0.8 1l4 4-4 4"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
          className={styles.arrowPoint}
        />
        <path
          d={pointLeft ? "M7.2 5H2.2" : "M0 5h4.8"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
          className={styles.arrowShaft}
        />
      </g>
    </svg>
  );
}

interface ButtonProps extends useRender.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  showArrow?: boolean;
  pointLeft?: boolean;
  pointExternal?: boolean;
  loading?: boolean;
}

function Button({
  render,
  className,
  variant,
  size,
  showArrow = false,
  pointLeft = false,
  pointExternal = false,
  loading = false,
  ...props
}: ButtonProps) {
  const decoratedChildren = (
    <>
      {loading && <Spinner />}
      {!loading && showArrow && pointLeft && <ArrowPointer pointLeft pointExternal={pointExternal} />}
      {props.children}
      {!loading && showArrow && !pointLeft && <ArrowPointer pointExternal={pointExternal} />}
    </>
  );

  return useRender({
    defaultTagName: "button",
    render,
    props: {
      ...props,
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size }), loading && styles.loading, className),
      disabled: props.disabled || loading,
      children: decoratedChildren,
    },
  });
}

Button.displayName = "Button";

export { Button };
