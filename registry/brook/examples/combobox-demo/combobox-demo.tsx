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
import styles from "./combobox-demo.module.css";

type Country = {
  code: string;
  name: string;
  flag: string;
};

const countries: Country[] = [
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "FI", name: "Finland", flag: "🇫🇮" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "NO", name: "Norway", flag: "🇳🇴" },
  { code: "PL", name: "Poland", flag: "🇵🇱" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "US", name: "United States", flag: "🇺🇸" },
];

export default function ComboboxDemo() {
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="cb-input">
        Select your country
      </label>

      <div className={styles.comboboxWrapper}>
        <Combobox<Country>
          items={countries}
          itemToStringLabel={(item) => item?.name || ""}
          itemToStringValue={(item) => item?.code || ""}
        >
          <div className={styles.inputWrapper} ref={anchorRef}>
            <ComboboxInput id="cb-input" placeholder="Search countries..." />
            <ComboboxTrigger />
          </div>

          <ComboboxPortal>
            <ComboboxPositioner anchor={anchorRef}>
              <ComboboxPopup className={styles.popup}>
                <ComboboxEmpty>No country found.</ComboboxEmpty>
                <ComboboxList>
                  {(country: Country) => (
                    <ComboboxItem
                      indicatorPosition="right"
                      key={country.code}
                      value={country}
                    >
                      <div className={styles.countryContainer}>
                        <span className={styles.countryFlag}>
                          {country.flag}
                        </span>
                        <span className={styles.countryName}>
                          {country.name}
                        </span>
                      </div>
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
