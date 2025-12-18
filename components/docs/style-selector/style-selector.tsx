"use client";

import { useStyle } from "@/components/providers/style-provider";
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
} from "@/registry/brook/ui/select/select";

import styles from "./style-selector.module.css";

const styleOptions = [
  { value: "css-modules", label: "CSS Modules" },
  { value: "tailwind", label: "Tailwind CSS" },
];

export function StyleSelector() {
  const { style, setStyle } = useStyle();

  return (
    <Select items={styleOptions} onValueChange={(value) => setStyle(value as "css-modules" | "tailwind")} value={style}>
      <SelectTrigger aria-label="Select style framework" className={styles.trigger}>
        <SelectValue>
          {(value) => {
            const selected = styleOptions.find((opt) => opt.value === value);
            return <span>{selected?.label}</span>;
          }}
        </SelectValue>
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectPositioner sideOffset={8}>
          <SelectPopup className={styles.popup}>
            <SelectSpacer />
            <SelectList>
              {styleOptions.map(({ label, value }) => (
                <SelectItem className={styles.item} key={value} value={value}>
                  <SelectItemIndicator />
                  <SelectItemText>{label}</SelectItemText>
                </SelectItem>
              ))}
            </SelectList>
            <SelectSpacer />
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  );
}
