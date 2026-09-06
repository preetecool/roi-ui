"use client";

import { useMemo, useRef, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/brook/ui/tabs/tabs";
import styles from "./block-viewer.module.css";
import { resolveSelectedFile } from "./file-selection";
import { buildFileTree, FileTree } from "./file-tree";
import { useBlockSource } from "./use-block-source";

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
  kind: "installed" | "usage";
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
  const [tab, setTab] = useState("preview");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const files = useMemo(
    () => (style === "tailwind" ? tailwindFiles : cssModulesFiles),
    [style, tailwindFiles, cssModulesFiles]
  );

  const currentFile = useMemo(() => resolveSelectedFile(files, selectedFile), [files, selectedFile]);

  const fileTree = useMemo(() => buildFileTree(files.map((f) => f.path)), [files]);

  const { source, error, retry } = useBlockSource(name, style, currentFile?.path, tab === "code");

  return (
    <div className={styles.viewer}>
      <Tabs className={styles.tabs} onValueChange={setTab} value={tab}>
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
              <FileTree files={fileTree} onSelect={setSelectedFile} selectedPath={currentFile?.path ?? null} />
            </div>
            <div className={styles.codeArea}>
              {currentFile ? (
                <CodeBlockRoot
                  className={styles.codeBlock}
                  code={source?.content ?? ""}
                  highlightedCode={source?.highlightedContent ?? ""}
                >
                  <CodeBlockHeader className={styles.codeHeader}>
                    <select
                      aria-label="Select file"
                      className={styles.mobileFileSelect}
                      onChange={(e) => setSelectedFile(e.target.value)}
                      value={currentFile.path}
                    >
                      {files.map((file) => (
                        <option key={file.path} value={file.path}>
                          {file.path}
                          {file.kind === "usage" ? " (usage, not installed)" : ""}
                        </option>
                      ))}
                    </select>
                    <CodeBlockFilename className={styles.fileName}>
                      {currentFile.name} ·{" "}
                      {currentFile.kind === "usage" ? "Usage example · not installed" : "Installed source"}
                    </CodeBlockFilename>
                    <CodeBlockActions>{source ? <CodeBlockCopyButton /> : null}</CodeBlockActions>
                  </CodeBlockHeader>
                  <SourceContent error={error} ready={Boolean(source)} retry={retry} />
                </CodeBlockRoot>
              ) : null}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SourceContent({ error, ready, retry }: { error: boolean; ready: boolean; retry: () => void }) {
  if (error) {
    return (
      <div role="alert">
        Could not load this file.{" "}
        <button onClick={retry} type="button">
          Retry
        </button>
      </div>
    );
  }
  if (ready) {
    return <CodeBlockContent className={styles.codeContent} />;
  }
  return <output>Loading source…</output>;
}
