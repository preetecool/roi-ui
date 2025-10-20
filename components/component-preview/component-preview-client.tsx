"use client";

import type React from "react";
import { useState } from "react";
import { ReplayButton } from "./replay-button";

type ComponentPreviewClientProps = {
  Component: React.ComponentType;
  align: "center" | "start" | "end";
  replayButton?: boolean;
  isChartComponent?: boolean;
  className: string;
};

export function ComponentPreviewClient({
  Component,
  replayButton = false,
  className,
}: ComponentPreviewClientProps) {
  const [key, setKey] = useState(0);

  const handleReplay = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className={className}>
      <Component key={key} />
      {replayButton && <ReplayButton onReplay={handleReplay} />}
    </div>
  );
}
