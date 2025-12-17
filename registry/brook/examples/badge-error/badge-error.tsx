"use client";

import { Badge, BadgeIcon } from "@/registry/brook/ui/badge/badge";
import styles from "./badge-error.module.css";

export default function BadgeError() {
  return (
    <div className={styles.badgeShake}>
      <Badge size="lg" variant="destructive">
        <BadgeIcon>
          <svg
            aria-hidden="true"
            fill="none"
            height="16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="16"
          >
            <circle cx="12" cy="12" r="10" />
            <path className={styles.iconPath} d="m4.9 4.9 14.2 14.2" pathLength="1" />
          </svg>
        </BadgeIcon>
        Error
      </Badge>
    </div>
  );
}
