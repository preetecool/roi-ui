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
        <label className={styles.label} htmlFor="design">
          <Checkbox id="design" name="interests" value="design">
            <CheckboxIndicator>
              <Check size={16} strokeWidth={3} />
            </CheckboxIndicator>
          </Checkbox>
          <span className={styles.text}>Design</span>
        </label>

        <label className={styles.label} htmlFor="development">
          <Checkbox id="development" name="interests" value="development">
            <CheckboxIndicator>
              <Check size={16} strokeWidth={3} />
            </CheckboxIndicator>
          </Checkbox>
          <span className={styles.text}>Development</span>
        </label>

        <label className={styles.labelLast} htmlFor="marketing">
          <Checkbox id="marketing" name="interests" value="marketing">
            <CheckboxIndicator>
              <Check size={16} strokeWidth={3} />
            </CheckboxIndicator>
          </Checkbox>
          <span className={styles.text}>Marketing</span>
        </label>
      </CheckboxGroup>
    </div>
  );
}
