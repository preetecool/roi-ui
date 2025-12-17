"use client";

import type { ReactNode } from "react";
import { createPreferenceProvider } from "./create-preference-provider";

export type StyleVariant = "css-modules" | "tailwind";

const VALID_STYLES = ["css-modules", "tailwind"] as const;

const { Provider, usePreference } = createPreferenceProvider<StyleVariant>({
  storageKey: "preferred-style",
  validValues: VALID_STYLES,
  dataAttribute: "data-style",
});

type StyleProviderProps = {
  children: ReactNode;
  defaultValue?: StyleVariant;
};

export function StyleProvider({ children, defaultValue = "css-modules" }: StyleProviderProps) {
  return <Provider defaultValue={defaultValue}>{children}</Provider>;
}

export function useStyle() {
  const { value, setValue } = usePreference();
  return { style: value, setStyle: setValue };
}
