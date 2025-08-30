"use client";

import { Checkbox, CheckboxIndicator } from "@/registry/brook/ui/checkbox/checkbox";
import { Check } from "lucide-react";

export default function CheckboxDemo() {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
      <Checkbox>
        <CheckboxIndicator>
          <Check size={16} strokeWidth={3} />
        </CheckboxIndicator>
      </Checkbox>
      <span style={{ fontSize: "0.875rem" }}>Accept terms and conditions</span>
    </label>
  );
}
