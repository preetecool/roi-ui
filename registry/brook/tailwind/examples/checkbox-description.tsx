"use client";

import { Check } from "lucide-react";
import {
  Checkbox,
  CheckboxIndicator,
} from "@/registry/brook/tailwind/ui/checkbox";

export default function CheckboxDescription() {
  return (
    <div className="flex flex-col gap-0.5">
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox>
          <CheckboxIndicator>
            <Check size={16} strokeWidth={3} />
          </CheckboxIndicator>
        </Checkbox>
        <span className="text-sm leading-[1.4]">Accept terms and conditions</span>
      </label>
      <span className="text-xs text-muted-foreground leading-normal ml-[calc(1.125rem+0.5rem)]">
        You agree to our Terms of Service and Privacy Policy.
      </span>
    </div>
  );
}
