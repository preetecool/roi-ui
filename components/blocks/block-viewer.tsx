"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockRoot,
} from "@/components/docs/code-block/code-block";
import { StyleSelector } from "@/components/docs/style-selector/style-selector";
import { useStyle } from "@/components/providers/style-provider";
import { copyWithToast } from "@/components/shared/copy-with-toast";
import { useMounted } from "@/hooks/use-mounted";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/brook/ui/tabs/tabs";
import styles from "./block-viewer.module.css";
import { buildFileTree, FileTree } from "./file-tree";

function InstallButton({ name }: { name: string }) {
  const { style } = useStyle();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const suffix = style === "tailwind" ? "-tailwind" : "";
  const command = `npx shadcn@latest add @roiui/${name}${suffix}`;

  const handleCopy = () => copyWithToast(command, buttonRef.current);

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
  toolbar?: React.ReactNode;
};

export function BlockViewer({
  name,
  cssModulesFiles,
  tailwindFiles,
  children,
  full = false,
  toolbar,
}: BlockViewerProps) {
  const { style } = useStyle();
  const mounted = useMounted();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const files = useMemo(
    () => (style === "tailwind" ? tailwindFiles : cssModulesFiles),
    [style, tailwindFiles, cssModulesFiles]
  );

  const currentFile = useMemo(() => files.find((f) => f.path === selectedFile), [files, selectedFile]);

  const fileTree = useMemo(() => buildFileTree(files.map((f) => f.path)), [files]);

  useEffect(() => {
    if (mounted) {
      setSelectedFile(files[0]?.path ?? null);
    }
  }, [mounted, files]);

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

        {toolbar ? <div className={styles.toolbar}>{toolbar}</div> : null}

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
                <CodeBlockRoot
                  className={styles.codeBlock}
                  code={currentFile.content}
                  highlightedCode={currentFile.highlightedContent}
                >
                  <CodeBlockHeader className={styles.codeHeader}>
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
                    <CodeBlockFilename className={styles.fileName}>{currentFile.name}</CodeBlockFilename>
                    <CodeBlockActions>
                      <CodeBlockCopyButton />
                    </CodeBlockActions>
                  </CodeBlockHeader>
                  <CodeBlockContent className={styles.codeContent} />
                </CodeBlockRoot>
              ) : null}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
