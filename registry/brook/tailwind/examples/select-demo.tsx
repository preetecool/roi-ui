"use client";
import { Button } from "@/registry/brook/tailwind/ui/button";
import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectSpacer,
  SelectTrigger,
  SelectValue,
} from "@/registry/brook/tailwind/ui/select";

const subscriptionPlans = [
  { value: "placeholder", label: "Select a Plan" },
  { value: "Starter", label: "Starter" },
  { value: "Professional", label: "Professional" },
  { value: "Business", label: "Business" },
  { value: "Enterprise", label: "Enterprise" },
];

export default function SelectDemo() {
  return (
    <Select defaultValue="placeholder" items={subscriptionPlans}>
      <SelectTrigger
        className="min-w-[180px]"
        render={<Button className="!transition-none flex min-w-[180px]" size="sm" variant="outline" />}
      >
        <SelectValue>
          {(value) => (
            <span className={value === "placeholder" ? "text-muted-foreground" : undefined}>
              {subscriptionPlans.find((item) => item.value === value)?.label}
            </span>
          )}
        </SelectValue>
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectPositioner alignItemWithTrigger={false} sideOffset={4}>
          <SelectPopup>
            <SelectSpacer />
            <SelectList>
              <SelectItem disabled value="placeholder">
                <SelectItemText className="text-muted-foreground">Select a Plan</SelectItemText>
              </SelectItem>
              <SelectItem value="Starter">
                <SelectItemText>Starter</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="Professional">
                <SelectItemText>Professional</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="Business">
                <SelectItemText>Business</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="Enterprise">
                <SelectItemText>Enterprise</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
            </SelectList>
            <SelectSpacer />
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  );
}
