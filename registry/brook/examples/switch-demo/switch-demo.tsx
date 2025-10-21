"use client";

import { useState } from "react";
import { Switch, SwitchThumb } from "@/registry/brook/ui/switch/switch";
import styles from "./switch-demo.module.css";

export default function SwitchDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div className={styles.container}>
      <Switch checked={checked} onCheckedChange={setChecked}>
        <SwitchThumb />
      </Switch>
      {/* biome-ignore lint/a11y/noLabelWithoutControl: Label is visually associated with adjacent switch */}
      <label className={styles.label}>Enable notifications</label>
    </div>
  );
}
