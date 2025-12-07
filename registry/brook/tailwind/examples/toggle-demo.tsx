"use client";

import { Toggle } from "@/registry/brook/tailwind/ui/toggle";

function UnlockIcon() {
  return (
    <svg
      fill="none"
      height="16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      fill="none"
      height="16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function ToggleDemo() {
  return (
    <div className="rounded-lg border border-[oklch(from_var(--border)_l_c_h_/_0.5)] p-0.5">
      <Toggle
        aria-label="Toggle lock"
        render={(props, state) => {
          if (state.pressed) {
            return (
              <button type="button" {...props}>
                <LockIcon />
              </button>
            );
          }

          return (
            <button type="button" {...props}>
              <UnlockIcon />
            </button>
          );
        }}
      />
    </div>
  );
}
