"use client";

import { useRef } from "react";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxTrigger,
} from "@/registry/brook/ui/combobox/combobox";
import styles from "./combobox-grouped.module.css";

type Item = {
  value: string;
  label: string;
};

type Group = {
  label: string;
  items: Item[];
};

const groups: Group[] = [
  {
    label: "Fruits",
    items: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "orange", label: "Orange" },
    ],
  },
  {
    label: "Vegetables",
    items: [
      { value: "carrot", label: "Carrot" },
      { value: "broccoli", label: "Broccoli" },
      { value: "spinach", label: "Spinach" },
    ],
  },
  {
    label: "Dairy",
    items: [
      { value: "milk", label: "Milk" },
      { value: "cheese", label: "Cheese" },
      { value: "yogurt", label: "Yogurt" },
    ],
  },
];

export default function ComboboxGrouped() {
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="grouped-input">
        Select an item
      </label>

      <div className={styles.comboboxWrapper}>
        <Combobox<Group>
          items={groups}
          itemToStringLabel={(item) => (item as unknown as Item)?.label || ""}
          itemToStringValue={(item) => (item as unknown as Item)?.value || ""}
        >
          <div className={styles.inputWrapper} ref={anchorRef}>
            <ComboboxInput id="grouped-input" placeholder="Search items..." />
            <ComboboxTrigger />
          </div>

          <ComboboxPortal>
            <ComboboxPositioner anchor={anchorRef}>
              <ComboboxPopup className={styles.popup}>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(group: Group) => (
                    <ComboboxGroup key={group.label}>
                      <ComboboxGroupLabel>{group.label}</ComboboxGroupLabel>
                      {group.items.map((item) => (
                        <ComboboxItem
                          indicatorPosition="right"
                          key={item.value}
                          value={item}
                        >
                          <span style={{ flex: 1 }}>{item.label}</span>
                        </ComboboxItem>
                      ))}
                    </ComboboxGroup>
                  )}
                </ComboboxList>
              </ComboboxPopup>
            </ComboboxPositioner>
          </ComboboxPortal>
        </Combobox>
      </div>
    </div>
  );
}
