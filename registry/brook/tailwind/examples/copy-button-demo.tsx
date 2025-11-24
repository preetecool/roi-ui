"use client";

import { CopyButton } from "@/registry/brook/tailwind/ui/copy-button";

export default function CopyButtonDemo() {
  return (
    <div className="rounded-[8px] border border-[oklch(from_var(--border)_l_c_h_/_0.5)] p-0.5">
      <CopyButton className="hit-area-extend" code="You are awesome!" />
    </div>
  );
}
