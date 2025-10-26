import { useRender } from "@base-ui-components/react/use-render";
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
    // biome-ignore lint/a11y/noSvgWithoutTitle: Spinner is decorative loading indicator
    <svg
      className={styles.spinner}
      fill="none"
      height="16"
      viewBox="0 0 24 24"
      width="16"
    >
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
function ArrowPointer({
  pointLeft = false,
  pointExternal = false,
}: {
  pointLeft?: boolean;
  pointExternal?: boolean;
}) {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: Arrow is decorative button icon
    <svg
      className={cn(
        styles.arrow,
        pointLeft && styles.arrowLeft,
        pointExternal && styles.arrowExternal
      )}
      fill="none"
      viewBox="0 0 14 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fillRule="nonzero">
        <path
          className={styles.arrowPoint}
          d={pointLeft ? "M7.2 1l-4 4 4 4" : "M-0.8 1l4 4-4 4"}
          stroke="currentColor"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeWidth="2"
        />
        <path
          className={styles.arrowShaft}
          d={pointLeft ? "M7.2 5H2.2" : "M0 5h4.8"}
          stroke="currentColor"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}

interface ButtonProps
  extends useRender.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
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
      {!loading && showArrow && pointLeft && (
        <ArrowPointer pointExternal={pointExternal} pointLeft />
      )}
      {props.children}
      {!loading && showArrow && !pointLeft && (
        <ArrowPointer pointExternal={pointExternal} />
      )}
    </>
  );

  return useRender({
    defaultTagName: "button",
    render,
    props: {
      ...props,
      "data-slot": "button",
      className: cn(
        buttonVariants({ variant, size }),
        loading && styles.loading,
        className
      ),
      disabled: props.disabled || loading,
      children: decoratedChildren,
    },
  });
}

Button.displayName = "Button";

export { Button, ArrowPointer };
