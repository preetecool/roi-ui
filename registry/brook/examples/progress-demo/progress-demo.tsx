"use client";

import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/registry/brook/ui/progress/progress";
import { useEffect, useState } from "react";
import styles from "./progress-demo.module.css";

export default function ProgressDemo() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(100, Math.round(current + Math.random() * 25));
      });
    }, 1000);
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
