"use client";

import { NumberField } from "@base-ui/react/number-field";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./number-field-animated.module.css";

type Direction = "up" | "down";
type DigitEntry = { d: string; mode?: "enter" | "exit"; id: number };

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
    <span className={styles.slot}>
      {entries.map((entry) => {
        let animClass: string | undefined;
        if (entry.mode === "enter") {
          animClass = direction === "down" ? styles.enterDown : styles.enterUp;
        } else if (entry.mode === "exit") {
          animClass = direction === "down" ? styles.exitDown : styles.exitUp;
        }
        return (
          <span
            className={cn(styles.digit, animClass)}
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
    <span className={styles.digits}>
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
  const inputClassName = cn(styles.input, editing ? styles.inputEditing : "");

  return (
    <NumberField.Root className={styles.root} max={100} min={0} onValueChange={setValue} step={1} value={value}>
      <NumberField.ScrubArea className={styles.scrubArea}>
        <NumberField.ScrubAreaCursor className={styles.scrubAreaCursor} />
      </NumberField.ScrubArea>
      <div className={styles.group}>
        <NumberField.Decrement className={styles.decrement}>
          <svg
            aria-label="Decrement"
            className={styles.icon}
            fill="none"
            height="20"
            role="img"
            viewBox="0 0 24 24"
            width="20"
          >
            <path d="M5 12h14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </NumberField.Decrement>
        <div className={styles.display}>
          <NumberField.Input
            className={inputClassName}
            onBlur={() => setEditing(false)}
            onPointerDown={() => setEditing(true)}
          />
          <AnimatedNumber value={value} />
        </div>
        <NumberField.Increment className={styles.increment}>
          <svg
            aria-label="Increment"
            className={styles.icon}
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
  );
}
