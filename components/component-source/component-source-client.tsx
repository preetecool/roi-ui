"use client";

import { useState } from "react";
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

  // Reset active tab if it exceeds the current file count
  if (activeTab >= files.length) {
    setActiveTab(0);
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabsHeader}>
        <div className={styles.tabs}>
          {files.map((file, index) => (
            <button
              className={`${styles.tab} ${index === activeTab ? styles.tabActive : ""}`}
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
          <CopyButton code={files[activeTab].content} />
        </div>
      </div>

      <div className={styles.codeContent}>
        <div
          className={`code-container ${styles.codeContainer}`}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for Shiki syntax highlighting
          dangerouslySetInnerHTML={{
            __html: files[activeTab].highlightedContent,
          }}
        />
      </div>
    </div>
  );
}
