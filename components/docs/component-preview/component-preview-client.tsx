"use client";

import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useStyle } from "@/components/providers/style-provider";
import { cn } from "@/lib/utils";
import { Index } from "@/registry/__index__";
import { ComponentLoaders } from "@/registry/__loaders__";
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
  const [mounted, setMounted] = useState(false);
  const { style } = useStyle();

  useEffect(() => {
    setMounted(true);
  }, []);

  const componentName =
    style === "tailwind" && Index[`${name}-tailwind`]
      ? `${name}-tailwind`
      : name;

  // Dynamically load component from loaders (separate bundle chunk)
  const Component = ComponentLoaders[componentName];

  const handleReplay = () => {
    setKey((prev) => prev + 1);
  };

  if (!mounted || !Component) {
    return (
      <div
        className={cn(
          styles.preview,
          styles[align],
          isChartComponent && styles.chartPreview
        )}
        data-align={align}
      />
    );
  }

  return (
    <div
      className={cn(
        styles.preview,
        styles.proseReset,
        isChartComponent && styles.chartPreview
      )}
      data-align={align}
      data-demo={style}
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
