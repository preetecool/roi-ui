"use client";

import { useId, useRef } from "react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxValue,
} from "@/registry/brook/tailwind/ui/combobox";

interface Language {
  id: string;
  value: string;
}

const languages: Language[] = [
  { id: "js", value: "JavaScript" },
  { id: "ts", value: "TypeScript" },
  { id: "py", value: "Python" },
  { id: "java", value: "Java" },
  { id: "cpp", value: "C++" },
  { id: "cs", value: "C#" },
  { id: "php", value: "PHP" },
  { id: "ruby", value: "Ruby" },
  { id: "go", value: "Go" },
  { id: "rust", value: "Rust" },
  { id: "swift", value: "Swift" },
];

export default function ComboboxMultiple() {
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  return (
    <div className="flex flex-col gap-3 p-8 max-sm:p-4">
      <label
        className="ml-1 flex flex-col gap-1 font-medium text-[var(--color-foreground)] text-sm leading-[17.5px] max-sm:text-[0.9375rem]"
        htmlFor={id}
      >
        Programming languages
      </label>

      <div className="relative w-[300px] max-sm:w-full">
        <Combobox<Language, true> items={languages} multiple>
          <ComboboxChips ref={containerRef}>
            <ComboboxValue>
              {(value: Language[]) => (
                <>
                  {value.map((language) => (
                    <ComboboxChip aria-label={language.value} key={language.id}>
                      {language.value}
                      <ComboboxChipRemove aria-label="Remove" />
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput id={id} placeholder={value.length > 0 ? "" : "e.g. TypeScript"} />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>

          <ComboboxPortal>
            <ComboboxPositioner anchor={containerRef}>
              <ComboboxPopup className="w-[var(--anchor-width)]">
                <ComboboxEmpty>No languages found.</ComboboxEmpty>
                <ComboboxList>
                  {(language: Language) => (
                    <ComboboxItem indicatorPosition="right" key={language.id} value={language}>
                      <span className="flex-1">{language.value}</span>
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
