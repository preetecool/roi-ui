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
} from "@/registry/brook/ui/combobox/combobox";
import styles from "./combobox-clearable.module.css";

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
    <div className={styles.container}>
      <label className={styles.label} htmlFor="clearable-input">
        Select a framework
      </label>

      <div className={styles.comboboxWrapper}>
        <Combobox<Framework>
          items={frameworks}
          itemToStringLabel={(item) => item?.label || ""}
          itemToStringValue={(item) => item?.value || ""}
        >
          <div className={styles.inputWrapper} ref={anchorRef}>
            <ComboboxInput id="clearable-input" placeholder="Search frameworks..." />
            <ComboboxValue>
              {(value: Framework | null) => (value ? <ComboboxClear /> : <ComboboxTrigger />)}
            </ComboboxValue>
          </div>

          <ComboboxPortal>
            <ComboboxPositioner anchor={anchorRef}>
              <ComboboxPopup className={styles.popup}>
                <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
                <ComboboxList>
                  {(item: Framework) => (
                    <ComboboxItem indicatorPosition="right" key={item.value} value={item}>
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
