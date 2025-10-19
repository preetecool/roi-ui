"use client";

import { NumberField } from "@base-ui-components/react/number-field";
import { cn } from "@/lib/utils";
import styles from "./number-field.module.css";

function NumberFieldRoot({
  className,
  ...props
}: React.ComponentProps<typeof NumberField.Root>) {
  return <NumberField.Root className={cn(styles.root, className)} {...props} />;
}

function NumberFieldGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.group, className)} {...props} />;
}

function NumberFieldInput({
  className,
  ...props
}: React.ComponentProps<typeof NumberField.Input>) {
  return <NumberField.Input className={cn(styles.input, className)} {...props} />;
}

function NumberFieldIncrement({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NumberField.Increment>) {
  return (
    <NumberField.Increment className={cn(styles.increment, className)} {...props}>
      {children || (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.icon}>
          <path
            d="M12 5v14m-7-7h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </NumberField.Increment>
  );
}

function NumberFieldDecrement({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NumberField.Decrement>) {
  return (
    <NumberField.Decrement className={cn(styles.decrement, className)} {...props}>
      {children || (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.icon}>
          <path
            d="M5 12h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </NumberField.Decrement>
  );
}

function NumberFieldScrubArea({
  className,
  ...props
}: React.ComponentProps<typeof NumberField.ScrubArea>) {
  return <NumberField.ScrubArea className={cn(styles.scrubArea, className)} {...props} />;
}

function NumberFieldScrubAreaCursor({
  className,
  ...props
}: React.ComponentProps<typeof NumberField.ScrubAreaCursor>) {
  return <NumberField.ScrubAreaCursor className={cn(styles.scrubAreaCursor, className)} {...props} />;
}

export {
  NumberFieldRoot as NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
};

