"use client";

import { useState } from "react";
import { Switch, SwitchThumb } from "@/registry/brook/ui/switch/switch";
import styles from "./switch-demo.module.css";

export default function SwitchDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <label className={styles.container}>
      <Switch checked={checked} onCheckedChange={setChecked}>
        <SwitchThumb />
      </Switch>
      <span className={styles.label}>Enable notifications</span>
    </label>
  );
}
