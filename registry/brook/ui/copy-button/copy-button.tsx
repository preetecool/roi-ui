"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./copy-button.module.css";

const COPIED_RESET_DELAY_MS = 700;

const CopyIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    aria-label="copy-icon"
    height={size}
    role="img"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    style={{ transform: "scaleX(-1)" }}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      className={styles.copyFront}
      data-element="front"
      height="14"
      rx="2"
      ry="2"
      width="14"
      x="8"
      y="8"
    />
    <path
      className={styles.copyBack}
      d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
      data-element="back"
    />
  </svg>
);

/**
 * CopyButton component for copying text to clipboard with animated feedback.
 * Shows a copy icon that animates to a check mark when clicked.
 *
 * @param code - The text content to copy to clipboard
 * @param className - Optional CSS class names
 *
 * @example
 * ```tsx
 * <CopyButton code="const example = 'Hello World';" />
 * ```
 */
function CopyButton({ code, className }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), COPIED_RESET_DELAY_MS);
    } catch (_error) {
      // Error handling - Silently fail by default
    }
  };

  return (
    <button
      className={cn(styles.root, styles.header, className)}
      data-copied={copied}
      data-slot="copy-button"
      onClick={handleCopy}
      type="button"
    >
      <div className={styles.iconContainer} data-icon="copy">
        <CopyIcon size={14} />
      </div>
      <div className={styles.iconContainer} data-icon="check">
        <Check size={14} />
      </div>
    </button>
  );
}

export { CopyButton };
