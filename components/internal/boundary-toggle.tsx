"use client";

import { Droplets, Layers, Square } from "lucide-react";
import type { ReactNode } from "react";

import type { BoundaryMode } from "./boundary-provider";
import { useBoundaryMode } from "./boundary-provider";
import styles from "./boundary-toggle.module.css";

const modes: { icon: ReactNode; label: string; mode: BoundaryMode }[] = [
  {
    icon: <Square className={styles.icon} />,
    label: "Off",
    mode: "off",
  },
  {
    icon: <Droplets className={styles.icon} />,
    label: "Hydration",
    mode: "hydration",
  },
  {
    icon: <Layers className={styles.icon} />,
    label: "Rendering",
    mode: "rendering",
  },
];

export default function BoundaryToggle() {
  const { mode, setMode } = useBoundaryMode();

  return (
    <div className={styles.container}>
      <div className={styles.toggleGroup}>
        {modes.map(({ icon, label, mode: modeOption }) => {
          const isActive = mode === modeOption;

          return (
            <button
              className={`${styles.button} ${isActive ? styles.buttonActive : styles.buttonInactive}`}
              key={modeOption}
              onClick={() => setMode(modeOption)}
              title={`Switch to ${label} boundaries`}
              type="button"
            >
              {icon}
              <span className={styles.label}>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
