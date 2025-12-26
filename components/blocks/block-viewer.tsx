"use client";

import { useEffect, useRef, useState } from "react";
import { CodeBlock } from "@/components/docs/code-block/code-block";
import { StyleSelector } from "@/components/docs/style-selector/style-selector";
import { useStyle } from "@/components/providers/style-provider";
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
    try {
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
    } catch {
      anchoredToastManager.add({
        title: "Failed to copy",
        timeout: 2000,
        positionerProps: {
          anchor: buttonRef.current,
          side: "top",
          sideOffset: 6,
        },
      });
    }
  };

  return (
    <button
      aria-label={`Copy install command: ${command}`}
      className={styles.installButton}
      onClick={handleCopy}
      ref={buttonRef}
      type="button"
    >
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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const currentFiles = style === "tailwind" ? tailwindFiles : cssModulesFiles;
      setSelectedFile(currentFiles[0]?.path ?? null);
    }
  }, [mounted, style, tailwindFiles, cssModulesFiles]);

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
                <CodeBlock.Root
                  className={styles.codeBlock}
                  code={currentFile.content}
                  highlightedCode={currentFile.highlightedContent}
                >
                  <CodeBlock.Header className={styles.codeHeader}>
                    <select
                      aria-label="Select file"
                      className={styles.mobileFileSelect}
                      onChange={(e) => setSelectedFile(e.target.value)}
                      value={selectedFile ?? ""}
                    >
                      {files.map((file) => (
                        <option key={file.path} value={file.path}>
                          {file.path}
                        </option>
                      ))}
                    </select>
                    <CodeBlock.Filename className={styles.fileName}>{currentFile.name}</CodeBlock.Filename>
                    <CodeBlock.Actions>
                      <CodeBlock.CopyButton />
                    </CodeBlock.Actions>
                  </CodeBlock.Header>
                  <CodeBlock.Content className={styles.codeContent} />
                </CodeBlock.Root>
              ) : null}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
