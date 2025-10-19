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
    <div role="alert" data-slot="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-title" className={cn(styles.title, className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-description" className={cn(styles.description, className)} {...props} />;
}

export { Alert, AlertDescription, AlertTitle };
