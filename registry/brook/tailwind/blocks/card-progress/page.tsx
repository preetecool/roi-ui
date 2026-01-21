"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ProgressCard, Step } from "./components/progress-card";

const INITIAL_STEPS: Step[] = [
  { id: "1", title: "Verifying wallet", status: "in_progress" },
  { id: "2", title: "Processing transaction", description: "0.0421 ETH to 0x7a2...f3b1", status: "pending" },
  { id: "3", title: "Confirming on network", description: "Waiting for 2 confirmations", status: "pending" },
  { id: "4", title: "Complete", status: "pending" },
];

const STEP_DELAY = 1000;
const RESET_DELAY = 3000;

export default function Page() {
  const [steps, setSteps] = useState<Step[]>(INITIAL_STEPS);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

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
    return () => clearTimeout(timeoutRef.current);
  }, [allComplete, advanceSteps, steps]);

  useEffect(() => {
    if (isComplete) {
      timeoutRef.current = setTimeout(() => {
        setSteps(INITIAL_STEPS);
        setIsComplete(false);
      }, RESET_DELAY);
      return () => clearTimeout(timeoutRef.current);
    }
  }, [isComplete]);

  return <ProgressCard steps={steps} />;
}
