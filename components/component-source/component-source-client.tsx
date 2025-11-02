"use client";

import { useEffect, useState } from "react";
import { useStyle } from "@/components/style-provider";
import { StyleSelector } from "@/components/style-selector/style-selector";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
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
  const currentVariant =
    variants.find((v) => v.variant === style) || variants[0];
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

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setActiveTab((index + 1) % files.length);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveTab((index - 1 + files.length) % files.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveTab(files.length - 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabsHeader}>
        <div aria-label="Code files" className={styles.tabs} role="tablist">
          {files.map((file, index) => (
            <button
              aria-controls={`tabpanel-${index}`}
              aria-selected={index === safeActiveTab}
              className={`${styles.tab} ${index === safeActiveTab ? styles.tabActive : ""}`}
              key={file.name}
              onClick={() => setActiveTab(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              role="tab"
              tabIndex={index === safeActiveTab ? 0 : -1}
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

      <div
        aria-labelledby={`tab-${safeActiveTab}`}
        className={styles.codeContent}
        id={`tabpanel-${safeActiveTab}`}
        role="tabpanel"
      >
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
