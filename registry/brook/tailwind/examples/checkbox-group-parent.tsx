"use client";

import { Check, Minus } from "lucide-react";
import * as React from "react";
import { Checkbox, CheckboxIndicator } from "@/registry/brook/tailwind/ui/checkbox";
import { CheckboxGroup } from "@/registry/brook/tailwind/ui/checkbox-group";

const allValues = ["design", "development", "marketing"];

export default function CheckboxGroupParent() {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <div className="max-w-96">
      <CheckboxGroup allValues={allValues} onValueChange={setValue} value={value}>
        <label className="flex cursor-pointer items-center gap-2">
          <Checkbox name="interests" parent>
            <CheckboxIndicator
              keepMounted
              render={(props, state) => (
                <span {...props}>
                  {state.indeterminate ? <Minus size={16} strokeWidth={3} /> : <Check size={16} strokeWidth={3} />}
                </span>
              )}
            />
          </Checkbox>
          <span className="text-sm leading-5">Select all</span>
        </label>

        <div className="mt-3 flex flex-col gap-3 pl-6">
          <label className="flex cursor-pointer items-center gap-2">
            <Checkbox name="interests" value="design">
              <CheckboxIndicator>
                <Check size={16} strokeWidth={3} />
              </CheckboxIndicator>
            </Checkbox>
            <span className="text-sm leading-5">Design</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2">
            <Checkbox name="interests" value="development">
              <CheckboxIndicator>
                <Check size={16} strokeWidth={3} />
              </CheckboxIndicator>
            </Checkbox>
            <span className="text-sm leading-5">Development</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2">
            <Checkbox name="interests" value="marketing">
              <CheckboxIndicator>
                <Check size={16} strokeWidth={3} />
              </CheckboxIndicator>
            </Checkbox>
            <span className="text-sm leading-5">Marketing</span>
          </label>
        </div>
      </CheckboxGroup>
    </div>
  );
}
