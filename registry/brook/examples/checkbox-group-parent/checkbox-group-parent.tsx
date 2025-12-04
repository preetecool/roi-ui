"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";
import {
  Checkbox,
  CheckboxIndicator,
} from "@/registry/brook/ui/checkbox/checkbox";
import { CheckboxGroup } from "@/registry/brook/ui/checkbox-group/checkbox-group";
import styles from "./checkbox-group-parent.module.css";

const allValues = ["design", "development", "marketing"];

export default function CheckboxGroupParent() {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <div className={styles.container}>
      <CheckboxGroup
        value={value}
        onValueChange={setValue}
        allValues={allValues}
      >
        <label className={styles.label}>
          <Checkbox name="interests" parent>
            <CheckboxIndicator
              keepMounted
              render={(props, state) => (
                <span {...props}>
                  {state.indeterminate ? (
                    <Minus size={16} strokeWidth={3} />
                  ) : (
                    <Check size={16} strokeWidth={3} />
                  )}
                </span>
              )}
            />
          </Checkbox>
          <span className={styles.text}>Select all</span>
        </label>

        <div className={styles.children}>
          <label className={styles.label}>
            <Checkbox name="interests" value="design">
              <CheckboxIndicator>
                <Check size={16} strokeWidth={3} />
              </CheckboxIndicator>
            </Checkbox>
            <span className={styles.text}>Design</span>
          </label>

          <label className={styles.label}>
            <Checkbox name="interests" value="development">
              <CheckboxIndicator>
                <Check size={16} strokeWidth={3} />
              </CheckboxIndicator>
            </Checkbox>
            <span className={styles.text}>Development</span>
          </label>

          <label className={styles.label}>
            <Checkbox name="interests" value="marketing">
              <CheckboxIndicator>
                <Check size={16} strokeWidth={3} />
              </CheckboxIndicator>
            </Checkbox>
            <span className={styles.text}>Marketing</span>
          </label>
        </div>
      </CheckboxGroup>
    </div>
  );
}
