"use client";

import { useStyle } from "@/components/style-provider";
import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
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
    <Select
      items={styleOptions}
      onValueChange={(value) => setStyle(value as "css-modules" | "tailwind")}
      value={style}
    >
      <SelectTrigger className={styles.trigger} nativeButton={false}>
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
            {styleOptions.map(({ label, value }) => (
              <SelectItem className={styles.item} key={value} value={value}>
                <SelectItemIndicator />
                <SelectItemText>{label}</SelectItemText>
              </SelectItem>
            ))}
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  );
}
