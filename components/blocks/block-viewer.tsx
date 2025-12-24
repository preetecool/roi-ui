"use client";

import { useEffect, useRef, useState } from "react";
import { StyleSelector } from "@/components/docs/style-selector/style-selector";
import { useStyle } from "@/components/providers/style-provider";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/brook/ui/tabs/tabs";
import { anchoredToastManager } from "@/registry/brook/ui/toast/toast";
import styles from "./block-viewer.module.css";
import { buildFileTree, FileTree } from "./file-tree";

function InstallButton({ name }: { name: string }) {
  const { style } = useStyle();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const suffix = style === "tailwind" ? "-tailwind" : "";
  const command = `npx shadcn@latest add @roiui/${name}${suffix}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    anchoredToastManager.add({
      title: "Copied!",
      timeout: 800,
      positionerProps: {
        anchor: buttonRef.current,
        side: "top",
        sideOffset: 6,
      },
    });
  };

  return (
    <button className={styles.installButton} onClick={handleCopy} ref={buttonRef} type="button">
      <code className={styles.installCode}>{command}</code>
    </button>
  );
}

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
  full?: boolean;
};

export function BlockViewer({ name, cssModulesFiles, tailwindFiles, children, full = false }: BlockViewerProps) {
  const { style } = useStyle();
  const [mounted, setMounted] = useState(false);
  const files = style === "tailwind" ? tailwindFiles : cssModulesFiles;

  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const currentFile = files.find((f) => f.path === selectedFile);

  // Wait for client-side hydration to prevent flash
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set selected file after mount and when style changes
  useEffect(() => {
    if (mounted) {
      setSelectedFile(files[0]?.path ?? null);
    }
  }, [mounted, style, files]);

  const fileTree = buildFileTree(files.map((f) => f.path));

  return (
    <div className={styles.viewer}>
      <Tabs className={styles.tabs} defaultValue="preview">
        <div className={styles.tabsHeader}>
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <div className={styles.headerActions}>
            <InstallButton name={name} />
            <div className={styles.separator} />
            <StyleSelector />
          </div>
        </div>

        <TabsContent className={styles.previewPanel} value="preview">
          <div className={full ? styles.previewContainerFull : styles.previewContainer}>{children}</div>
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
