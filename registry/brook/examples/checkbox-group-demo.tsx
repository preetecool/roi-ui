"use client";

import { CheckboxGroup } from "@/registry/brook/ui/checkbox-group/checkbox-group";
import { Checkbox, CheckboxIndicator } from "@/registry/brook/ui/checkbox/checkbox";
import { Check } from "lucide-react";

export default function CheckboxGroupDemo() {
  return (
    <div style={{ maxWidth: "24rem" }}>
      <div style={{ marginBottom: "1rem", fontSize: "0.875rem", fontWeight: "500" }}>Select your interests</div>

      <CheckboxGroup defaultValue={["design"]}>
        <label
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", cursor: "pointer" }}
        >
          <Checkbox name="interests" value="design">
            <CheckboxIndicator>
              <Check size={16} strokeWidth={3} />
            </CheckboxIndicator>
          </Checkbox>
          <span style={{ fontSize: "0.875rem" }}>Design</span>
        </label>

        <label
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", cursor: "pointer" }}
        >
          <Checkbox name="interests" value="development">
            <CheckboxIndicator>
              <Check size={16} strokeWidth={3} />
            </CheckboxIndicator>
          </Checkbox>
          <span style={{ fontSize: "0.875rem" }}>Development</span>
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
          <Checkbox name="interests" value="marketing">
            <CheckboxIndicator>
              <Check size={16} strokeWidth={3} />
            </CheckboxIndicator>
          </Checkbox>
          <span style={{ fontSize: "0.875rem" }}>Marketing</span>
        </label>
      </CheckboxGroup>
    </div>
  );
}
