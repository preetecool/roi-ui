import { cva, type VariantProps } from "class-variance-authority";
import { Command } from "lucide-react";
import { cn } from "@/lib/tw-utils";

const kbdVariants = cva(
  [
    "inline-flex items-center justify-center font-mono font-[550] leading-none whitespace-nowrap",
    "border border-[var(--mix-foreground-6-trans)] border-b-[3px]",
    "bg-[var(--card)] text-[var(--foreground)]",
    "shadow-[0_0.753698px_0.452219px_-0.583333px_rgba(0,0,0,0.01),0_1.927px_1.1562px_-1.16667px_rgba(0,0,0,0.025),0_3.86321px_2.31793px_-1.75px_rgba(0,0,0,0.02)]",
    "transition-all duration-150 ease-[ease]",
    "focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2",
  ],
  {
    variants: {
      size: {
        sm: "min-w-5 h-5 px-1 text-[0.625rem] rounded-[calc(var(--radius)*0.75)]",
        md: "min-w-6 h-6 px-1.5 text-xs rounded-[var(--radius)]",
        lg: "min-w-8 h-8 px-2 text-sm rounded-[var(--radius-lg)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

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
        isCommandKey && "text-[1.15em]",
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
