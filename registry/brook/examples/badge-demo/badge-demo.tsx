"use client";

import { Badge } from "@/registry/brook/ui/badge/badge";
import Link from "next/link";
import styles from "./badge-demo.module.css";

export default function BadgeDemo() {
  return (
    <div className={styles.container}>
      <Link href="#">
        <Badge>
          Documentation <span>↗</span>
        </Badge>
      </Link>
      <Link href="#">
        <Badge variant="secondary">
          GitHub <span>↗</span>
        </Badge>
      </Link>
    </div>
  );
}
