"use client";

import { cn } from "@/lib/utils";
import { Toolbar, ToolbarButton, ToolbarGroup } from "@/registry/brook/ui/toolbar/toolbar";
import styles from "./status-bar.module.css";

export type BlockStatus = "success" | "warning" | "error";

type StatusOption = {
  value: BlockStatus;
  label: string;
};

const statusOptions: StatusOption[] = [
  { value: "success", label: "Success" },
  { value: "warning", label: "Pending" },
  { value: "error", label: "Error" },
];

type StatusBarProps = {
  status: BlockStatus;
  onStatusChange: (status: BlockStatus) => void;
};

export function StatusBar({ status, onStatusChange }: StatusBarProps) {
  return (
    <Toolbar className={styles.toolbar}>
      <ToolbarGroup>
        {statusOptions.map((option) => (
          <ToolbarButton
            key={option.value}
            className={cn(styles.statusButton, styles[option.value])}
            onClick={() => onStatusChange(option.value)}
            aria-pressed={status === option.value}
            data-state={status === option.value ? "pressed" : undefined}
          >
            <span className={styles.statusCircle} />
            <span className={styles.statusLabel}>{option.label}</span>
          </ToolbarButton>
        ))}
      </ToolbarGroup>
    </Toolbar>
  );
}
