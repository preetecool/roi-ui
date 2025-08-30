"use client";

import { Button } from "@/registry/brook/ui/button/button";

export default function ButtonLoading() {
  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button loading={true}>Always Loading</Button>
    </div>
  );
}
