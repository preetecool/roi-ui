"use client";

import { EnterArrowIcon } from "@/registry/brook/ui/arrow-icon/arrow-icon";
import { Kbd } from "@/registry/brook/ui/kbd/kbd";
import styles from "./search.module.css";

export function SearchFooter() {
  return (
    <div className={styles.commandFooter}>
      <div className={styles.commandFooterItem}>
        <Kbd className={styles.commandFooterKbd} size="md">
          <EnterArrowIcon />
        </Kbd>
        <span className={styles.commandFooterText}>Go to page</span>
      </div>
    </div>
  );
}
