"use client";

import { NumberField } from "@base-ui/react/number-field";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils-tailwind";

type Direction = "up" | "down";
type DigitEntry = { d: string; mode?: "enter" | "exit"; id: number };

const animationStyles = `
@keyframes nf-enter-down { from { transform: translateY(-100%); opacity: 0; filter: blur(8px); } to { transform: translateY(0); opacity: 1; filter: blur(0); } }
@keyframes nf-exit-down { from { transform: translateY(0); opacity: 1; filter: blur(0); } to { transform: translateY(100%); opacity: 0; filter: blur(8px); } }
@keyframes nf-enter-up { from { transform: translateY(100%); opacity: 0; filter: blur(8px); } to { transform: translateY(0); opacity: 1; filter: blur(0); } }
@keyframes nf-exit-up { from { transform: translateY(0); opacity: 1; filter: blur(0); } to { transform: translateY(-100%); opacity: 0; filter: blur(8px); } }
.nf-enter-down { animation: nf-enter-down 380ms cubic-bezier(0.32, 0.72, 0, 1) forwards; }
.nf-exit-down { animation: nf-exit-down 380ms cubic-bezier(0.32, 0.72, 0, 1) forwards; }
.nf-enter-up { animation: nf-enter-up 380ms cubic-bezier(0.32, 0.72, 0, 1) forwards; }
.nf-exit-up { animation: nf-exit-up 380ms cubic-bezier(0.32, 0.72, 0, 1) forwards; }
@media (prefers-reduced-motion: reduce) {
  .nf-enter-down, .nf-exit-down, .nf-enter-up, .nf-exit-up { animation-duration: 1ms; }
}
`;

const stepperClasses = cn(
  "flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--border)_15%,transparent)] bg-[var(--mix-card-50-bg)] text-[var(--muted-foreground)] transition-all duration-150 ease-out",
  "will-change-[width,height,border-radius,background-color,transform]",
  "hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
  "active:bg-[var(--muted)]",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "disabled:hover:bg-transparent disabled:hover:text-[var(--muted-foreground)]"
);

function RollDigit({ digit, direction }: { digit: string; direction: Direction }) {
  const [entries, setEntries] = useState<DigitEntry[]>(() => [{ d: digit, id: 0 }]);
  const stateRef = useRef({ d: digit, id: 0 });

  useEffect(() => {
    if (digit === stateRef.current.d) {
      return;
    }
    const exitId = stateRef.current.id;
    const enterId = exitId + 1;
    setEntries([
      { d: stateRef.current.d, mode: "exit", id: exitId },
      { d: digit, mode: "enter", id: enterId },
    ]);
    stateRef.current = { d: digit, id: enterId };

    const timeout = setTimeout(() => {
      setEntries((current) => current.filter((entry) => entry.id !== exitId));
    }, 450);
    return () => clearTimeout(timeout);
  }, [digit]);

  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: "0.62em", height: "1em" }}>
      {entries.map((entry) => {
        let animClass: string | undefined;
        if (entry.mode === "enter") {
          animClass = direction === "down" ? "nf-enter-down" : "nf-enter-up";
        } else if (entry.mode === "exit") {
          animClass = direction === "down" ? "nf-exit-down" : "nf-exit-up";
        }
        return (
          <span
            className={cn(
              "absolute flex items-center justify-center leading-none will-change-[transform,opacity,filter] [backface-visibility:hidden]",
              animClass
            )}
            key={entry.id}
            onAnimationEnd={() => {
              if (entry.mode === "exit") {
                setEntries((current) => current.filter((item) => item.id !== entry.id));
              }
            }}
          >
            {entry.d}
          </span>
        );
      })}
    </span>
  );
}

function AnimatedNumber({ value }: { value: number | null }) {
  const prevValueRef = useRef<number | null>(value);
  const direction: Direction =
    value !== null && prevValueRef.current !== null && value < prevValueRef.current ? "up" : "down";

  useEffect(() => {
    prevValueRef.current = value;
  });

  if (value === null) {
    return null;
  }

  const digits = String(value).split("").reverse();

  return (
    <span className="pointer-events-none inline-flex flex-row-reverse items-center font-bold text-5xl text-[var(--foreground)] tabular-nums leading-none">
      {digits.map((d, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: digit slots are keyed by fixed position from the right
        <RollDigit digit={d} direction={direction} key={i} />
      ))}
    </span>
  );
}

export default function NumberFieldAnimated() {
  const [value, setValue] = useState<number | null>(0);
  const [editing, setEditing] = useState(false);

  return (
    <>
      <style>{animationStyles}</style>
      <NumberField.Root
        className="relative inline-flex w-full max-w-64 flex-col overflow-visible will-change-[border-radius]"
        max={100}
        min={0}
        onValueChange={setValue}
        step={1}
        value={value}
      >
        <NumberField.ScrubArea className="absolute top-0 right-0 bottom-0 left-0 z-[1] cursor-col-resize select-none [-webkit-user-select:none]">
          <NumberField.ScrubAreaCursor className="pointer-events-none absolute h-full w-0.5 rounded-sm bg-[rgba(59,130,246,0.8)] opacity-0 transition-opacity duration-150 ease-out" />
        </NumberField.ScrubArea>
        <div className="relative z-[2] flex items-center justify-center gap-2 will-change-[gap]">
          <NumberField.Decrement className={stepperClasses}>
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
          </NumberField.Decrement>
          <div className="relative flex h-14 w-22 items-center justify-center">
            <NumberField.Input
              className={cn(
                "absolute inset-0 h-full w-full border-none bg-transparent text-center font-bold text-5xl text-transparent outline-none",
                editing ? "caret-[var(--foreground)]" : "caret-transparent"
              )}
              onBlur={() => setEditing(false)}
              onPointerDown={() => setEditing(true)}
            />
            <AnimatedNumber value={value} />
          </div>
          <NumberField.Increment className={stepperClasses}>
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
          </NumberField.Increment>
        </div>
      </NumberField.Root>
    </>
  );
}
