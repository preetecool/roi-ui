"use client";

import { Check } from "lucide-react";
import { Checkbox, CheckboxIndicator } from "@/registry/brook/tailwind/ui/checkbox";

export default function CheckboxDescription() {
  return (
    <div className="flex flex-col gap-0.5">
      <label className="flex cursor-pointer items-center gap-2">
        <Checkbox>
          <CheckboxIndicator>
            <Check size={16} strokeWidth={3} />
          </CheckboxIndicator>
        </Checkbox>
        <span className="text-sm leading-[1.4]">Accept terms and conditions</span>
      </label>
      <span className="ml-[calc(1.125rem+0.5rem)] text-muted-foreground text-xs leading-normal">
        You agree to our Terms of Service and Privacy Policy.
      </span>
    </div>
  );
}
