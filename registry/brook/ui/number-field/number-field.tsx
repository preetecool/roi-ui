"use client";

import { NumberField } from "@base-ui-components/react/number-field";
import { cn } from "@/lib/utils";
import styles from "./number-field.module.css";

function NumberFieldRoot({
  className,
  ...props
}: NumberField.Root.Props) {
  return <NumberField.Root className={cn(styles.root, className)} {...props} />;
}

function NumberFieldGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.group, className)} {...props} />;
}

function NumberFieldInput({
  className,
  ...props
}: NumberField.Input.Props) {
  return (
    <NumberField.Input className={cn(styles.input, className)} {...props} />
  );
}

function NumberFieldIncrement({
  className,
  children,
  ...props
}: NumberField.Increment.Props) {
  return (
    <NumberField.Increment
      className={cn(styles.increment, className)}
      {...props}
    >
      {children || (
        <svg
          aria-label="Increment"
          className={styles.icon}
          fill="none"
          height="16"
          role="img"
          viewBox="0 0 24 24"
          width="16"
        >
          <path
            d="M12 5v14m-7-7h14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
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
}: NumberField.Decrement.Props) {
  return (
    <NumberField.Decrement
      className={cn(styles.decrement, className)}
      {...props}
    >
      {children || (
        <svg
          aria-label="Decrement"
          className={styles.icon}
          fill="none"
          height="16"
          role="img"
          viewBox="0 0 24 24"
          width="16"
        >
          <path
            d="M5 12h14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      )}
    </NumberField.Decrement>
  );
}

function NumberFieldScrubArea({
  className,
  ...props
}: NumberField.ScrubArea.Props) {
  return (
    <NumberField.ScrubArea
      className={cn(styles.scrubArea, className)}
      {...props}
    />
  );
}

function NumberFieldScrubAreaCursor({
  className,
  ...props
}: NumberField.ScrubAreaCursor.Props) {
  return (
    <NumberField.ScrubAreaCursor
      className={cn(styles.scrubAreaCursor, className)}
      {...props}
    />
  );
}

export {
  NumberFieldRoot as NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
};
