"use client";

import { useState } from "react";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
import styles from "./component-source.module.css";

type FileTab = {
  name: string;
  content: string;
  highlightedContent: string;
};

type ComponentSourceTabsProps = {
  files: FileTab[];
};

export function ComponentSourceTabs({ files }: ComponentSourceTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

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
        <CopyButton code={files[activeTab].content} />
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
