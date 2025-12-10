"use client";

import { Badge, BadgeIcon } from "@/registry/brook/tailwind/ui/badge";

export default function BadgeError() {
  return (
    <div className="animate-[badge-shake_0.3s_ease] will-change-transform">
      <style>
        {`
          @keyframes badge-shake {
            0%, 100% { translate: 0; }
            25% { translate: -1px 0; }
            50% { translate: 1px 0; }
            75% { translate: -1px 0; }
          }
          @keyframes icon-draw {
            from { stroke-dashoffset: 1; opacity: 0; }
            to { stroke-dashoffset: 0; opacity: 1; }
          }
        `}
      </style>
      <Badge size="lg" variant="destructive">
        <BadgeIcon>
          <svg
            aria-hidden="true"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <path
              className="animate-[icon-draw_0.4s_ease_forwards] [stroke-dasharray:1] [stroke-dashoffset:1]"
              d="m4.9 4.9 14.2 14.2"
              pathLength="1"
            />
          </svg>
        </BadgeIcon>
        Error
      </Badge>
    </div>
  );
}
