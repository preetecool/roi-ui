"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProgressCard, type Step } from "@/registry/brook/blocks/card-progress/components/progress-card";

type BlockPreviewProps = {
  name: string;
};

const blocks: Record<string, React.ComponentType> = {
  "ai-chat": dynamic(() => import("@/registry/brook/blocks/ai-chat/page")),
  "card-image-section": dynamic(() => import("@/registry/brook/blocks/card-image-section/page")),
  "card-login": dynamic(() => import("@/registry/brook/blocks/card-login/page")),
  "card-task": dynamic(() => import("@/registry/brook/blocks/card-task/page")),
  "card-traffic": dynamic(() => import("@/registry/brook/blocks/card-traffic/page")),
  "expandable-card-carousel": dynamic(() => import("@/registry/brook/blocks/expandable-card-carousel/page")),
  "kanban-board": dynamic(() => import("@/registry/brook/blocks/kanban-board/page")),
  "pricing-section": dynamic(() => import("@/registry/brook/blocks/pricing-section/page")),
};

export function BlockPreview({ name }: BlockPreviewProps) {
  const Component = blocks[name];

  if (!Component) {
    return <div>Component not found</div>;
  }

  return <Component />;
}

const INITIAL_STEPS: Step[] = [
  { id: "1", title: "Verifying wallet", status: "in_progress" },
  { id: "2", title: "Processing transaction", description: "0.0421 ETH to 0x7a2...f3b1", status: "pending" },
  { id: "3", title: "Confirming on network", description: "Waiting for 2 confirmations", status: "pending" },
  { id: "4", title: "Complete", status: "pending" },
];

const STEP_DELAY = 1000;
const RESET_DELAY = 3000;

type CardProgressBlockViewerProps = {
  blockViewerProps: {
    name: string;
    cssModulesFiles: Array<{ name: string; path: string; content: string; highlightedContent: string }>;
    tailwindFiles: Array<{ name: string; path: string; content: string; highlightedContent: string }>;
    full?: boolean;
  };
  BlockViewerComponent: React.ComponentType<{
    name: string;
    cssModulesFiles: Array<{ name: string; path: string; content: string; highlightedContent: string }>;
    tailwindFiles: Array<{ name: string; path: string; content: string; highlightedContent: string }>;
    children: React.ReactNode;
    full?: boolean;
    toolbar?: React.ReactNode;
  }>;
};

export function CardProgressBlockViewer({ blockViewerProps, BlockViewerComponent }: CardProgressBlockViewerProps) {
  const [steps, setSteps] = useState<Step[]>(INITIAL_STEPS);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const allComplete = steps.every((s) => s.status === "complete");

  const advanceSteps = useCallback(() => {
    setSteps((prev) => {
      const currentIndex = prev.findIndex((s) => s.status === "in_progress");
      const nextPendingIndex = prev.findIndex((s) => s.status === "pending");

      if (currentIndex === -1 && nextPendingIndex !== -1) {
        return prev.map((s, i) => (i === nextPendingIndex ? { ...s, status: "in_progress" } : s));
      }

      if (currentIndex !== -1) {
        return prev.map((s, i) => {
          if (i === currentIndex) return { ...s, status: "complete" };
          if (i === currentIndex + 1 && s.status === "pending") return { ...s, status: "in_progress" };
          return s;
        });
      }

      return prev;
    });
  }, []);

  useEffect(() => {
    if (allComplete) {
      setIsComplete(true);
      return;
    }

    timeoutRef.current = setTimeout(advanceSteps, STEP_DELAY);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [allComplete, advanceSteps]);

  useEffect(() => {
    if (isComplete) {
      timeoutRef.current = setTimeout(() => {
        setSteps(INITIAL_STEPS);
        setIsComplete(false);
      }, RESET_DELAY);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [isComplete]);

  return (
    <BlockViewerComponent {...blockViewerProps}>
      <ProgressCard steps={steps} />
    </BlockViewerComponent>
  );
}
