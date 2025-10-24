"use client";

import { Badge } from "@/registry/brook/ui/badge/badge";
import styles from "./badge-demo.module.css";

export default function BadgeDemo() {
  return (
    <div className={styles.container}>
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  );
}
