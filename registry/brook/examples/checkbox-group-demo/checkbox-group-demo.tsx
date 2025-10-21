"use client";

import { Check } from "lucide-react";
import {
  Checkbox,
  CheckboxIndicator,
} from "@/registry/brook/ui/checkbox/checkbox";
import { CheckboxGroup } from "@/registry/brook/ui/checkbox-group/checkbox-group";
import styles from "./checkbox-group-demo.module.css";

export default function CheckboxGroupDemo() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Select your interests</div>

      <CheckboxGroup defaultValue={["design"]}>
        <div className={styles.label}>
          <Checkbox name="interests" value="design">
            <CheckboxIndicator>
              <Check size={16} strokeWidth={3} />
            </CheckboxIndicator>
          </Checkbox>
          <span className={styles.text}>Design</span>
        </div>

        <div className={styles.label}>
          <Checkbox name="interests" value="development">
            <CheckboxIndicator>
              <Check size={16} strokeWidth={3} />
            </CheckboxIndicator>
          </Checkbox>
          <span className={styles.text}>Development</span>
        </div>

        <div className={styles.labelLast}>
          <Checkbox name="interests" value="marketing">
            <CheckboxIndicator>
              <Check size={16} strokeWidth={3} />
            </CheckboxIndicator>
          </Checkbox>
          <span className={styles.text}>Marketing</span>
        </div>
      </CheckboxGroup>
    </div>
  );
}
