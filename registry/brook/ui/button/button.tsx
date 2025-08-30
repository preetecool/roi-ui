import { cn } from "@/lib/utils";
import styles from "./button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive" | "ghost" | "outline" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  showArrow?: boolean;
  pointLeft?: boolean;
  pointExternal?: boolean;
  loading?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

const Spinner = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.spinner}>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="31.416"
        strokeDashoffset="31.416"
      />
    </svg>
  );
};

const ArrowPointer = ({
  pointLeft = false,
  pointExternal = false,
}: {
  pointLeft?: boolean;
  pointExternal?: boolean;
}) => {
  return (
    <svg
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(styles.arrow, pointLeft && styles.arrowLeft, pointExternal && styles.arrowExternal)}
    >
      <g fillRule="nonzero">
        <path
          d={pointLeft ? "M9 1l-4 4 4 4" : "M1 1l4 4-4 4"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          className={styles.arrowPoint}
        />
        <path
          d={pointLeft ? "M8.2 5H4" : "M1 5h4.8"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
          className={styles.arrowShaft}
        />
      </g>
    </svg>
  );
};

export const Button = ({
  className,
  variant = "primary",
  size = "md",
  showArrow = false,
  pointLeft = false,
  pointExternal = false,
  loading = false,
  children,
  ref,
  ...props
}: ButtonProps) => {
  return (
    <button
      ref={ref}
      className={cn(styles.base, styles[variant], styles[size], loading && styles.loading, className)}
      disabled={props.disabled}
      {...props}
    >
      {loading && <Spinner />}
      {!loading && showArrow && pointLeft && <ArrowPointer pointLeft pointExternal={pointExternal} />}
      {children}
      {!loading && showArrow && !pointLeft && <ArrowPointer pointExternal={pointExternal} />}
    </button>
  );
};

Button.displayName = "Button";
