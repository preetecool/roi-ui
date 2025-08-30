"use client";

import { useState } from "react";
import { Switch, SwitchThumb } from "@/registry/brook/ui/switch/switch";

export default function SwitchDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <Switch checked={checked} onCheckedChange={setChecked}>
        <SwitchThumb />
      </Switch>
      <label style={{ fontSize: "0.875rem", color: "var(--foreground)" }}>Enable notifications</label>
    </div>
  );
}
