"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils-tailwind";

const COPIED_RESET_DELAY_MS = 700;

const CopyIcon = ({ size = 14, copied = false }: { size?: number; copied?: boolean }) => (
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
      className="origin-center will-change-transform"
      data-element="front"
      fill="none"
      height="14"
      rx="2"
      ry="2"
      style={
        copied
          ? {
              transform: "translate(-4px, -4px) scale(0.8)",
              opacity: 0,
              transition: "transform 0.1s ease, opacity 0.1s ease 0.1s",
            }
          : {
              transition: "all 0.25s ease",
            }
      }
      width="14"
      x="8"
      y="8"
    />
    <path
      className="origin-center will-change-transform"
      d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
      data-element="back"
      fill="none"
      style={
        copied
          ? {
              transform: "scale(0.8)",
              opacity: 0,
              transition: "transform 0.1s ease, opacity 0.2s ease 50ms",
            }
          : {
              transition: "all 0.25s ease",
            }
      }
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
      className={cn(
        "flex h-[1.875rem] w-[1.875rem] items-center justify-center",
        "cursor-pointer rounded-md p-2 transition-all duration-[250ms]",
        "text-[var(--muted-foreground)]",
        "[-webkit-tap-highlight-color:transparent]",
        "hover:bg-[var(--accent)]",
        "active:bg-[var(--accent)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-[-2px]",
        className
      )}
      data-copied={copied}
      data-slot="copy-button"
      onClick={handleCopy}
      type="button"
    >
      <div
        className="absolute flex items-center justify-center will-change-transform"
        data-icon="copy"
        style={
          copied
            ? {
                opacity: 0,
                transition: "opacity 0.2s ease 50ms",
              }
            : {
                opacity: 1,
                scale: 1,
                rotate: "0deg",
                filter: "blur(0px)",
                transition: "all 0.25s ease",
              }
        }
      >
        <CopyIcon copied={copied} size={14} />
      </div>
      <div
        className="absolute flex items-center justify-center will-change-transform"
        data-icon="check"
        style={
          copied
            ? {
                opacity: 1,
                scale: 1,
                rotate: "0deg",
                filter: "blur(0px)",
                transition: "all 0.2s ease 50ms",
              }
            : {
                opacity: 0,
                scale: 0,
                rotate: "-45deg",
                filter: "blur(4px)",
                transition: "all 0.25s ease",
              }
        }
      >
        <Check size={14} />
      </div>
    </button>
  );
}

export { CopyButton };
