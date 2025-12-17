"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils-tailwind";
import { Checkbox, CheckboxIndicator } from "@/registry/brook/tailwind/ui/checkbox";

export default function CheckboxCard() {
  return (
    <label
      className={cn(
        "flex max-w-96 cursor-pointer items-start gap-3 rounded-[var(--radius)] p-4",
        "border border-[oklch(from_var(--border)_l_c_h_/_0.7)]",
        "bg-[oklch(from_var(--card)_l_c_h_/_0.5)]",
        "transition-[border-color,background-color] duration-150 ease-out",
        "hover:bg-[oklch(from_var(--card)_l_c_h_/_0.7)]",
        "has-[[data-checked]]:border-border has-[[data-checked]]:bg-[oklch(from_var(--card)_l_c_h_/_0.8)]"
      )}
    >
      <Checkbox className="mt-0.5">
        <CheckboxIndicator>
          <Check size={16} strokeWidth={3} />
        </CheckboxIndicator>
      </Checkbox>
      <div className="flex flex-col gap-0.5">
        <span className="font-medium text-[0.9375rem] text-foreground leading-[1.4]">Enable notifications</span>
        <span className="text-muted-foreground text-xs leading-normal">
          You can enable or disable notifications at any time.
        </span>
      </div>
    </label>
  );
}
