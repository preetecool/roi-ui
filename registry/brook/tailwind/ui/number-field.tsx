"use client";

import { NumberField } from "@base-ui/react/number-field";
import { cn } from "@/lib/utils-tailwind";

function NumberFieldRoot({ className, ...props }: NumberField.Root.Props) {
  return (
    <NumberField.Root
      className={cn("relative inline-flex w-full max-w-64 flex-col", className)}
      data-slot="numberfield-root"
      {...props}
    />
  );
}

function NumberFieldGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("relative z-[2] flex items-center justify-center gap-1", className)} {...props} />;
}

function NumberFieldInput({ className, ...props }: NumberField.Input.Props) {
  return (
    <NumberField.Input
      className={cn(
        "h-14 w-22 min-w-0 flex-[0_1_auto] border-none bg-transparent px-1 text-center font-bold text-5xl text-[var(--foreground)] outline-none transition-colors duration-150 ease-out",
        "placeholder:font-normal placeholder:text-[var(--muted-foreground)] placeholder:text-sm",
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
        "flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--border)_15%,transparent)] bg-[var(--mix-card-50-bg)] text-[var(--muted-foreground)] transition-all duration-150 ease-out",
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
          height="20"
          role="img"
          viewBox="0 0 24 24"
          width="20"
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
        "flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--border)_15%,transparent)] bg-[var(--mix-card-50-bg)] text-[var(--muted-foreground)] transition-all duration-150 ease-out",
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
          height="20"
          role="img"
          viewBox="0 0 24 24"
          width="20"
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
