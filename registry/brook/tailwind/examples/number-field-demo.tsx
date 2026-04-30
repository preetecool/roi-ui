"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils-tailwind";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
} from "@/registry/brook/tailwind/ui/number-field";

const keyframes = `
@keyframes nf-slide-from-top {
  from { transform: translateY(-80%); opacity: 0; filter: blur(4px); }
  to { transform: translateY(0); opacity: 1; filter: blur(0); }
}
@keyframes nf-slide-from-bottom {
  from { transform: translateY(80%); opacity: 0; filter: blur(4px); }
  to { transform: translateY(0); opacity: 1; filter: blur(0); }
}
@media (prefers-reduced-motion: reduce) {
  .nf-digit-down, .nf-digit-up { animation: none !important; }
}
`;

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
    <span className="pointer-events-none inline-flex items-center font-bold text-5xl text-[var(--foreground)] tabular-nums leading-none">
      {digits.map((d, i) => {
        const posFromRight = digits.length - i - 1;
        const prevDigit = prevDigits.at(-1 - posFromRight);
        const animate = !isFirstRenderRef.current && d !== prevDigit;
        let animClass: string | undefined;
        if (animate) {
          animClass =
            direction === "down"
              ? "nf-digit-down animate-[nf-slide-from-top_360ms_cubic-bezier(0.32,0.72,0,1)]"
              : "nf-digit-up animate-[nf-slide-from-bottom_360ms_cubic-bezier(0.32,0.72,0,1)]";
        }
        return (
          <span className={cn("inline-block leading-none", animClass)} key={`${posFromRight}-${d}`}>
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

  return (
    <>
      <style>{keyframes}</style>
      <NumberField className="max-w-64" max={100} min={0} onValueChange={setValue} step={1} value={value}>
        <NumberFieldScrubArea>
          <NumberFieldScrubAreaCursor />
        </NumberFieldScrubArea>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <div className="relative flex h-14 w-22 items-center justify-center">
            <NumberFieldInput
              className={cn(
                "absolute inset-0 h-full w-full text-transparent",
                editing ? "caret-[var(--foreground)]" : "caret-transparent"
              )}
              onBlur={() => setEditing(false)}
              onPointerDown={() => setEditing(true)}
            />
            <AnimatedNumber value={value} />
          </div>
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </>
  );
}
