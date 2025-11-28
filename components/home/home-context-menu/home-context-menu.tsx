"use client";

import { Copy, FileText, FolderPlus, Scissors, Trash2 } from "lucide-react";
import styles from "./home-context-menu.module.css";

export function HomeContextMenu() {
  return (
    <div className={styles.popup}>
      <div className={styles.item}>
        <span className={styles.icon}>
          <FileText size={14} />
        </span>
        New File
        <span className={styles.shortcut}>⌘N</span>
      </div>
      <div className={styles.item}>
        <span className={styles.icon}>
          <FolderPlus size={14} />
        </span>
        New Folder
        <span className={styles.shortcut}>⇧⌘N</span>
      </div>
      <div className={styles.separatorWrapper}>
        <div className={styles.separator} />
      </div>
      <div className={styles.item}>
        <span className={styles.icon}>
          <Copy size={14} />
        </span>
        Copy
        <span className={styles.shortcut}>⌘C</span>
      </div>
      <div className={styles.item}>
        <span className={styles.icon}>
          <Scissors size={14} />
        </span>
        Cut
        <span className={styles.shortcut}>⌘X</span>
      </div>
      <div className={styles.separatorWrapper}>
        <div className={styles.separator} />
      </div>
      <div className={`${styles.item} ${styles.itemDestructive}`}>
        <span className={styles.icon}>
          <Trash2 size={14} />
        </span>
        Delete
        <span className={styles.shortcut}>⌫</span>
      </div>
    </div>
  );
}
