"use client";

import { createPreferenceProvider } from "./create-preference-provider";

export type StyleVariant = "css-modules" | "tailwind";

const VALID_STYLES = ["css-modules", "tailwind"] as const;

const { Provider: StyleProvider, usePreference } = createPreferenceProvider<StyleVariant>({
  storageKey: "preferred-style",
  validValues: VALID_STYLES,
  dataAttribute: "data-style",
  defaultValue: "css-modules",
});

export { StyleProvider };

export function useStyle() {
  const { value, setValue } = usePreference();
  return { style: value, setStyle: setValue };
}
