"use client";

import { Switch, SwitchThumb } from "@/registry/brook/ui/switch/switch";
import { useState } from "react";
import styles from "./switch-demo.module.css";

export default function SwitchDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div className={styles.container}>
      <Switch checked={checked} onCheckedChange={setChecked}>
        <SwitchThumb />
      </Switch>
      <label className={styles.label}>Enable notifications</label>
    </div>
  );
}
