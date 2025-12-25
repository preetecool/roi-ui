"use client";

import type { ReactElement } from "react";
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

import styles from "./select-menu.module.css";

export type SelectMenuOption<T extends string = string> = {
  value: T;
  label: string;
};

export type SelectMenuProps<T extends string = string> = {
  options: SelectMenuOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  ariaLabel: string;
  align?: "start" | "center" | "end";
  sideOffset?: number;
  trigger?: ReactElement;
};

export function SelectMenu<T extends string = string>({
  options,
  value,
  onValueChange,
  ariaLabel,
  align,
  sideOffset = 8,
  trigger,
}: SelectMenuProps<T>) {
  return (
    <Select items={options} onValueChange={(v) => onValueChange(v as T)} value={value}>
      {trigger ? (
        <SelectTrigger render={trigger} />
      ) : (
        <SelectTrigger aria-label={ariaLabel} className={styles.trigger}>
          <SelectValue>
            {(v) => {
              const selected = options.find((opt) => opt.value === v);
              return <span>{selected?.label}</span>;
            }}
          </SelectValue>
          <SelectIcon />
        </SelectTrigger>
      )}
      <SelectPortal>
        <SelectPositioner align={align} sideOffset={sideOffset}>
          <SelectPopup className={styles.popup}>
            <SelectSpacer />
            <SelectList>
              {options.map(({ label, value: optValue }) => (
                <SelectItem className={styles.item} key={optValue} value={optValue}>
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
