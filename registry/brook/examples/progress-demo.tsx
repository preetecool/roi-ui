"use client";

import { useState, useEffect } from "react";
import {
  Progress,
  ProgressLabel,
  ProgressTrack,
  ProgressIndicator,
  ProgressValue,
} from "@/registry/brook/ui/progress/progress";

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
    <Progress value={progress} style={{ width: "100%", maxWidth: "24rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <ProgressLabel>Loading</ProgressLabel>
        <ProgressValue />
      </div>
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </Progress>
  );
}