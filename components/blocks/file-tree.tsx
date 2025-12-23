"use client";

import { ChevronRight, File, Folder, FolderOpen } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./file-tree.module.css";

export type FileNode = {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: FileNode[];
};

type FileTreeProps = {
  files: FileNode[];
  selectedPath: string | null;
  onSelect: (path: string) => void;
};

export function FileTree({ files, selectedPath, onSelect }: FileTreeProps) {
  return (
    <div className={styles.tree}>
      {files.map((node) => (
        <FileTreeNode key={node.path} node={node} onSelect={onSelect} selectedPath={selectedPath} />
      ))}
    </div>
  );
}

type FileTreeNodeProps = {
  node: FileNode;
  selectedPath: string | null;
  onSelect: (path: string) => void;
  depth?: number;
};

function FileTreeNode({ node, selectedPath, onSelect, depth = 0 }: FileTreeNodeProps) {
  const [isOpen, setIsOpen] = useState(true);
  const isSelected = selectedPath === node.path;
  const hasChildren = node.children && node.children.length > 0;

  const handleClick = () => {
    if (node.type === "folder") {
      setIsOpen(!isOpen);
    } else {
      onSelect(node.path);
    }
  };

  return (
    <div className={styles.node}>
      <button
        className={cn(styles.nodeButton, isSelected && styles.selected)}
        onClick={handleClick}
        style={{ paddingLeft: depth * 12 + 8 }}
        type="button"
      >
        {node.type === "folder" ? (
          <ChevronRight className={cn(styles.chevron, isOpen && styles.chevronOpen)} size={14} />
        ) : (
          <span className={styles.spacer} />
        )}
        {node.type === "folder" ? (
          isOpen ? (
            <FolderOpen className={styles.icon} size={16} />
          ) : (
            <Folder className={styles.icon} size={16} />
          )
        ) : (
          <File className={styles.icon} size={16} />
        )}
        <span className={styles.name}>{node.name}</span>
      </button>
      {hasChildren && isOpen && (
        <div className={styles.children}>
          {node.children!.map((child) => (
            <FileTreeNode
              depth={depth + 1}
              key={child.path}
              node={child}
              onSelect={onSelect}
              selectedPath={selectedPath}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function buildFileTree(filePaths: string[]): FileNode[] {
  const root: FileNode[] = [];

  for (const filePath of filePaths) {
    const parts = filePath.split("/");
    let currentLevel = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;
      const currentPath = parts.slice(0, i + 1).join("/");

      let existing = currentLevel.find((node) => node.name === part);

      if (!existing) {
        existing = {
          name: part,
          path: currentPath,
          type: isFile ? "file" : "folder",
          children: isFile ? undefined : [],
        };
        currentLevel.push(existing);
      }

      if (!isFile && existing.children) {
        currentLevel = existing.children;
      }
    }
  }

  return root;
}
