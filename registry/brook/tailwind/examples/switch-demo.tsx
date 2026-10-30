"use client";

import { useState } from "react";
import { Switch, SwitchThumb } from "@/registry/brook/tailwind/ui/switch";

export default function SwitchDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <label className="flex items-center gap-3">
      <Switch checked={checked} onCheckedChange={setChecked}>
        <SwitchThumb />
      </Switch>
      <span className="text-foreground text-sm">Enable notifications</span>
    </label>
  );
}
