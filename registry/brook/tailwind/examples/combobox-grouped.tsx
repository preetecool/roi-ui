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
} from "@/registry/brook/tailwind/ui/combobox";

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
    <div className="flex flex-col gap-3 p-8 max-sm:p-4">
      <label
        className="ml-1 flex flex-col gap-1 font-medium text-[var(--color-foreground)] text-sm leading-[17.5px] max-sm:text-[0.9375rem]"
        htmlFor="grouped-input"
      >
        Select an item
      </label>

      <div className="relative w-[300px] max-sm:w-full">
        <Combobox<Group>
          items={groups}
          itemToStringLabel={(item) => (item as unknown as Item)?.label || ""}
          itemToStringValue={(item) => (item as unknown as Item)?.value || ""}
        >
          <div className="relative w-full [&:hover_[data-slot=combobox-trigger]]:opacity-50" ref={anchorRef}>
            <ComboboxInput id="grouped-input" placeholder="Search items..." />
            <ComboboxTrigger />
          </div>

          <ComboboxPortal>
            <ComboboxPositioner anchor={anchorRef}>
              <ComboboxPopup className="w-[var(--anchor-width)]">
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(group: Group) => (
                    <ComboboxGroup key={group.label}>
                      <ComboboxGroupLabel>{group.label}</ComboboxGroupLabel>
                      {group.items.map((item) => (
                        <ComboboxItem indicatorPosition="right" key={item.value} value={item}>
                          <span className="flex-1">{item.label}</span>
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
