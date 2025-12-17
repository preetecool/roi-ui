"use client";

import { useEffect, useState } from "react";
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/registry/brook/ui/progress/progress";
import styles from "./progress-demo.module.css";

const MAX_PROGRESS = 100;
const MAX_INCREMENT = 25;
const UPDATE_INTERVAL_MS = 1000;

export default function ProgressDemo() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((current) => {
        if (current >= MAX_PROGRESS) {
          clearInterval(interval);
          return MAX_PROGRESS;
        }
        return Math.min(MAX_PROGRESS, Math.round(current + Math.random() * MAX_INCREMENT));
      });
    }, UPDATE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <Progress className={styles.progress} value={progress}>
      <div className={styles.progressHeader}>
        <ProgressLabel>Loading</ProgressLabel>
        <ProgressValue />
      </div>
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </Progress>
  );
}
