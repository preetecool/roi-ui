"use client";

import { useEffect, useState } from "react";
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/registry/brook/tailwind/ui/progress";

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
    <Progress className="w-full max-w-96" value={progress}>
      <div className="flex items-center justify-between">
        <ProgressLabel>Loading</ProgressLabel>
        <ProgressValue />
      </div>
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </Progress>
  );
}
