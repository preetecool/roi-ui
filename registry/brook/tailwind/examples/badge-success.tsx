"use client";

import { Badge, BadgeIcon } from "@/registry/brook/tailwind/ui/badge";

export default function BadgeSuccess() {
  return (
    <div className="animate-[badge-bounce_0.4s_ease] will-change-transform [--badge-bounce:_scale(0.96)_scale(1.04)_scale(1)]">
      <style>
        {`
          @keyframes badge-bounce {
            0% { scale: 0.96; }
            60% { scale: 1.04; }
            100% { scale: 1; }
          }
          @keyframes check-draw {
            from { stroke-dashoffset: 1; opacity: 0; }
            to { stroke-dashoffset: 0; opacity: 1; }
          }
        `}
      </style>
      <Badge size="lg" variant="success">
        <BadgeIcon>
          <svg
            aria-hidden="true"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 16 16"
          >
            <path
              className="animate-[check-draw_0.4s_ease_forwards] [stroke-dasharray:1] [stroke-dashoffset:1]"
              d="m3 8 3 3 7-7"
              pathLength="1"
            />
          </svg>
        </BadgeIcon>
        Success
      </Badge>
    </div>
  );
}
