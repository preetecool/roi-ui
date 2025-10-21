import { cva, type VariantProps } from "class-variance-authority";
import { Command } from "lucide-react";
import { cn } from "@/lib/utils";
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
  children,
  ...props
}: React.ComponentProps<"kbd"> & VariantProps<typeof kbdVariants>) {
  const isCommandKey =
    typeof children === "string" &&
    (children === "⌘" || children.toLowerCase() === "ctrl");

  const sizeMap = {
    sm: 11,
    md: 13,
    lg: 15,
  };

  const iconSize = sizeMap[size || "md"];

  return (
    <kbd
      className={cn(
        kbdVariants({ size }),
        isCommandKey && styles.commandKey,
        className
      )}
      data-slot="kbd"
      {...props}
    >
      {isCommandKey ? <Command size={iconSize} strokeWidth={2.5} /> : children}
    </kbd>
  );
}

export { Kbd };
