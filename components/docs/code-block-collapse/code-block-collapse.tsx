"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./code-block-collapse.module.css";

type CodeBlockCollapseProps = {
  children: ReactNode;
  maxHeight?: number;
  className?: string;
};

export function CodeBlockCollapse({ children, maxHeight = 350, className }: CodeBlockCollapseProps) {
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const [contentHeight, setContentHeight] = useState(maxHeight);
  const [hydrated, setHydrated] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) {
      return;
    }

    const measure = () => {
      const sh = el.scrollHeight;
      setContentHeight(sh);
      setOverflows(sh > maxHeight + 1);
    };

    measure();
    setHydrated(true);

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    for (const child of Array.from(el.children)) {
      observer.observe(child);
    }

    return () => observer.disconnect();
  }, [maxHeight]);

  const assumeOverflow = !hydrated || overflows;
  const isExpanded = expanded && overflows;
  const isCollapsed = !isExpanded && assumeOverflow;
  const showToggle = assumeOverflow;

  let viewportStyle: CSSProperties;
  if (!hydrated) {
    viewportStyle = { maxHeight };
  } else if (overflows) {
    viewportStyle = { height: isExpanded ? contentHeight : maxHeight };
  } else {
    viewportStyle = {};
  }

  return (
    <div className={cn(styles.wrapper, className)}>
      <div
        className={styles.viewport}
        data-state={isExpanded ? "open" : "closed"}
        ref={viewportRef}
        style={viewportStyle}
      >
        {children}
        <div aria-hidden="true" className={cn(styles.fade, !isCollapsed && styles.fadeHidden)} />
      </div>
      {showToggle ? (
        <button
          aria-expanded={isExpanded}
          className={styles.toggle}
          data-state={isExpanded ? "open" : "closed"}
          onClick={() => setExpanded((v) => !v)}
          type="button"
        >
          <svg
            aria-hidden="true"
            className={styles.chevron}
            fill="none"
            height="14"
            viewBox="0 0 24 24"
            width="14"
          >
            <path
              d="m7 15 5 5 5-5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="m7 9 5-5 5 5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          {isExpanded ? "hide code" : "view code"}
        </button>
      ) : null}
    </div>
  );
}
