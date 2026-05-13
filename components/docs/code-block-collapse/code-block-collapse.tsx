"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./code-block-collapse.module.css";

type CodeBlockCollapseProps = {
  children: ReactNode;
  maxHeight?: number;
  className?: string;
};

type CollapseState = "collapsed" | "expanded" | "no-overflow";

export function CodeBlockCollapse({ children, maxHeight = 350, className }: CodeBlockCollapseProps) {
  const [state, setState] = useState<CollapseState>("collapsed");
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) {
      return;
    }

    const checkOverflow = () => {
      const overflows = el.scrollHeight > maxHeight + 1;
      setState((curr) => {
        if (curr === "expanded") {
          return "expanded";
        }
        return overflows ? "collapsed" : "no-overflow";
      });
    };

    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(el);
    for (const child of Array.from(el.children)) {
      observer.observe(child);
    }

    return () => observer.disconnect();
  }, [maxHeight]);

  const isCollapsed = state === "collapsed";
  const isExpanded = state === "expanded";
  const showToggle = state !== "no-overflow";

  const toggle = () => setState((s) => (s === "expanded" ? "collapsed" : "expanded"));

  return (
    <div className={cn(styles.wrapper, className)}>
      <div
        className={cn(styles.viewport, isCollapsed && styles.collapsed)}
        ref={viewportRef}
        style={isCollapsed ? { maxHeight } : undefined}
      >
        {children}
        {isCollapsed ? <div aria-hidden="true" className={styles.fade} /> : null}
      </div>
      {showToggle ? (
        <div className={styles.footer}>
          <button aria-expanded={isExpanded} className={styles.toggle} onClick={toggle} type="button">
            <svg
              className={cn(styles.toggleIcon, isExpanded && styles.toggleIconOpen)}
              fill="none"
              height="10"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 12 12"
              width="10"
            >
              <path d="m3 4.5 3 3 3-3" />
            </svg>
            {isExpanded ? "Hide code" : "View code"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
