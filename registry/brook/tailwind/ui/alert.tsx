import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils-tailwind";

const alertVariants = cva(
  [
    "relative mt-6 w-full rounded-2xl",
    "grid grid-cols-[1fr_auto] items-start gap-y-0.5 px-5 py-4",
    "bg-card text-xs leading-[1.2]",
    "border border-[var(--border)]",
    "max-sm:gap-y-2 max-sm:px-3",
  ],
  {
    variants: {
      variant: {
        default: "[--alert-accent:var(--muted-foreground)]",
        destructive: "[--alert-accent:var(--destructive)]",
        warning: "[--alert-accent:var(--warning-foreground)]",
        success: "[--alert-accent:var(--success)]",
        info: "[--alert-accent:var(--info)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

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
    ? children.filter((child) => !(child && typeof child === "object" && "type" in child && child.type === "svg"))
    : children;

  return (
    <div className={cn(alertVariants({ variant }), className)} data-slot="alert" role="alert" {...props}>
      <div className="-inset-px pointer-events-none absolute rounded-[inherit] shadow-[var(--shadow-ring)]" />
      <div className="-top-[13px] pointer-events-none absolute left-[15px] h-[26px] w-[26px] rounded-full bg-[var(--background)]" />
      <div
        className="-top-[13px] pointer-events-none absolute left-[15px] h-[26px] w-[26px] rounded-full shadow-[0_0_0_1px_var(--border)]"
        style={{ clipPath: "inset(50% -3px -3px -3px)" }}
      />
      <div className="-top-[7px] pointer-events-none absolute left-[20px] flex h-4 w-4 items-center justify-center text-[color:var(--alert-accent)] [&_svg]:h-4 [&_svg]:w-4">
        {icon ?? <DefaultAlertIcon />}
      </div>
      {filteredChildren}
    </div>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "alert-title col-start-1 m-0 font-normal text-secondary-foreground text-sm leading-5 tracking-[-0.02em]",
        "max-sm:font-medium max-sm:text-[0.9375rem]",
        className
      )}
      data-slot="alert-title"
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "alert-description col-start-1 m-0 font-light text-muted-foreground text-sm leading-5 [&_p]:m-0",
        "max-sm:text-[0.9375rem] max-sm:leading-[1.5]",
        className
      )}
      data-slot="alert-description"
      {...props}
    />
  );
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "col-start-2 row-[1/span_2] flex h-full items-center justify-center gap-1",
        "max-sm:col-span-full max-sm:row-auto max-sm:mt-2 max-sm:justify-stretch max-sm:[&>*]:w-full",
        className
      )}
      data-slot="alert-action"
      {...props}
    />
  );
}

export { Alert, AlertAction, AlertDescription, AlertTitle };
