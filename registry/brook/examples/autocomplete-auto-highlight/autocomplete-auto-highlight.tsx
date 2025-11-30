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
} from "@/registry/brook/ui/autocomplete/autocomplete";
import styles from "./autocomplete-auto-highlight.module.css";

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
    <div className={styles.container}>
      <label className={styles.label} htmlFor="auto-highlight-input">
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
          className={styles.input}
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
