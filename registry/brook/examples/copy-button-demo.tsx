"use client";

import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";

export default function CopyButtonDemo() {
  return (
    <div>
      <CopyButton className="header-copy-button" code="You are awesome!" />
    </div>
  );
}
