"use client";

import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
import styles from "./copy-button-demo.module.css";

export default function CopyButtonDemo() {
  return (
    <div className={styles.container}>
      <CopyButton className="hit-area-extend" code="You are awesome!" />
    </div>
  );
}
