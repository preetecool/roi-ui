"use client";

import { RotateCcw } from "lucide-react";
import styles from "./replay-button.module.css";

type ReplayButtonProps = {
  onReplay?: () => void;
};

export function ReplayButton({ onReplay }: ReplayButtonProps) {
  const handleReplay = () => {
    if (onReplay) {
      onReplay();
    } else {
      window.location.reload();
    }
  };

  return (
    <button
      type="button"
      aria-label="Replay animation"
      className={styles.replayButton}
      onClick={handleReplay}
    >
      <RotateCcw size={16} />
    </button>
  );
}
