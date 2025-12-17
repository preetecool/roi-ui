"use client";

import { Badge, BadgeIcon } from "@/registry/brook/ui/badge/badge";
import styles from "./home-animated-badge.module.css";

export function HomeAnimatedBadge() {
  return (
    <div className={styles.badgeBounce}>
      <Badge size="lg" style={{ border: "0.5px solid oklch(1 0 0 / 0.15)" }} variant="success">
        <BadgeIcon>
          <svg
            aria-hidden="true"
            className={styles.checkIcon}
            fill="none"
            height="16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 16 16"
            width="16"
          >
            <path className={styles.checkPath} d="m3 8 3 3 7-7" pathLength="1" />
          </svg>
        </BadgeIcon>
        Success
      </Badge>
    </div>
  );
}
