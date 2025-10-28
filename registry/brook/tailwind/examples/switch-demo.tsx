"use client";

import { useState } from "react";
import { Switch, SwitchThumb } from "@/registry/brook/tailwind/ui/switch";

export default function SwitchDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <Switch checked={checked} onCheckedChange={setChecked}>
        <SwitchThumb />
      </Switch>
      {/* biome-ignore lint/a11y/noLabelWithoutControl: Label is visually associated with adjacent switch */}
      <label className="text-foreground text-sm">Enable notifications</label>
    </div>
  );
}
