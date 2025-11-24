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
      <div className="mb-4 font-medium text-sm">Select your interests</div>

      <CheckboxGroup defaultValue={["design"]}>
        <label
          className="mb-2 flex cursor-pointer items-center gap-2"
          htmlFor="design"
        >
          <Checkbox id="design" name="interests" value="design">
            <CheckboxIndicator>
              <Check size={16} strokeWidth={3} />
            </CheckboxIndicator>
          </Checkbox>
          <span className="text-sm leading-5">Design</span>
        </label>

        <label
          className="mb-2 flex cursor-pointer items-center gap-2"
          htmlFor="development"
        >
          <Checkbox id="development" name="interests" value="development">
            <CheckboxIndicator>
              <Check size={16} strokeWidth={3} />
            </CheckboxIndicator>
          </Checkbox>
          <span className="text-sm leading-5">Development</span>
        </label>

        <label
          className="flex cursor-pointer items-center gap-2"
          htmlFor="marketing"
        >
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
