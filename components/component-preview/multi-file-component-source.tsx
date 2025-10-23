"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
import componentSourceStyles from "../component-source/component-source.module.css";
import styles from "./multi-file-component-source.module.css";

type FileTab = {
  name: string;
  content: string;
  rawContent: string;
  language?: string;
};

type MultiFileComponentSourceProps = {
  files: FileTab[];
};

export function MultiFileComponentSource({
  files,
}: MultiFileComponentSourceProps) {
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

  useEffect(() => {
    const handleResize = () => {
      const activeTabElement = tabRefs.current[activeTab];

      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement;
        setBubbleStyle({ left: offsetLeft, width: offsetWidth });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
              className={`${styles.tab} ${index === activeTab ? styles.tabActive : ""}`}
              key={file.name}
              onClick={() => setActiveTab(index)}
              ref={(el) => {
                tabRefs.current[index] = el as HTMLElement;
              }}
              type="button"
            >
              <span className={styles.tabContent}>{file.name}</span>
            </button>
          ))}
          <motion.span
            animate={{
              left: bubbleStyle.left,
              width: bubbleStyle.width,
            }}
            className={styles.tabIndicator}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        </div>
        <CopyButton code={currentFile.rawContent} />
      </div>

      <div className={componentSourceStyles.codeContent}>
        <div
          className={`code-container ${componentSourceStyles.codeContainer} ${componentSourceStyles.codeContainerEmbedded}`}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for Shiki syntax highlighting
          dangerouslySetInnerHTML={{ __html: currentFile.content }}
        />
      </div>
    </div>
  );
}
