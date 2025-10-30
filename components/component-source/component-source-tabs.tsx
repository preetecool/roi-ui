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
        <div className={styles.tabs} role="tablist" aria-label="Code files">
          {files.map((file, index) => (
            <button
              aria-controls={`tabpanel-${index}`}
              aria-selected={index === activeTab}
              className={`${styles.tab} ${index === activeTab ? styles.tabActive : ""}`}
              key={file.name}
              onClick={() => setActiveTab(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              role="tab"
              tabIndex={index === activeTab ? 0 : -1}
              type="button"
            >
              {file.name}
            </button>
          ))}
        </div>
        <CopyButton code={files[activeTab].content} />
      </div>

      <div
        aria-labelledby={`tab-${activeTab}`}
        className={styles.codeContent}
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
      >
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
