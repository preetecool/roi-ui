"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
} from "@/registry/brook/ui/number-field/number-field";
import styles from "./number-field-demo.module.css";

function AnimatedNumber({ value }: { value: number | null }) {
  const prevRef = useRef<number | null>(value);
  const isFirstRenderRef = useRef(true);

  const direction = value !== null && prevRef.current !== null && value < prevRef.current ? "up" : "down";

  useEffect(() => {
    prevRef.current = value;
    isFirstRenderRef.current = false;
  });

  if (value === null) {
    return null;
  }

  const digits = String(value).split("");
  const prevDigits = prevRef.current !== null ? String(prevRef.current).split("") : [];

  return (
    <span className={styles.digits}>
      {digits.map((d, i) => {
        const posFromRight = digits.length - i - 1;
        const prevDigit = prevDigits.at(-1 - posFromRight);
        const animate = !isFirstRenderRef.current && d !== prevDigit;
        let animClass: string | undefined;
        if (animate) {
          animClass = direction === "down" ? styles.digitDown : styles.digitUp;
        }
        return (
          <span className={cn(styles.digit, animClass)} key={`${posFromRight}-${d}`}>
            {d}
          </span>
        );
      })}
    </span>
  );
}

export default function NumberFieldDemo() {
  const [value, setValue] = useState<number | null>(0);
  const [editing, setEditing] = useState(false);
  const inputClassName = cn(styles.input, editing ? styles.inputEditing : "");

  return (
    <NumberField className={styles.numberField} max={100} min={0} onValueChange={setValue} step={1} value={value}>
      <NumberFieldScrubArea>
        <NumberFieldScrubAreaCursor />
      </NumberFieldScrubArea>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <div className={styles.display}>
          <NumberFieldInput
            className={inputClassName}
            onBlur={() => setEditing(false)}
            onPointerDown={() => setEditing(true)}
          />
          <AnimatedNumber value={value} />
        </div>
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  );
}
