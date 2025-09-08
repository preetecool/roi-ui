"use client";

import React from "react";
import { RotateCcw } from "lucide-react";
import styles from "./replay-button.module.css";

interface ReplayButtonProps {
  onReplay?: () => void;
}

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
      onClick={handleReplay}
      className={styles.replayButton}
      aria-label="Replay animation"
    >
      <RotateCcw size={16} />
    </button>
  );
}