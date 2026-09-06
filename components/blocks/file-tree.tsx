"use client";

import { ChevronRight, File, Folder, FolderOpen } from "lucide-react";
import { memo, useState } from "react";
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
    <nav aria-label="Source files" className={styles.tree}>
      <ul className={styles.list}>
        {files.map((node) => (
          <FileTreeNode key={node.path} node={node} onSelect={onSelect} selectedPath={selectedPath} />
        ))}
      </ul>
    </nav>
  );
}

type FileTreeNodeProps = {
  node: FileNode;
  selectedPath: string | null;
  onSelect: (path: string) => void;
  depth?: number;
};

function getNodeIcon(type: "file" | "folder", isOpen: boolean) {
  if (type === "file") {
    return <File className={styles.icon} size={16} />;
  }
  return isOpen ? <FolderOpen className={styles.icon} size={16} /> : <Folder className={styles.icon} size={16} />;
}

const FileTreeNode = memo(function SourceFileNode({ node, selectedPath, onSelect, depth = 0 }: FileTreeNodeProps) {
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

  const isFolder = node.type === "folder";

  const showChildren = Boolean(hasChildren) && isOpen;

  return (
    <li className={styles.node}>
      <button
        {...(isFolder ? { "aria-expanded": isOpen } : {})}
        aria-current={isSelected}
        className={cn(styles.nodeButton, isSelected ? styles.selected : null)}
        onClick={handleClick}
        style={{ paddingLeft: depth * 12 + 8 }}
        type="button"
      >
        {isFolder ? (
          <ChevronRight className={cn(styles.chevron, isOpen ? styles.chevronOpen : null)} size={14} />
        ) : (
          <span className={styles.spacer} />
        )}
        {getNodeIcon(node.type, isOpen)}
        <span className={styles.name}>{node.name}</span>
      </button>
      {showChildren ? (
        <ul className={cn(styles.children, styles.list)}>
          {node.children?.map((child) => (
            <FileTreeNode
              depth={depth + 1}
              key={child.path}
              node={child}
              onSelect={onSelect}
              selectedPath={selectedPath}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
});

function findOrCreateNode(level: FileNode[], name: string, path: string, isFile: boolean): FileNode {
  const existing = level.find((node) => node.name === name);
  if (existing) {
    return existing;
  }

  const newNode: FileNode = {
    name,
    path,
    type: isFile ? "file" : "folder",
    children: isFile ? undefined : [],
  };
  level.push(newNode);
  return newNode;
}

function addPathToTree(root: FileNode[], filePath: string): void {
  const parts = filePath.split("/");
  let currentLevel = root;

  for (let i = 0; i < parts.length; i++) {
    const isFile = i === parts.length - 1;
    const currentPath = parts.slice(0, i + 1).join("/");
    const node = findOrCreateNode(currentLevel, parts[i], currentPath, isFile);

    if (!isFile && node.children) {
      currentLevel = node.children;
    }
  }
}

export function buildFileTree(filePaths: string[]): FileNode[] {
  const root: FileNode[] = [];
  for (const filePath of filePaths) {
    addPathToTree(root, filePath);
  }
  return root;
}
