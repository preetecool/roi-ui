import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
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

function DefaultAlertIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16V11.5" />
      <path d="M12 8.01172V8.00172" />
    </svg>
  );
}

interface AlertProps extends React.ComponentProps<"div">, VariantProps<typeof alertVariants> {
  icon?: ReactNode;
}

function Alert({ className, variant, icon, children, ...props }: AlertProps) {
  const filteredChildren = Array.isArray(children)
    ? children.filter(
        (child) => !(child && typeof child === "object" && "type" in child && child.type === "svg")
      )
    : children;

  return (
    <div className={cn(alertVariants({ variant }), className)} data-slot="alert" role="alert" {...props}>
      <div className={styles.shadowRing} />
      <div className={styles.notchBg} />
      <div className={styles.notchBorder} />
      <div className={styles.iconWrap}>{icon ?? <DefaultAlertIcon />}</div>
      {filteredChildren}
    </div>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.title, className)} data-slot="alert-title" {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.description, className)} data-slot="alert-description" {...props} />;
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.action, className)} data-slot="alert-action" {...props} />;
}

export { Alert, AlertAction, AlertDescription, AlertTitle };
