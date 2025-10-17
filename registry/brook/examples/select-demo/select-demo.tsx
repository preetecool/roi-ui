"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectPositioner,
  SelectPopup,
  SelectList,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from "@/registry/brook/ui/select/select";
import { Button } from "@/registry/brook/ui/button/button";
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
    <Select items={subscriptionPlans} defaultValue="placeholder">
      <SelectTrigger render={<Button variant="outline" size="sm" className={styles.trigger} />}>
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
        <SelectPositioner>
          <SelectPopup>
            <SelectList>
              <SelectItem value="placeholder" disabled>
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
