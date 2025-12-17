"use client";

import { Check } from "lucide-react";
import { Checkbox, CheckboxIndicator } from "@/registry/brook/ui/checkbox/checkbox";
import styles from "./checkbox-card.module.css";

export default function CheckboxCard() {
  return (
    <label className={styles.card} htmlFor="notifications">
      <Checkbox className={styles.checkbox} id="notifications">
        <CheckboxIndicator>
          <Check size={16} strokeWidth={3} />
        </CheckboxIndicator>
      </Checkbox>
      <div className={styles.content}>
        <span className={styles.title}>Enable notifications</span>
        <span className={styles.description}>You can enable or disable notifications at any time.</span>
      </div>
    </label>
  );
}
