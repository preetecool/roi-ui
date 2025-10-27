"use client";

import { Check } from "lucide-react";
import {
  Checkbox,
  CheckboxIndicator,
} from "@/registry/brook/tailwind/ui/checkbox";
import { CheckboxGroup } from "@/registry/brook/tailwind/ui/checkbox-group";

export default function CheckboxGroupDemo() {
  return (
    <div className="max-w-96">
      <div className="mb-4 text-sm font-medium">Select your interests</div>

      <CheckboxGroup defaultValue={["design"]}>
        <label className="flex items-center gap-2 mb-2 cursor-pointer" htmlFor="design">
          <Checkbox id="design" name="interests" value="design">
            <CheckboxIndicator>
              <Check size={16} strokeWidth={3} />
            </CheckboxIndicator>
          </Checkbox>
          <span className="text-sm leading-5">Design</span>
        </label>

        <label className="flex items-center gap-2 mb-2 cursor-pointer" htmlFor="development">
          <Checkbox id="development" name="interests" value="development">
            <CheckboxIndicator>
              <Check size={16} strokeWidth={3} />
            </CheckboxIndicator>
          </Checkbox>
          <span className="text-sm leading-5">Development</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer" htmlFor="marketing">
          <Checkbox id="marketing" name="interests" value="marketing">
            <CheckboxIndicator>
              <Check size={16} strokeWidth={3} />
            </CheckboxIndicator>
          </Checkbox>
          <span className="text-sm leading-5">Marketing</span>
        </label>
      </CheckboxGroup>
    </div>
  );
}
