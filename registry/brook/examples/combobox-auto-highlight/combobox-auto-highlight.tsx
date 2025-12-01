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
} from "@/registry/brook/ui/combobox/combobox";
import styles from "./combobox-auto-highlight.module.css";

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
    <div className={styles.container}>
      <label className={styles.label} htmlFor="auto-highlight-input">
        Select a country
      </label>

      <div className={styles.comboboxWrapper}>
        <Combobox<Country>
          autoHighlight
          items={countries}
          itemToStringLabel={(item) => item?.label || ""}
          itemToStringValue={(item) => item?.value || ""}
        >
          <div className={styles.inputWrapper} ref={anchorRef}>
            <ComboboxInput id="auto-highlight-input" placeholder="Start typing..." />
            <ComboboxTrigger />
          </div>

          <ComboboxPortal>
            <ComboboxPositioner anchor={anchorRef}>
              <ComboboxPopup className={styles.popup}>
                <ComboboxEmpty>No countries found.</ComboboxEmpty>
                <ComboboxList>
                  {(item: Country) => (
                    <ComboboxItem
                      indicatorPosition="right"
                      key={item.value}
                      value={item}
                    >
                      <span style={{ flex: 1 }}>{item.label}</span>
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
