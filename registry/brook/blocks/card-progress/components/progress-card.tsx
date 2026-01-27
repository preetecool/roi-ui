"use client";

import { AlertCircle, Check } from "lucide-react";
import { Card, CardContent } from "@/registry/brook/ui/card/card";
import styles from "./progress-card.module.css";

export type StepStatus = "pending" | "in_progress" | "complete" | "error" | "warning";

export type Step = {
  id: string;
  title: string;
  description?: string;
  status: StepStatus;
};

type StepIndicatorProps = {
  status: StepStatus;
  isFinal?: boolean;
};

function AnimatedClock({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      height="12"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
      width="12"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="12" y2="7" />
      <line className={styles.clockHand} x1="12" x2="15" y1="12" y2="13" />
    </svg>
  );
}

function getIndicatorConfig(status: StepStatus, isFinal: boolean) {
  switch (status) {
    case "complete":
      return {
        className: `${styles.spinnerToCheck} ${isFinal ? styles.finalCheck : ""}`,
        icon: "check",
      } as const;
    case "in_progress":
      return { className: styles.spinnerCircle, icon: null } as const;
    case "error":
      return { className: styles.errorCircle, icon: "error" } as const;
    case "warning":
      return { className: styles.clockCircle, icon: "clock" } as const;
    default:
      return { className: styles.pendingCircle, icon: null } as const;
  }
}

function StepIndicator({ status, isFinal = false }: StepIndicatorProps) {
  const { className, icon } = getIndicatorConfig(status, isFinal);
  const showSpinner = status === "in_progress" || status === "complete";
  const isComplete = status === "complete";

  return (
    <div className={styles.indicatorWrapper}>
      {showSpinner && (
        <div className={`${styles.spinnerCircleOverlay} ${isComplete ? styles.spinnerFading : ""}`} />
      )}
      <div className={className}>
        {icon === "clock" && <AnimatedClock className={styles.clockIcon} />}
        {icon === "check" && <Check className={styles.checkIcon} size={14} strokeWidth={3} />}
        {icon === "error" && <AlertCircle className={styles.errorIcon} size={14} strokeWidth={2.5} />}
      </div>
    </div>
  );
}

type ProgressCardProps = {
  steps: Step[];
};

export function ProgressCard({ steps = [] }: ProgressCardProps) {
  const allComplete = steps.length > 0 && steps.every((s) => s.status === "complete");

  return (
    <Card className={styles.card}>
      <CardContent className={styles.content}>
        <div className={styles.stepList}>
          {steps.map((step, index) => {
            const isHighlighted = step.status === "in_progress" || step.status === "error" || step.status === "warning";
            const showDescription = isHighlighted && step.description;
            const isFinal = index === steps.length - 1 && allComplete;

            return (
              <div className={`${styles.stepItem} ${styles[step.status]}`} key={step.id}>
                <div className={styles.stepIndicator}>
                  <StepIndicator status={step.status} isFinal={isFinal} />
                </div>
                <div className={styles.stepContent}>
                  <span
                    className={`${styles.stepTitle} ${step.status === "in_progress" ? styles.stepTitleShimmer : ""}`}
                  >
                    {step.title}
                  </span>
                  {step.description ? (
                    <div className={`${styles.descriptionWrapper} ${showDescription ? styles.descriptionVisible : ""}`}>
                      <span className={styles.stepDescription}>{step.description}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
