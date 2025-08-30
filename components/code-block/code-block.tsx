import React from "react";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
import { highlightCode } from "@/lib/highlight-code";
import styles from "./code-block.module.css";

interface CodeBlockProps {
  filename: string;
  language?: string;
  code: string;
}

export async function CodeBlock({ filename, language = "tsx", code }: CodeBlockProps) {
  const highlightedCode = await highlightCode(code, language);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.filename}>{filename}</span>
        <div className={styles.copyButtonWrapper}>
          <CopyButton code={code} className="header-copy-button" />
        </div>
      </div>

      <div className={`${styles.content} code-container`} dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </div>
  );
}
