"use client";

import { useCallback, useEffect, useRef } from "react";
import { CommandItem } from "@/registry/brook/ui/command/command";
import styles from "./search.module.css";

type SearchItemProps = React.ComponentPropsWithoutRef<typeof CommandItem> & {
  onHighlight?: () => void;
};

export function SearchItem({
  children,
  value,
  onSelect,
  onHighlight,
  ...props
}: SearchItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Use a callback ref to get the actual DOM element
  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!(node && onHighlight)) return;

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "aria-selected"
          ) {
            const isSelected = node.getAttribute("aria-selected") === "true";
            if (isSelected) {
              onHighlight();
            }
          }
        });
      });

      observer.observe(node, {
        attributes: true,
        attributeFilter: ["aria-selected"],
      });

      // Cleanup
      return () => observer.disconnect();
    },
    [onHighlight]
  );

  useEffect(() => {
    // Find the CommandItem element (which is the parent of our children)
    if (ref.current && onHighlight) {
      const cleanup = setRef(ref.current.parentElement as HTMLDivElement);
      return cleanup;
    }
  }, [onHighlight, setRef]);

  return (
    <CommandItem
      onSelect={onSelect}
      value={value}
      {...props}
      className={styles.item}
    >
      <span ref={ref} style={{ display: "contents" }}>
        {children}
      </span>
    </CommandItem>
  );
}
