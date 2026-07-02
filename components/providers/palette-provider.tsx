"use client";

import { createPreferenceProvider } from "./create-preference-provider";

export type ColorPalette = "default" | "psevdaryiros";

const VALID_PALETTES = ["default", "psevdaryiros"] as const;

const { Provider: PaletteProvider, usePreference } = createPreferenceProvider<ColorPalette>({
  storageKey: "color-palette",
  validValues: VALID_PALETTES,
  dataAttribute: "data-palette",
  defaultValue: "default",
});

export { PaletteProvider };

export function usePalette() {
  const { value, setValue } = usePreference();
  return { palette: value, setPalette: setValue };
}

export { VALID_PALETTES };
