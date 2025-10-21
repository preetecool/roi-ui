"use client";

import { Check } from "lucide-react";
import {
  Checkbox,
  CheckboxIndicator,
} from "@/registry/brook/ui/checkbox/checkbox";
import styles from "./checkbox-demo.module.css";

export default function CheckboxDemo() {
  return (
    <div className={styles.label}>
      <Checkbox>
        <CheckboxIndicator>
          <Check size={16} strokeWidth={3} />
        </CheckboxIndicator>
      </Checkbox>
      <span className={styles.text}>Accept terms and conditions</span>
    </div>
  );
}
