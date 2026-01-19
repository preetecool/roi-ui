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
    <div className="flex flex-col gap-3 p-8 max-sm:p-4">
      <label
        className="ml-1 flex flex-col gap-1 font-medium text-[var(--color-foreground)] text-sm leading-[17.5px] max-sm:text-[0.9375rem]"
        htmlFor="cb-input"
      >
        Select your country
      </label>

      <div className="relative w-[300px] max-sm:w-full">
        <Combobox<Country>
          items={countries}
          itemToStringLabel={(item) => item?.name || ""}
          itemToStringValue={(item) => item?.code || ""}
        >
          <div className="relative w-full [&:hover_[data-slot=combobox-trigger]]:opacity-50" ref={anchorRef}>
            <ComboboxInput id="cb-input" placeholder="Search countries..." />
            <ComboboxTrigger />
          </div>

          <ComboboxPortal>
            <ComboboxPositioner anchor={anchorRef}>
              <ComboboxPopup className="w-[var(--anchor-width)]">
                <ComboboxEmpty>No country found.</ComboboxEmpty>
                <ComboboxList>
                  {(country: Country) => (
                    <ComboboxItem indicatorPosition="right" key={country.code} value={country}>
                      <div className="flex flex-1 items-center gap-3">
                        <span className="text-xl leading-none">{country.flag}</span>
                        <span className="text-sm max-sm:text-[0.9375rem]">{country.name}</span>
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
