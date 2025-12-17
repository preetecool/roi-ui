"use client";
import { Button } from "@/registry/brook/ui/button/button";
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
  SelectTrigger,
  SelectValue,
} from "@/registry/brook/ui/select/select";
import styles from "./select-demo.module.css";

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
      <SelectTrigger render={<Button className={styles.trigger} size="sm" variant="outline" />}>
        <SelectValue>
          {(value) => (
            <span className={value === "placeholder" ? styles.placeholder : undefined}>
              {subscriptionPlans.find((item) => item.value === value)?.label}
            </span>
          )}
        </SelectValue>
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectPositioner alignItemWithTrigger={false} sideOffset={4}>
          <SelectPopup>
            <SelectList>
              <SelectItem disabled value="placeholder">
                <SelectItemText className={styles.itemText}>Select a Plan</SelectItemText>
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
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  );
}
