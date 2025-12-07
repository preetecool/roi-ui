"use client";

import { Link as LinkIcon } from "lucide-react";
import { type ComponentProps, useMemo, useRef } from "react";
import { anchoredToastManager } from "@/registry/brook/ui/toast/toast";
import styles from "./heading-anchor.module.css";

const COPIED_DISPLAY_DURATION = 800;
const ICON_SIZE_H2 = 16;
const ICON_SIZE_H3 = 14;
const ICON_SIZE_H4 = 12;

const ICON_SIZE_BY_LEVEL: Record<2 | 3 | 4, number> = {
  2: ICON_SIZE_H2,
  3: ICON_SIZE_H3,
  4: ICON_SIZE_H4,
};

export function HeadingAnchor({
  level,
  children,
  ...props
}: ComponentProps<"h2"> & { level: 2 | 3 | 4 }) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const id = useMemo(() => {
    const text = children?.toString() || "";
    return text
      .split(" ")
      .join("-")
      .split("'")
      .join("")
      .split("?")
      .join("")
      .toLowerCase();
  }, [children]);

  const Component = `h${level}` as const;
  const iconSize = ICON_SIZE_BY_LEVEL[level];

  const handleClick = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;

    try {
      await navigator.clipboard.writeText(url);
      anchoredToastManager.add({
        title: "Copied!",
        timeout: COPIED_DISPLAY_DURATION,
        positionerProps: {
          anchor: buttonRef.current,
          side: "top",
          sideOffset: 6,
        },
      });
    } catch {
      // Silently fail if clipboard is unavailable
    }

    window.history.pushState(null, "", `#${id}`);
  };

  return (
    <Component className={styles.headingWithAnchor} id={id} {...props}>
      <button
        aria-label="Copy URL"
        className={styles.trigger}
        onClick={handleClick}
        ref={buttonRef}
        type="button"
      >
        <LinkIcon className={styles.icon} size={iconSize} strokeWidth={1.5} />
        {children}
      </button>
    </Component>
  );
}
