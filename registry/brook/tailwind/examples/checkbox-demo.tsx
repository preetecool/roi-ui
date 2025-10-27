"use client";

import { Check } from "lucide-react";
import {
  Checkbox,
  CheckboxIndicator,
} from "@/registry/brook/tailwind/ui/checkbox";

export default function CheckboxDemo() {
  return (
    <label className="flex items-center gap-2 cursor-pointer" htmlFor="terms">
      <Checkbox id="terms">
        <CheckboxIndicator>
          <Check size={16} strokeWidth={3} />
        </CheckboxIndicator>
      </Checkbox>
      <span className="text-sm">Accept terms and conditions</span>
    </label>
  );
}
