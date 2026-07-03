"use client";

import { createPreferenceProvider } from "./create-preference-provider";

export type ColorPalette = "default" | "psevdaryiros";

export const PALETTE_OPTIONS: { value: ColorPalette; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "psevdaryiros", label: "Psevdaryiros" },
];

const { Provider: PaletteProvider, usePreference } = createPreferenceProvider<ColorPalette>({
  storageKey: "color-palette",
  validValues: PALETTE_OPTIONS.map((o) => o.value),
  dataAttribute: "data-palette",
  defaultValue: "default",
});

export { PaletteProvider };

export function usePalette() {
  const { value, setValue } = usePreference();
  return { palette: value, setPalette: setValue };
}
