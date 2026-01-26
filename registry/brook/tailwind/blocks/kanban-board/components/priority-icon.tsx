import { CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils-tailwind";
import type { Priority } from "../types";

type PriorityIconProps = {
  priority: Priority;
  className?: string;
};

export function PriorityIcon({ priority, className }: PriorityIconProps) {
  if (priority === "urgent") {
    return (
      <span
        aria-label="Urgent priority"
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-[calc(var(--radius)-2px)] bg-transparent shadow-[inset_0_0_0_1px_var(--border-subtle-light)]",
          className
        )}
        role="img"
      >
        <CircleAlert aria-hidden="true" className="text-[var(--urgent)]" size={14} />
      </span>
    );
  }

  const barCount = priority === "low" ? 1 : priority === "medium" ? 2 : 3;
  const label = `${priority.charAt(0).toUpperCase() + priority.slice(1)} priority`;

  return (
    <span
      aria-label={label}
      className={cn(
        "flex h-6 w-6 shrink-0 items-center justify-center rounded-[calc(var(--radius)-2px)] bg-transparent shadow-[inset_0_0_0_1px_var(--border-subtle-light)]",
        className
      )}
      role="img"
    >
      <svg
        aria-hidden="true"
        className="text-muted-foreground"
        fill="currentColor"
        height="14"
        viewBox="0 0 14 14"
        width="14"
      >
        {/* Bar 1 - always active */}
        <rect height="4" rx="1" width="3" x="1" y="9" />
        {/* Bar 2 */}
        <rect
          className={barCount < 2 ? "fill-[oklch(from_var(--muted-foreground)_l_c_h_/_0.3)]" : undefined}
          height="7"
          rx="1"
          width="3"
          x="5.5"
          y="6"
        />
        {/* Bar 3 */}
        <rect
          className={barCount < 3 ? "fill-[oklch(from_var(--muted-foreground)_l_c_h_/_0.3)]" : undefined}
          height="10"
          rx="1"
          width="3"
          x="10"
          y="3"
        />
      </svg>
    </span>
  );
}
