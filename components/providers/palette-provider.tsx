"use client";

import type { ReactNode } from "react";
import { createPreferenceProvider } from "./create-preference-provider";

export type ColorPalette = "default" | "psevdaryiros";

const VALID_PALETTES = ["default", "psevdaryiros"] as const;

const { Provider, usePreference } = createPreferenceProvider<ColorPalette>({
	storageKey: "color-palette",
	validValues: VALID_PALETTES,
	dataAttribute: "data-palette",
});

type PaletteProviderProps = {
	children: ReactNode;
	defaultValue?: ColorPalette;
};

export function PaletteProvider({ children, defaultValue = "default" }: PaletteProviderProps) {
	return <Provider defaultValue={defaultValue}>{children}</Provider>;
}

export function usePalette() {
	const { value, setValue } = usePreference();
	return { palette: value, setPalette: setValue };
}

export { VALID_PALETTES };
