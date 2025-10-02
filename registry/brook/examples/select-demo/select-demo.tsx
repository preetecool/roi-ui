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

const bodiesOfWater = [
  { value: "placeholder", label: "Bodies of Water" },
  { value: "Brook", label: "Brook" },
  { value: "Stream", label: "Stream" },
  { value: "Creek", label: "Creek" },
  { value: "River", label: "River" },
  { value: "Lake", label: "Lake" },
];

export default function SelectDemo() {
  return (
    <Select items={bodiesOfWater} defaultValue="placeholder">
      <SelectTrigger render={<Button variant="outline" size="sm" className={styles.trigger} />}>
        <SelectValue>
          {(value) => (
            <span className={value === "placeholder" ? styles.placeholder : undefined}>
              {bodiesOfWater.find((item) => item.value === value)?.label}
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
                <SelectItemText className={styles.itemText}>Bodies of Water</SelectItemText>
              </SelectItem>
              <SelectItem value="Brook">
                <SelectItemText>Brook</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="Stream">
                <SelectItemText>Stream</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="Creek">
                <SelectItemText>Creek</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="River">
                <SelectItemText>River</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="Lake">
                <SelectItemText>Lake</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
            </SelectList>
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  );
}
