"use client";

import { useEffect, useState } from "react";
import { StyleSelector } from "@/components/docs/style-selector/style-selector";
import { useStyle } from "@/components/providers/style-provider";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/brook/ui/tabs/tabs";
import styles from "./block-viewer.module.css";
import { buildFileTree, FileTree } from "./file-tree";

type FileData = {
  name: string;
  path: string;
  content: string;
  highlightedContent: string;
};

type BlockViewerProps = {
  name: string;
  cssModulesFiles: FileData[];
  tailwindFiles: FileData[];
  children: React.ReactNode;
};

export function BlockViewer({ name, cssModulesFiles, tailwindFiles, children }: BlockViewerProps) {
  const { style } = useStyle();
  const files = style === "tailwind" ? tailwindFiles : cssModulesFiles;

  const [selectedFile, setSelectedFile] = useState(files[0]?.path ?? null);
  const currentFile = files.find((f) => f.path === selectedFile);

  // Reset selected file when style changes
  useEffect(() => {
    setSelectedFile(files[0]?.path ?? null);
  }, [style, files]);

  const fileTree = buildFileTree(files.map((f) => f.path));

  return (
    <div className={styles.viewer}>
      <Tabs className={styles.tabs} defaultValue="preview">
        <div className={styles.tabsHeader}>
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <StyleSelector />
        </div>

        <TabsContent className={styles.previewPanel} value="preview">
          <div className={styles.previewContainer}>{children}</div>
        </TabsContent>

        <TabsContent className={styles.codePanel} value="code">
          <div className={styles.codeLayout}>
            <div className={styles.sidebar}>
              <div className={styles.sidebarHeader}>
                <span className={styles.sidebarTitle}>Files</span>
              </div>
              <FileTree files={fileTree} onSelect={setSelectedFile} selectedPath={selectedFile} />
            </div>
            <div className={styles.codeArea}>
              {currentFile ? (
                <>
                  <div className={styles.codeHeader}>
                    <span className={styles.fileName}>{currentFile.name}</span>
                    <CopyButton code={currentFile.content} />
                  </div>
                  <div className={styles.codeContent}>
                    <div
                      className="code-container"
                      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for Shiki syntax highlighting
                      dangerouslySetInnerHTML={{ __html: currentFile.highlightedContent }}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
