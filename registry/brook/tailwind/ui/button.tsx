"use client";

import { Button } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils-tailwind";

const buttonVariants = cva(
  [
    "group inline-flex items-center justify-center rounded-[var(--radius)] font-[450]",
    "transition-transform duration-200 ease-[var(--ease-out-quad)] will-change-transform",
    "relative cursor-pointer overflow-hidden border border-transparent",
    "leading-[1.2] tracking-[-0.014em]",
    "",
    "focus-visible:outline-2 focus-visible:outline-[color:var(--color-ring)] focus-visible:outline-offset-2",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70",
    "[&.loading]:cursor-not-allowed [&.loading]:opacity-70",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[color:var(--color-primary)] text-[color:var(--color-primary-foreground)]",
          "shadow-[0_0.5px_0.5px_rgba(0,0,0,0.1)]",
          "hover:not-data-[disabled]:bg-[color:oklch(from_var(--color-primary)_l_c_h_/_0.8)]",
          "active:not-data-[disabled]:scale-[0.97] active:[&.loading]:scale-100",
        ],
        secondary: [
          "bg-[color:var(--color-secondary)] text-[color:var(--color-secondary-foreground)]",
          "hover:not-data-[disabled]:bg-[color:oklch(from_var(--color-secondary)_l_c_h_/_0.8)]",
        ],
        destructive: [
          "bg-[color:var(--color-destructive)] text-[color:var(--color-destructive-foreground)]",
          "hover:not-data-[disabled]:bg-[color:oklch(from_var(--color-destructive)_l_c_h_/_0.85)]",
        ],
        ghost: [
          "bg-transparent text-[color:var(--color-foreground)]",
          "hover:not-data-[disabled]:bg-[color:oklch(from_var(--color-accent)_l_c_h_/_0.6)]",
          "data-[popup-open]:bg-[color:oklch(from_var(--color-accent)_l_c_h_/_0.7)]",
        ],
        outline: [
          "border-[color:oklch(from_var(--color-border)_l_c_h_/_0.7)] bg-[var(--mix-card-50-bg)] text-[color:var(--color-foreground)]",
          "hover:not-data-[disabled]:bg-[var(--mix-card-66-bg)]",
        ],
        link: [
          "bg-transparent p-0 text-[color:var(--color-muted-foreground)] no-underline",
          "transition-[text-decoration] duration-200 ease-out",
          "hover:not-data-[disabled]:text-[color:var(--color-foreground)] hover:not-data-[disabled]:underline",
        ],
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 py-2 text-[0.925rem]",
        lg: "h-12 px-6 py-2 text-base",
        icon: [
          "aspect-square h-auto w-auto p-1.5 text-sm",
          "before:absolute before:top-1/2 before:left-1/2 before:block before:content-['']",
          "before:-translate-x-1/2 before:-translate-y-1/2 before:h-full before:w-full",
          "before:-z-10 before:min-h-[44px] before:min-w-[44px]",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

function Spinner() {
  return (
    <svg className="mr-2 animate-[spin_1s_linear_infinite]" fill="none" height="16" viewBox="0 0 24 24" width="16">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeDasharray="31.416"
        strokeDashoffset="31.416"
        strokeLinecap="round"
        strokeWidth="2"
        style={{
          animation: "spin 1s linear infinite",
        }}
      />
      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
              stroke-dashoffset: 31.416;
            }
            to {
              transform: rotate(360deg);
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
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
  const arrowClasses = cn(
    "-mt-px -mr-2 relative top-0 ml-2 h-3 w-3.5 overflow-visible",
    "transition-all duration-200 ease-[var(--ease-in-out-cubic)]",
    pointLeft && "-ml-2 mr-2",
    pointExternal && "group-hover:-rotate-45 origin-[8%]"
  );

  const pointClasses = "transition-all duration-200 ease-[var(--ease-in-out-cubic)] group-hover:translate-x-0.5";
  const shaftClasses =
    "transition-all duration-200 ease-[var(--ease-in-out-cubic)] opacity-0 group-hover:opacity-100 group-hover:-translate-x-0.5";

  const pointLeftClasses = "group-hover:-translate-x-0.5";
  const shaftLeftClasses = "group-hover:opacity-100 group-hover:translate-x-px";

  return (
    <svg className={arrowClasses} fill="none" viewBox="0 0 14 10" xmlns="http://www.w3.org/2000/svg">
      <g fillRule="nonzero">
        <path
          className={cn(pointClasses, pointLeft ? pointLeftClasses : null)}
          d={pointLeft ? "M7.2 1l-4 4 4 4" : "M-0.8 1l4 4-4 4"}
          stroke="currentColor"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeWidth="2"
        />
        <path
          className={cn(shaftClasses, pointLeft ? shaftLeftClasses : null)}
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

  return (
    <Button
      className={cn(buttonVariants({ variant, size }), loading ? "loading" : null, className)}
      data-slot="button"
      disabled={props.disabled || loading}
      focusableWhenDisabled={loading}
      {...props}
    >
      {decoratedChildren}
    </Button>
  );
}

export { ButtonRoot as Button, ArrowPointer };
