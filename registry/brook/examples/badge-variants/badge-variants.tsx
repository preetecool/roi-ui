"use client";

import { Badge } from "@/registry/brook/ui/badge/badge";
import styles from "./badge-variants.module.css";

export default function BadgeVariants() {
  return (
    <div className={styles.container}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}
