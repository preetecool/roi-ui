"use client";

import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { Index } from "@/registry/__index__";
import styles from "./component-preview.module.css";

type ComponentPreviewClientProps = {
  name: string;
  align: "center" | "start" | "end";
  isChartComponent: boolean;
  replayButton: boolean;
};

export function ComponentPreviewClient({
  name,
  align,
  isChartComponent,
  replayButton,
}: ComponentPreviewClientProps) {
  const [key, setKey] = useState(0);
  const Component = Index[name]?.component;

  const handleReplay = () => {
    setKey((prev) => prev + 1);
  };

  if (!Component) {
    return null;
  }

  return (
    <div
      className={`${styles.preview} ${styles[align]} ${isChartComponent ? styles.chartPreview : ""}`}
    >
      <Component key={key} />
      {replayButton && (
        <button
          aria-label="Replay animation"
          className={styles.replayButton}
          onClick={handleReplay}
          type="button"
        >
          <RotateCcw size={16} />
        </button>
      )}
    </div>
  );
}
