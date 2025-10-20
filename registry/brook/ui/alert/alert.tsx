import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import styles from "./alert.module.css";

const alertVariants = cva(styles.alert, {
  variants: {
    variant: {
      default: styles.default,
      destructive: styles.destructive,
      warning: styles.warning,
      success: styles.success,
      info: styles.info,
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

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
      className={cn(styles.title, className)}
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
      className={cn(styles.description, className)}
      data-slot="alert-description"
      {...props}
    />
  );
}

export { Alert, AlertDescription, AlertTitle };
