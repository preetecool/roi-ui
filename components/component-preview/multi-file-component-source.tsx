"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
import styles from "./multi-file-component-source.module.css";
import componentSourceStyles from "../component-source/component-source.module.css";

interface FileTab {
  name: string;
  content: string;
  rawContent: string;
  language?: string;
}

interface MultiFileComponentSourceProps {
  files: FileTab[];
}

export function MultiFileComponentSource({ files }: MultiFileComponentSourceProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab];

    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement;
      setBubbleStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  if (!files || files.length === 0) {
    return null;
  }

  const currentFile = files[activeTab];

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.tabs}>
          {files.map((file, index) => (
            <button
              key={file.name}
              ref={(el) => {
                tabRefs.current[index] = el as HTMLElement;
              }}
              className={`${styles.tab} ${index === activeTab ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(index)}
            >
              <span className={styles.tabContent}>{file.name}</span>
            </button>
          ))}
          <motion.span
            className={styles.tabIndicator}
            animate={{
              left: bubbleStyle.left,
              width: bubbleStyle.width,
            }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        </div>
        <CopyButton code={currentFile.rawContent} className="header-copy-button" />
      </div>
      
      <div className={componentSourceStyles.codeContent}>
        <div 
          className={`code-container ${componentSourceStyles.codeContainer} ${componentSourceStyles.codeContainerEmbedded}`}
          dangerouslySetInnerHTML={{ __html: currentFile.content }}
        />
      </div>
    </div>
  );
}