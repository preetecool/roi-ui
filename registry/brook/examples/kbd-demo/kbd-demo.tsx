"use client";

import { Kbd } from "@/registry/brook/ui/kbd/kbd";
import styles from "./kbd-demo.module.css";

export default function KbdDemo() {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Kbd size="sm">K</Kbd>
        <Kbd size="md">K</Kbd>
        <Kbd size="lg">K</Kbd>
      </div>
      <div className={styles.row}>
        <Kbd>⌘</Kbd>
        <span className={styles.plus}>+</span>
        <Kbd>K</Kbd>
      </div>
    </div>
  );
}
