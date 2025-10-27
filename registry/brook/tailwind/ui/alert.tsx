import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/tw-utils";

const alertVariants = cva(
  [
    "relative w-full rounded-[var(--radius)] border-[0.5px] border-border/80",
    "grid grid-cols-[0_1fr_auto] items-start gap-x-3 gap-y-0.5 px-4 py-3",
    "bg-[var(--mix-card-33-bg)] text-xs leading-tight",
    "shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
    "has-[>svg]:grid-cols-[1rem_1fr_auto]",
    "[&>svg]:h-full [&>svg]:w-4",
    "max-sm:grid-cols-[1rem_1fr] max-sm:gap-x-3 max-sm:gap-y-2 max-sm:px-4",
    "max-sm:has-[>svg]:grid-cols-[1rem_1fr]",
    "max-sm:[&>svg]:h-4 max-sm:[&>svg]:w-4 max-sm:[&>svg]:self-start",
  ],
  {
    variants: {
      variant: {
        default: "text-foreground",
        destructive:
          "text-destructive [&_.alert-description]:text-destructive [&_.alert-title]:text-destructive",
        warning:
          "text-warning-foreground [&_.alert-description]:text-warning-foreground [&_.alert-title]:text-warning-foreground",
        success:
          "text-success [&_.alert-description]:text-success [&_.alert-title]:text-success",
        info: "text-info [&_.alert-description]:text-info [&_.alert-title]:text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      className={cn(alertVariants({ variant }), className)}
      data-slot="alert"
      role="alert"
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "alert-title col-start-2 m-0 font-normal text-secondary-foreground text-sm tracking-tight",
        "max-sm:font-medium max-sm:text-[0.9375rem]",
        className
      )}
      data-slot="alert-title"
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "alert-description col-start-2 m-0 font-light text-muted-foreground text-sm",
        "max-sm:text-[0.9375rem] max-sm:leading-[1.5]",
        className
      )}
      data-slot="alert-description"
      {...props}
    />
  );
}

export { Alert, AlertDescription, AlertTitle };
