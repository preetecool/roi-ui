"use client";

import { NumberField } from "@base-ui-components/react/number-field";
import { cn } from "@/lib/utils";
import styles from "./number-field.module.css";

const NumberFieldRoot = ({
  className,
  ...props
}: React.ComponentProps<typeof NumberField.Root>) => (
  <NumberField.Root className={cn(styles.root, className)} {...props} />
);

const NumberFieldGroup = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(styles.group, className)} {...props} />
);

const NumberFieldInput = ({
  className,
  ...props
}: React.ComponentProps<typeof NumberField.Input>) => (
  <NumberField.Input className={cn(styles.input, className)} {...props} />
);

const NumberFieldIncrement = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NumberField.Increment>) => (
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

const NumberFieldDecrement = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NumberField.Decrement>) => (
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

const NumberFieldScrubArea = ({
  className,
  ...props
}: React.ComponentProps<typeof NumberField.ScrubArea>) => (
  <NumberField.ScrubArea className={cn(styles.scrubArea, className)} {...props} />
);

const NumberFieldScrubAreaCursor = ({
  className,
  ...props
}: React.ComponentProps<typeof NumberField.ScrubAreaCursor>) => (
  <NumberField.ScrubAreaCursor className={cn(styles.scrubAreaCursor, className)} {...props} />
);

export {
  NumberFieldRoot as NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
};

