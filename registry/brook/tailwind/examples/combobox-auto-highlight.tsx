"use client";

import { useRef } from "react";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxTrigger,
} from "@/registry/brook/tailwind/ui/combobox";

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "br", label: "Brazil" },
];

type Country = (typeof countries)[0];

export default function ComboboxAutoHighlight() {
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="p-8 max-sm:p-4">
      <label
        className="mb-2 ml-1 flex flex-col gap-1 font-medium text-[var(--color-foreground)] text-sm leading-[17.5px] max-sm:text-[0.9375rem]"
        htmlFor="auto-highlight-input"
      >
        Select a country
      </label>

      <div className="relative w-[300px] max-sm:w-full">
        <Combobox<Country>
          autoHighlight
          items={countries}
          itemToStringLabel={(item) => item?.label || ""}
          itemToStringValue={(item) => item?.value || ""}
        >
          <div className="relative w-full [&:hover_[data-slot=combobox-trigger]]:opacity-50" ref={anchorRef}>
            <ComboboxInput id="auto-highlight-input" placeholder="Start typing..." />
            <ComboboxTrigger />
          </div>

          <ComboboxPortal>
            <ComboboxPositioner anchor={anchorRef}>
              <ComboboxPopup className="w-[var(--anchor-width)]">
                <ComboboxEmpty>No countries found.</ComboboxEmpty>
                <ComboboxList>
                  {(item: Country) => (
                    <ComboboxItem indicatorPosition="right" key={item.value} value={item}>
                      <span className="flex-1">{item.label}</span>
                    </ComboboxItem>
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
