"use client";

import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useState } from "react";
import styles from "./copy-button.module.css";

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
      setTimeout(() => setCopied(false), 800);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  const isHeaderButton = className?.includes("header-copy-button");

  return (
    <MotionConfig transition={{ duration: 0.4, type: "spring", bounce: 0 }}>
      <motion.button
        data-slot="copy-button"
        onClick={handleCopy}
        className={cn(styles.root, isHeaderButton && styles.header, className)}
      >
        <AnimatePresence mode="popLayout">
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0, rotate: -180, filter: "blur(4px)" }}
              animate={{ scale: 1, rotate: 0, filter: "blur(0px)" }}
              exit={{ scale: 0, rotate: 180, filter: "blur(4px)" }}
              className={styles.iconContainer}
            >
              <Check size={14} />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ scale: 0, rotate: 180, filter: "blur(4px)" }}
              animate={{ scale: 1, rotate: 0, filter: "blur(0px)" }}
              exit={{ scale: 0, rotate: -180, filter: "blur(4px)" }}
              className={styles.iconContainer}
            >
              <Copy size={14} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </MotionConfig>
  );
}

export { CopyButton };
