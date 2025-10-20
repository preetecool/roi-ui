"use client";

import {
  Checkbox,
  CheckboxIndicator,
} from "@/registry/brook/ui/checkbox/checkbox";
import { Check } from "lucide-react";
import styles from "./checkbox-demo.module.css";

export default function CheckboxDemo() {
  return (
    <label className={styles.label}>
      <Checkbox>
        <CheckboxIndicator>
          <Check size={16} strokeWidth={3} />
        </CheckboxIndicator>
      </Checkbox>
      <span className={styles.text}>Accept terms and conditions</span>
    </label>
  );
}
