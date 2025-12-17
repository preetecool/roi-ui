"use client";

import Link from "next/link";
import { Badge } from "@/registry/brook/ui/badge/badge";
import styles from "./badge-external-links.module.css";

export default function BadgeExternalLinks() {
  return (
    <div className={styles.container}>
      <Link href="https://base-ui.com" rel="noopener noreferrer" target="_blank">
        <Badge>
          Base UI Documentation <span>↗</span>
        </Badge>
      </Link>
      <Link href="#" rel="noopener noreferrer" target="_blank">
        <Badge variant="secondary">
          Motion Documentation <span>↗</span>
        </Badge>
      </Link>
      <Link href="#" rel="noopener noreferrer" target="_blank">
        <Badge variant="outline">
          View on GitHub <span>↗</span>
        </Badge>
      </Link>
    </div>
  );
}
