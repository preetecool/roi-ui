"use client";

import { useEffect, useRef } from "react";
import { CommandItem } from "@/registry/brook/ui/command/command";
import styles from "./search.module.css";

type SearchItemProps = React.ComponentPropsWithoutRef<typeof CommandItem> & {
  onHighlight?: () => void;
};

export function SearchItem({ children, value, onSelect, onHighlight, ...props }: SearchItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!(ref.current && onHighlight)) return;
    const parent = ref.current.parentElement as HTMLDivElement;
    if (!parent) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "aria-selected") {
          const isSelected = parent.getAttribute("aria-selected") === "true";
          if (isSelected) onHighlight();
        }
      });
    });

    observer.observe(parent, {
      attributes: true,
      attributeFilter: ["aria-selected"],
    });

    return () => observer.disconnect();
  }, [onHighlight]);

  return (
    <CommandItem onSelect={onSelect} value={value} {...props} className={styles.item}>
      <span ref={ref} style={{ display: "contents" }}>
        {children}
      </span>
    </CommandItem>
  );
}
