"use client";

import { Badge } from "@/registry/brook/ui/badge/badge";

export default function BadgeSizes() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}
