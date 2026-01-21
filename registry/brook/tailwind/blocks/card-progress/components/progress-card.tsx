"use client";

import { AlertCircle, Check } from "lucide-react";
import { Card, CardContent } from "@/registry/brook/tailwind/ui/card";

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
      <line x1="12" y1="12" x2="12" y2="7" />
      <line className="animate-[spin_2s_linear_infinite]" style={{ transformOrigin: "12px 12px" }} x1="12" y1="12" x2="15" y2="13" />
    </svg>
  );
}

const BASE_CLASSES = "relative z-[1] flex h-5 w-5 items-center justify-center rounded-full";

function getIndicatorConfig(status: StepStatus, isFinal: boolean) {
  switch (status) {
    case "complete":
      return {
        className: `${BASE_CLASSES} animate-[circle-reveal_0.2s_cubic-bezier(0.165,0.84,0.44,1)_forwards] ${
          isFinal ? "bg-[var(--success)]" : "bg-[var(--foreground)]"
        }`,
        icon: "check",
        iconClassName: "opacity-0 animate-[icon-pop_0.15s_cubic-bezier(0.165,0.84,0.44,1)_0.05s_forwards] text-[var(--background)]",
      } as const;
    case "in_progress":
      return {
        className: `${BASE_CLASSES} animate-spin border-2 border-[var(--border)] border-t-[var(--foreground)] bg-[var(--card)]`,
        icon: null,
        iconClassName: null,
      } as const;
    case "error":
      return {
        className: `${BASE_CLASSES} bg-[var(--destructive)]`,
        icon: "error",
        iconClassName: "text-[var(--destructive-foreground)]",
      } as const;
    case "warning":
      return {
        className: `${BASE_CLASSES} bg-[var(--warning)]`,
        icon: "clock",
        iconClassName: "text-[var(--warning-foreground)]",
      } as const;
    default:
      return {
        className: `${BASE_CLASSES} border-2 border-[var(--border)] bg-[var(--card)]`,
        icon: null,
        iconClassName: null,
      } as const;
  }
}

function StepIndicator({ status, isFinal = false }: StepIndicatorProps) {
  const { className, icon, iconClassName } = getIndicatorConfig(status, isFinal);

  return (
    <div className={className}>
      {icon === "clock" && <AnimatedClock className={iconClassName!} />}
      {icon === "check" && <Check className={iconClassName!} size={14} strokeWidth={3} />}
      {icon === "error" && <AlertCircle className={iconClassName!} size={14} strokeWidth={2.5} />}
    </div>
  );
}

function getTitleClassName(status: StepStatus) {
  switch (status) {
    case "error":
      return "text-[var(--destructive)]";
    case "warning":
      return "text-[var(--warning)]";
    case "complete":
      return "text-[oklch(from_var(--foreground)_l_c_h_/_0.5)]";
    default:
      return "text-[var(--muted-foreground)]";
  }
}

type ProgressCardProps = {
  steps: Step[];
};

export function ProgressCard({ steps = [] }: ProgressCardProps) {
  const allComplete = steps.length > 0 && steps.every((s) => s.status === "complete");

  return (
    <Card className="w-full max-w-[320px] bg-[oklch(from_var(--card)_l_c_h_/_0.6)] p-4 shadow-[0_0_0_1px_oklch(from_var(--border)_l_c_h_/_0.5),0_1px_3px_0_#0000000d,0_1px_2px_-1px_#0000000d]">
      <CardContent className="flex flex-col p-0">
        <div className="flex flex-col gap-1">
          {steps.map((step, index) => {
            const isHighlighted = step.status === "in_progress" || step.status === "error" || step.status === "warning";
            const showDescription = isHighlighted && step.description;
            const isFinal = index === steps.length - 1 && allComplete;
            const isLastStep = index === steps.length - 1;

            return (
              <div
                key={step.id}
                className="relative flex items-start gap-3 rounded-[var(--radius)] p-3 transition-colors duration-200"
              >
                {!isLastStep && (
                  <div
                    className={`absolute left-[23px] top-9 h-[calc(100%-16px)] w-px transition-colors duration-200 ${
                      step.status === "complete" ? "bg-[var(--foreground)]" : "bg-[var(--border)]"
                    }`}
                  />
                )}

                <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                  <StepIndicator status={step.status} isFinal={isFinal} />
                </div>

                <div className="flex min-h-6 flex-col gap-0.5 pt-0.5">
                  <span
                    className={`text-[0.9375rem] font-medium transition-colors duration-200 ${getTitleClassName(step.status)} ${
                      step.status === "in_progress"
                        ? "animate-shimmer bg-[length:200%_100%] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] bg-[linear-gradient(90deg,var(--muted-foreground)_0%,var(--muted-foreground)_40%,color-mix(in_oklch,var(--foreground)_50%,var(--muted-foreground))_50%,var(--muted-foreground)_60%,var(--muted-foreground)_100%)]"
                        : ""
                    }`}
                  >
                    {step.title}
                  </span>
                  {step.description && (
                    <div
                      className={`grid transition-all duration-250 ease-out ${
                        showDescription ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <span className={`overflow-hidden text-[0.8125rem] ${step.status === "error" ? "text-[var(--destructive-foreground)]" : "text-[var(--muted-foreground)]"}`}>
                        {step.description}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
