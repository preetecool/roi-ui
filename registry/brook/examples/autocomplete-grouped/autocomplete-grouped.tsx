"use client";

import { useState } from "react";
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
} from "@/registry/brook/ui/autocomplete/autocomplete";
import styles from "./autocomplete-grouped.module.css";

type Item = {
  value: string;
  label: string;
};

type Group = {
  value: string;
  items: Item[];
};

const groups: Group[] = [
  {
    value: "Fruits",
    items: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "orange", label: "Orange" },
    ],
  },
  {
    value: "Vegetables",
    items: [
      { value: "carrot", label: "Carrot" },
      { value: "broccoli", label: "Broccoli" },
      { value: "spinach", label: "Spinach" },
    ],
  },
  {
    value: "Dairy",
    items: [
      { value: "milk", label: "Milk" },
      { value: "cheese", label: "Cheese" },
      { value: "yogurt", label: "Yogurt" },
    ],
  },
];

export default function AutocompleteGrouped() {
  const [value, setValue] = useState("");

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="grouped-input">
        Select an item
      </label>

      <Autocomplete
        items={groups}
        itemToStringValue={(item) => (item as Item).label}
        onValueChange={setValue}
        value={value}
      >
        <AutocompleteInput
          className={styles.input}
          id="grouped-input"
          placeholder="Search items..."
        />

        <AutocompletePortal>
          <AutocompletePositioner>
            <AutocompletePopup>
              <AutocompleteEmpty>No items found.</AutocompleteEmpty>
              <AutocompleteList>
                {(group: Group) => (
                  <AutocompleteGroup key={group.value}>
                    <AutocompleteGroupLabel>{group.value}</AutocompleteGroupLabel>
                    {group.items.map((item) => (
                      <AutocompleteItem key={item.value} value={item}>
                        {item.label}
                      </AutocompleteItem>
                    ))}
                  </AutocompleteGroup>
                )}
              </AutocompleteList>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
      </Autocomplete>
    </div>
  );
}
