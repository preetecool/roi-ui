"use client";

import { Badge } from "@/registry/brook/ui/badge/badge";
import Link from "next/link";
import styles from "./badge-external-links.module.css";

export default function BadgeExternalLinks() {
  return (
    <div className={styles.container}>
      <Link href="https://base-ui.com" target="_blank" rel="noopener noreferrer">
        <Badge>
          Base UI Documentation <span>↗</span>
        </Badge>
      </Link>
      <Link href="#" target="_blank" rel="noopener noreferrer">
        <Badge variant="secondary">
          Motion Documentation <span>↗</span>
        </Badge>
      </Link>
      <Link href="#" target="_blank" rel="noopener noreferrer">
        <Badge variant="outline">
          View on GitHub <span>↗</span>
        </Badge>
      </Link>
    </div>
  );
}
