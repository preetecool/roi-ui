"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./copy-button.module.css";

interface CopyButtonProps {
  code: string;
  className?: string;
}

export function CopyButton({ code, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  const isHeaderButton = className?.includes("header-copy-button");

  return (
    <button
      onClick={handleCopy}
      className={cn(styles.root, isHeaderButton && styles.header, className)}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.2 }}
            className={styles.iconContainer}
          >
            <Check size={14} />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -180 }}
            transition={{ duration: 0.2 }}
            className={styles.iconContainer}
          >
            <Copy size={14} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}