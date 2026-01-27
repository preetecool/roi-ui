import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils-tailwind";

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
        default:
          "selection:!bg-[oklch(0_0_0)] selection:!text-foreground [&_*]:selection:!bg-[oklch(0_0_0)] [&_*]:selection:!text-foreground [.light_&]:selection:!bg-white [.light_&]:selection:!text-black [.light_&_*]:selection:!bg-white [.light_&_*]:selection:!text-black [[data-theme='light']_&]:selection:!bg-white [[data-theme='light']_&]:selection:!text-black [[data-theme='light']_&_*]:selection:!bg-white [[data-theme='light']_&_*]:selection:!text-black bg-foreground text-primary-foreground",
        secondary: "border-transparent bg-[var(--secondary)] text-secondary-foreground",
        destructive: [
          "border-transparent bg-[var(--secondary)] text-destructive",
          "focus-visible:shadow-[0_0_0_3px_var(--destructive),inset_0_0_0_1px_var(--destructive)]",
        ],
        success: [
          "border-transparent bg-[var(--secondary)] text-success",
          "focus-visible:shadow-[0_0_0_3px_var(--success),inset_0_0_0_1px_var(--success)]",
        ],
        info: [
          "border-transparent bg-[var(--secondary)] text-info",
          "focus-visible:shadow-[0_0_0_3px_var(--info),inset_0_0_0_1px_var(--info)]",
        ],
        outline: "border-border bg-transparent text-foreground hover:bg-card",
      },
      size: {
        sm: "rounded-[var(--radius)] px-1.5 py-px text-[0.625rem] leading-[15px]",
        md: "rounded-[var(--radius)] px-2 py-0.5 text-xs leading-[14px]",
        lg: "rounded-[var(--radius-lg)] px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

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

function BadgeIcon({ className, render, ...props }: useRender.ComponentProps<"span">) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn("mr-1 inline-flex flex-shrink-0 items-center justify-center rounded-full p-0.5", className),
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
