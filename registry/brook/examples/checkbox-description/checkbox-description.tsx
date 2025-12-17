"use client";

import { Check } from "lucide-react";
import { Checkbox, CheckboxIndicator } from "@/registry/brook/ui/checkbox/checkbox";
import styles from "./checkbox-description.module.css";

export default function CheckboxDescription() {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <Checkbox className={styles.checkbox}>
          <CheckboxIndicator>
            <Check size={16} strokeWidth={3} />
          </CheckboxIndicator>
        </Checkbox>
        <span className={styles.title}>Accept terms and conditions</span>
      </label>
      <span className={styles.description}>You agree to our Terms of Service and Privacy Policy.</span>
    </div>
  );
}
