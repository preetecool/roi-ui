"use client";

import { useState, useEffect } from "react";
import { useStyle } from "@/components/style-provider";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
import { StyleSelector } from "@/components/style-selector/style-selector";
import styles from "./component-source.module.css";
import type { StyleVariant } from "./component-source-helpers";

type ProcessedFile = {
  name: string;
  content: string;
  highlightedContent: string;
};

type ProcessedVariant = {
  variant: StyleVariant;
  files: ProcessedFile[];
};

type ComponentSourceClientProps = {
  variants: ProcessedVariant[];
};

export function ComponentSourceClient({
  variants,
}: ComponentSourceClientProps) {
  const { style } = useStyle();
  const [activeTab, setActiveTab] = useState(0);

  // Find the current variant based on the global style preference
  const currentVariant = variants.find((v) => v.variant === style) || variants[0];
  const files = currentVariant.files;

  // Reset active tab when style changes or when activeTab exceeds file count
  useEffect(() => {
    if (activeTab >= files.length) {
      setActiveTab(0);
    }
  }, [style, activeTab, files.length]);

  // Safety check: ensure activeTab is valid
  const safeActiveTab = activeTab < files.length ? activeTab : 0;
  const currentFile = files[safeActiveTab];

  return (
    <div className={styles.container}>
      <div className={styles.tabsHeader}>
        <div className={styles.tabs}>
          {files.map((file, index) => (
            <button
              className={`${styles.tab} ${index === safeActiveTab ? styles.tabActive : ""}`}
              key={file.name}
              onClick={() => setActiveTab(index)}
              type="button"
            >
              {file.name}
            </button>
          ))}
        </div>
        <div className={styles.headerActions}>
          {variants.length > 1 && <StyleSelector />}
          <CopyButton code={currentFile.content} />
        </div>
      </div>

      <div className={styles.codeContent}>
        <div
          className={`code-container ${styles.codeContainer}`}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for Shiki syntax highlighting
          dangerouslySetInnerHTML={{
            __html: currentFile.highlightedContent,
          }}
        />
      </div>
    </div>
  );
}
