"use client";

import { Badge } from "@/registry/brook/ui/badge/badge";
import Link from "next/link";
import styles from "./badge-demo.module.css";

export default function BadgeDemo() {
  return (
    <div className={styles.container}>
      <Link href="https://base-ui.com" target="_blank" rel="noopener noreferrer">
        <Badge>
          Documentation <span>↗</span>
        </Badge>
      </Link>
      <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
        <Badge variant="secondary">
          GitHub <span>↗</span>
        </Badge>
      </Link>
    </div>
  );
}
