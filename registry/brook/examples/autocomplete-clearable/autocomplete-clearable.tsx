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
} from "@/registry/brook/ui/autocomplete/autocomplete";
import styles from "./autocomplete-clearable.module.css";

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
    <div className={styles.container}>
      <label className={styles.label} htmlFor="clearable-input">
        Select a framework
      </label>

      <Autocomplete
        items={frameworks}
        itemToStringValue={(item) => (item as (typeof frameworks)[0]).label}
        onValueChange={setValue}
        value={value}
      >
        <div className={styles.inputWrapper}>
          <AutocompleteInput className={styles.input} id="clearable-input" placeholder="Search frameworks..." />
          <AutocompleteClear />
        </div>

        <AutocompletePortal>
          <AutocompletePositioner>
            <AutocompletePopup className={styles.popup}>
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
