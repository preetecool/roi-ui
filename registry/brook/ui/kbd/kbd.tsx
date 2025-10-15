import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import styles from "./kbd.module.css";

const kbdVariants = cva(styles.kbd, {
  variants: {
    size: {
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * Kbd component for displaying keyboard shortcuts
 *
 * @example
 * ```tsx
 * <Kbd>⌘</Kbd>
 * <Kbd>K</Kbd>
 * ```
 *
 * @example
 * ```tsx
 * <Kbd size="sm">Ctrl</Kbd>
 * <Kbd size="lg">Enter</Kbd>
 * ```
 */
function Kbd({
  className,
  size,
  ...props
}: React.ComponentProps<"kbd"> & VariantProps<typeof kbdVariants>) {
  return <kbd data-slot="kbd" className={cn(kbdVariants({ size }), className)} {...props} />;
}

export { Kbd };
