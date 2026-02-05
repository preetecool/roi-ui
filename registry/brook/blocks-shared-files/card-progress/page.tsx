"use client";

import { useEffect, useRef, useState } from "react";
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
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    const allComplete = steps.every((s) => s.status === "complete");

    timeoutRef.current = setTimeout(
      () => {
        if (allComplete) {
          setSteps(INITIAL_STEPS);
        } else {
          setSteps((prev) => {
            let currentIndex = -1;
            let nextPendingIndex = -1;

            for (let i = 0; i < prev.length; i++) {
              if (prev[i].status === "in_progress" && currentIndex === -1) {
                currentIndex = i;
              }
              if (prev[i].status === "pending" && nextPendingIndex === -1) {
                nextPendingIndex = i;
              }
              if (currentIndex !== -1 && nextPendingIndex !== -1) break;
            }

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
        }
      },
      allComplete ? RESET_DELAY : STEP_DELAY
    );

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [steps]);

  return <ProgressCard steps={steps} />;
}
