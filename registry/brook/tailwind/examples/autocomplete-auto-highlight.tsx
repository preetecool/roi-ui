"use client";

import { useState } from "react";
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
} from "@/registry/brook/tailwind/ui/autocomplete";

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

export default function AutocompleteAutoHighlight() {
  const [value, setValue] = useState("");

  return (
    <div className="p-8 max-sm:p-4">
      <label
        className="mb-2 ml-1 flex flex-col gap-1 font-medium text-foreground text-sm leading-[17.5px] max-sm:text-[0.9375rem]"
        htmlFor="auto-highlight-input"
      >
        Select a country
      </label>

      <Autocomplete
        autoHighlight
        items={countries}
        itemToStringValue={(item) => (item as (typeof countries)[0]).label}
        onValueChange={setValue}
        value={value}
      >
        <AutocompleteInput
          className="w-[300px] max-sm:w-full"
          id="auto-highlight-input"
          placeholder="Start typing..."
        />

        <AutocompletePortal>
          <AutocompletePositioner>
            <AutocompletePopup>
              <AutocompleteEmpty>No countries found.</AutocompleteEmpty>
              <AutocompleteList>
                {(item: (typeof countries)[0]) => (
                  <AutocompleteItem key={item.value} value={item}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </AutocompleteList>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
      </Autocomplete>
    </div>
  );
}
