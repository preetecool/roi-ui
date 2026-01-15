"use client";

import { useState } from "react";
import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
} from "@/registry/brook/tailwind/ui/autocomplete";

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "gatsby", label: "Gatsby" },
];

export default function AutocompleteClearable() {
  const [value, setValue] = useState("");

  return (
    <div className="p-8 max-sm:p-4">
      <label
        className="mb-2 ml-1 flex flex-col gap-1 font-medium text-foreground text-sm leading-[17.5px] max-sm:text-[0.9375rem]"
        htmlFor="clearable-input"
      >
        Select a framework
      </label>

      <Autocomplete
        items={frameworks}
        itemToStringValue={(item) => (item as (typeof frameworks)[0]).label}
        onValueChange={setValue}
        value={value}
      >
        <div className="flex w-[300px] items-center gap-2 border-none rounded-[var(--radius)] bg-[var(--mix-card-50-bg)] pr-2 shadow-[0_0_0_1px_oklch(from_var(--border)_l_c_h_/_0.5)] focus-within:shadow-[0_0_0_1px_var(--ring),0_0_4px_oklch(from_var(--border)_l_c_h_/_0.5)] max-sm:w-full">
          <AutocompleteInput
            className="flex-1 border-none bg-transparent [box-shadow:none] focus:border-transparent focus:[box-shadow:none] focus:outline-none"
            id="clearable-input"
            placeholder="Search frameworks..."
          />
          <AutocompleteClear />
        </div>

        <AutocompletePortal>
          <AutocompletePositioner>
            <AutocompletePopup className="w-[300px] max-sm:w-[calc(100vw-2rem)]">
              <AutocompleteEmpty>No frameworks found.</AutocompleteEmpty>
              <AutocompleteList>
                {(item: (typeof frameworks)[0]) => (
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
