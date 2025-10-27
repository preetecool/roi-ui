import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/tw-utils";

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center border-[0.5px] border-border/80 font-normal",
    "w-fit flex-shrink-0 gap-1.5 whitespace-nowrap",
    "overflow-hidden transition-[color,box-shadow] duration-150 ease-in-out",
    "[&_svg]:pointer-events-none",
    "focus-visible:border-ring focus-visible:shadow-[0_0_0_3px_var(--ring),inset_0_0_0_1px_var(--ring)]",
    "aria-[invalid=true]:border-destructive aria-[invalid=true]:shadow-[0_0_0_1px_var(--destructive)]",
  ],
  {
    variants: {
      variant: {
        default: "bg-foreground text-primary-foreground",
        secondary:
          "border-transparent bg-[var(--mix-card-66-bg)] text-secondary-foreground",
        destructive: [
          "border-border bg-[var(--mix-card-66-bg)] text-destructive",
          "focus-visible:shadow-[0_0_0_3px_var(--destructive),inset_0_0_0_1px_var(--destructive)]",
        ],
        success: [
          "border-border bg-[var(--mix-card-66-bg)] text-success",
          "focus-visible:shadow-[0_0_0_3px_var(--success),inset_0_0_0_1px_var(--success)]",
        ],
        info: [
          "border-border bg-[var(--mix-card-66-bg)] text-info",
          "focus-visible:shadow-[0_0_0_3px_var(--info),inset_0_0_0_1px_var(--info)]",
        ],
        outline: "border-border bg-transparent text-foreground hover:bg-card",
      },
      size: {
        sm: "rounded-[var(--radius)] px-1.5 py-0.5 text-[0.625rem]",
        md: "rounded-[var(--radius)] px-2 py-0.5 text-xs",
        lg: "rounded-[var(--radius-lg)] px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

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
      className={cn(
        "mr-1 inline-flex flex-shrink-0 items-center justify-center rounded-full p-0.5",
        className
      )}
      data-slot="badge-icon"
      {...props}
    />
  );
}

export { Badge, BadgeIcon };
