import { cva, type VariantProps } from "class-variance-authority";
import { Command } from "lucide-react";
import { cn } from "@/lib/utils-tailwind";

const kbdVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap font-[550] font-mono leading-none",
    "border-none rounded-[2px]",
    "bg-[var(--card)] text-[var(--foreground)]",
    "[box-shadow:inset_0_0_0_1px_rgba(0,0,0,0.06),0_2px_0_0_var(--muted)]",
    "transition-all duration-150 ease-[ease]",
    "focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2",
  ],
  {
    variants: {
      size: {
        sm: "h-5 min-w-5 px-1 text-[0.625rem]",
        md: "h-6 min-w-6 px-1.5 text-xs",
        lg: "h-8 min-w-8 px-2 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

function Kbd({ className, size, children, ...props }: React.ComponentProps<"kbd"> & VariantProps<typeof kbdVariants>) {
  const isCommandKey = typeof children === "string" && (children === "⌘" || children.toLowerCase() === "ctrl");

  const sizeMap = {
    sm: 11,
    md: 13,
    lg: 15,
  };

  const iconSize = sizeMap[size || "md"];

  return (
    <kbd className={cn(kbdVariants({ size }), isCommandKey && "text-[1.15em]", className)} data-slot="kbd" {...props}>
      {isCommandKey ? <Command size={iconSize} strokeWidth={2.5} /> : children}
    </kbd>
  );
}

export { Kbd };
