"use client";

import { NumberField } from "@base-ui/react/number-field";
import { cn } from "@/lib/utils-tailwind";

function NumberFieldRoot({ className, ...props }: NumberField.Root.Props) {
  return (
    <NumberField.Root
      className={cn("relative inline-flex w-full max-w-48 flex-col", className)}
      data-slot="numberfield-root"
      {...props}
    />
  );
}

function NumberFieldGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("relative z-[2] flex items-center gap-0", className)} {...props} />;
}

function NumberFieldInput({ className, ...props }: NumberField.Input.Props) {
  return (
    <NumberField.Input
      className={cn(
        "h-10 min-w-24 flex-[0_1_6rem] border border-[var(--border)] px-2 text-center text-[var(--foreground)] text-sm outline-none transition-all duration-150 ease-out",
        "bg-[var(--mix-card-50-bg)]",
        "placeholder:text-[var(--muted-foreground)]",
        "focus:border-[var(--ring)] focus:shadow-[0_0_0_2px_var(--ring)/0.2]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      data-slot="numberfield-input"
      {...props}
    />
  );
}

function NumberFieldIncrement({ className, children, ...props }: NumberField.Increment.Props) {
  return (
    <NumberField.Increment
      className={cn(
        "flex h-10 cursor-pointer items-center justify-center border border-[var(--border)] bg-[var(--mix-card-50-bg)] px-4 text-[var(--muted-foreground)] transition-all duration-150 ease-out",
        "rounded-r-[var(--radius)] border-l-0",
        "hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
        "active:bg-[var(--muted)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "disabled:hover:bg-transparent disabled:hover:text-[var(--muted-foreground)]",
        className
      )}
      data-slot="numberfield-increment"
      {...props}
    >
      {children || (
        <svg
          aria-label="Increment"
          className="shrink-0"
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

function NumberFieldDecrement({ className, children, ...props }: NumberField.Decrement.Props) {
  return (
    <NumberField.Decrement
      className={cn(
        "flex h-10 cursor-pointer items-center justify-center border border-[var(--border)] bg-[var(--mix-card-50-bg)] px-4 text-[var(--muted-foreground)] transition-all duration-150 ease-out",
        "rounded-l-[var(--radius)] border-r-0",
        "hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
        "active:bg-[var(--muted)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "disabled:hover:bg-transparent disabled:hover:text-[var(--muted-foreground)]",
        className
      )}
      data-slot="numberfield-decrement"
      {...props}
    >
      {children || (
        <svg
          aria-label="Decrement"
          className="shrink-0"
          fill="none"
          height="16"
          role="img"
          viewBox="0 0 24 24"
          width="16"
        >
          <path d="M5 12h14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      )}
    </NumberField.Decrement>
  );
}

function NumberFieldScrubArea({ className, ...props }: NumberField.ScrubArea.Props) {
  return (
    <NumberField.ScrubArea
      className={cn(
        "absolute top-0 right-0 bottom-0 left-0 z-[1] cursor-col-resize select-none [-webkit-user-select:none]",
        className
      )}
      data-slot="numberfield-scrubarea"
      {...props}
    />
  );
}

function NumberFieldScrubAreaCursor({ className, ...props }: NumberField.ScrubAreaCursor.Props) {
  return (
    <NumberField.ScrubAreaCursor
      className={cn(
        "pointer-events-none absolute h-full w-0.5 rounded-sm bg-[rgba(59,130,246,0.8)] opacity-0 transition-opacity duration-150 ease-out",
        className
      )}
      data-slot="numberfield-scrubareacursor"
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
