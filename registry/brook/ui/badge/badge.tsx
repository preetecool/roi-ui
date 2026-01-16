import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
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
 */
function Badge({
  className,
  variant = "default",
  size = "md",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, size, className })),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
      size,
    },
  });
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

function BadgeIcon({ className, render, ...props }: useRender.ComponentProps<"span">) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(styles.iconContainer, className),
      },
      props
    ),
    render,
    state: {
      slot: "badge-icon",
    },
  });
}

export { Badge, BadgeIcon };
