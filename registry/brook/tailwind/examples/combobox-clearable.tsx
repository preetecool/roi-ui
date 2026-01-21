"use client";

import { useRef } from "react";
import {
  Combobox,
  ComboboxClear,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxTrigger,
  ComboboxValue,
} from "@/registry/brook/tailwind/ui/combobox";

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "gatsby", label: "Gatsby" },
];

type Framework = (typeof frameworks)[0];

export default function ComboboxClearable() {
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col gap-3 p-8 max-sm:p-4">
      <label
        className="ml-1 flex flex-col gap-1 font-medium text-[var(--color-foreground)] text-sm leading-[17.5px] max-sm:text-[0.9375rem]"
        htmlFor="clearable-input"
      >
        Select a framework
      </label>

      <div className="relative w-[300px] max-sm:w-full">
        <Combobox<Framework>
          items={frameworks}
          itemToStringLabel={(item) => item?.label || ""}
          itemToStringValue={(item) => item?.value || ""}
        >
          <div className="relative flex w-full items-center border-none rounded-[var(--radius)] bg-[var(--mix-card-50-bg)] pr-2 shadow-[0_0_0_1px_oklch(from_var(--border)_l_c_h_/_0.5)] focus-within:shadow-[0_0_0_1px_var(--ring),0_0_0_3px_oklch(from_var(--ring)_l_c_h_/_0.2)]" ref={anchorRef}>
            <ComboboxInput className="flex-1 border-none bg-transparent ![box-shadow:none]" id="clearable-input" placeholder="Search frameworks..." />
            <ComboboxValue>
              {(value: Framework | null) => (value ? <ComboboxClear /> : <ComboboxTrigger />)}
            </ComboboxValue>
          </div>

          <ComboboxPortal>
            <ComboboxPositioner anchor={anchorRef}>
              <ComboboxPopup className="w-[var(--anchor-width)]">
                <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
                <ComboboxList>
                  {(item: Framework) => (
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
