"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/tw-utils";

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
      className={cn(
        "origin-center transition-all duration-300 ease-in-out will-change-transform",
        copied && "translate-x-[-4px] translate-y-[-4px] scale-80 opacity-0 transition-[transform_0.1s_ease,opacity_0.1s_ease_0.1s]"
      )}
      data-element="front"
      fill="none"
      height="14"
      rx="2"
      ry="2"
      width="14"
      x="8"
      y="8"
    />
    <path
      className={cn(
        "origin-center transition-all duration-300 ease-in-out will-change-transform",
        copied && "scale-80 opacity-0 transition-[transform_0.1s_ease,opacity_0.1s_ease_50ms]"
      )}
      d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
      data-element="back"
      fill="none"
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
        "cursor-pointer rounded-md p-2 transition-all duration-200",
        "[-webkit-tap-highlight-color:transparent]",
        "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
        className
      )}
      data-copied={copied}
      data-slot="copy-button"
      onClick={handleCopy}
      type="button"
    >
      <div
        className={cn(
          "absolute flex items-center justify-center will-change-transform",
          "transition-all duration-300 ease-in-out",
          copied
            ? "opacity-0 transition-opacity delay-[50ms] duration-[250ms] ease-in-out"
            : "opacity-100 scale-100 rotate-0 blur-0"
        )}
        data-icon="copy"
      >
        <CopyIcon size={14} copied={copied} />
      </div>
      <div
        className={cn(
          "absolute flex items-center justify-center will-change-transform",
          "transition-all duration-300 ease-in-out",
          copied
            ? "rotate-0 scale-100 opacity-100 blur-0 transition-all delay-[50ms] duration-[250ms] ease-in-out"
            : "-rotate-45 scale-0 opacity-0 blur-[4px]"
        )}
        data-icon="check"
      >
        <Check size={14} />
      </div>
    </button>
  );
}

export { CopyButton };
