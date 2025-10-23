import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import styles from "./badge.module.css";

const badgeVariants = cva(styles.badge, {
  variants: {
    variant: {
      default: styles.default,
      secondary: styles.secondary,
      destructive: styles.destructive,
      outline: styles.outline,
      success: styles.success,
      info: styles.info,
    },
    size: {
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

/**
 * Badge component for displaying labels, tags, and status indicators.
 *
 * @param variant - The visual style of the badge
 *   - `"default"` - Standard badge appearance
 *   - `"secondary"` - Secondary color scheme
 *   - `"destructive"` - Red color scheme for errors or warnings
 *   - `"outline"` - Outlined badge with transparent background
 *   - `"success"` - Green color scheme for success states
 *   - `"info"` - Blue color scheme for informational states
 * @param size - The size of the badge
 *   - `"sm"` - Small badge
 *   - `"md"` - Medium badge (default)
 *   - `"lg"` - Large badge
 * @param className - Optional CSS class names
 *
 * @example
 * ```tsx
 * // Standard badge
 * <Badge>New</Badge>
 *
 * // Badge with variant and size
 * <Badge variant="success" size="lg">Active</Badge>
 *
 * // Badge with icon
 * <Badge variant="destructive">
 *   <BadgeIcon>
 *     <AlertIcon />
 *   </BadgeIcon>
 *   Error
 * </Badge>
 * ```
 */
function Badge({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      data-slot="badge"
      {...props}
    />
  );
}

/**
 * BadgeIcon component for displaying icons within a Badge.
 *
 * @param className - Optional CSS class names
 *
 * @example
 * ```tsx
 * <Badge>
 *   <BadgeIcon>
 *     <StarIcon />
 *   </BadgeIcon>
 *   Featured
 * </Badge>
 * ```
 */
function BadgeIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(styles.iconContainer, className)}
      data-slot="badge-icon"
      {...props}
    />
  );
}

export { Badge, BadgeIcon };
