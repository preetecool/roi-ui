import { CircleAlert } from "lucide-react";
import type { Priority } from "../types";
import styles from "./kanban.module.css";

type PriorityIconProps = {
  priority: Priority;
  className?: string;
};

export function PriorityIcon({ priority, className }: PriorityIconProps) {
  if (priority === "urgent") {
    return (
      <span aria-label="Urgent priority" className={`${styles.priorityIcon} ${className ?? ""}`} role="img">
        <CircleAlert aria-hidden="true" className={styles.priorityUrgent} size={14} />
      </span>
    );
  }

  const barCount = priority === "low" ? 1 : priority === "medium" ? 2 : 3;
  const label = `${priority.charAt(0).toUpperCase() + priority.slice(1)} priority`;

  return (
    <span aria-label={label} className={`${styles.priorityIcon} ${className ?? ""}`} role="img">
      <svg aria-hidden="true" className={styles.priorityBars} fill="currentColor" height="14" viewBox="0 0 14 14" width="14">
        {/* Bar 1 - always active */}
        <rect height="4" rx="1" width="3" x="1" y="9" />
        {/* Bar 2 */}
        <rect className={barCount < 2 ? styles.priorityInactive : undefined} height="7" rx="1" width="3" x="5.5" y="6" />
        {/* Bar 3 */}
        <rect className={barCount < 3 ? styles.priorityInactive : undefined} height="10" rx="1" width="3" x="10" y="3" />
      </svg>
    </span>
  );
}
