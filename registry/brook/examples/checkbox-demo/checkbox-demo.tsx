"use client";

import { Check } from "lucide-react";
import {
  Checkbox,
  CheckboxIndicator,
} from "@/registry/brook/ui/checkbox/checkbox";
import styles from "./checkbox-demo.module.css";

export default function CheckboxDemo() {
  return (
    <label className={styles.label} htmlFor="terms">
      <Checkbox id="terms">
        <CheckboxIndicator>
          <Check size={16} strokeWidth={3} />
        </CheckboxIndicator>
      </Checkbox>
      <span className={styles.text}>Accept terms and conditions</span>
    </label>
  );
}
