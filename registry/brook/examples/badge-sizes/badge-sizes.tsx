"use client";

import { Badge } from "@/registry/brook/ui/badge/badge";
import styles from "./badge-sizes.module.css";

export default function BadgeSizes() {
  return (
    <div className={styles.container}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}
