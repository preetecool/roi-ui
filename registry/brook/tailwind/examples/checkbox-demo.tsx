"use client";

import { Check } from "lucide-react";
import {
  Checkbox,
  CheckboxIndicator,
} from "@/registry/brook/tailwind/ui/checkbox";

export default function CheckboxDemo() {
  return (
    <label className="flex cursor-pointer items-center gap-2" htmlFor="terms">
      <Checkbox id="terms">
        <CheckboxIndicator>
          <Check size={16} strokeWidth={3} />
        </CheckboxIndicator>
      </Checkbox>
      <span className="text-sm leading-5">Accept terms and conditions</span>
    </label>
  );
}
