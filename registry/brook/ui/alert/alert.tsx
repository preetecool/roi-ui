import { cn } from "@/lib/utils";
import styles from "./alert.module.css";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  variant?: "default" | "destructive" | "warning" | "success" | "info";
  size?: "default" | "sm";
}

export const Alert = ({ className, ref, variant = "default", size = "default", ...props }: AlertProps) => (
  <div ref={ref} className={cn(styles.alert, styles[variant], size === "sm" && styles.sm, className)} {...props} />
);
Alert.displayName = "Alert";

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  ref?: React.Ref<HTMLHeadingElement>;
}

export const AlertTitle = ({ className, ref, ...props }: AlertTitleProps) => (
  <h5 ref={ref} className={cn(styles.title, className)} {...props} />
);
AlertTitle.displayName = "AlertTitle";

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export const AlertDescription = ({ className, ref, ...props }: AlertDescriptionProps) => (
  <div ref={ref} className={cn(styles.description, className)} {...props} />
);
AlertDescription.displayName = "AlertDescription";

export interface AlertIconProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export const AlertIcon = ({ className, ref, ...props }: AlertIconProps) => (
  <div ref={ref} className={cn(styles.icon, className)} {...props} />
);
AlertIcon.displayName = "AlertIcon";
