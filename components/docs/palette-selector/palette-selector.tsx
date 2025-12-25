"use client";

import { type ColorPalette, usePalette } from "@/components/providers/palette-provider";
import { SelectMenu, type SelectMenuOption } from "@/components/shared/select-menu/select-menu";

const paletteOptions: SelectMenuOption<ColorPalette>[] = [
  { value: "default", label: "Default" },
  { value: "psevdaryiros", label: "Psevdaryiros" },
];

export function PaletteSelector() {
  const { palette, setPalette } = usePalette();

  return (
    <SelectMenu ariaLabel="Select color palette" onValueChange={setPalette} options={paletteOptions} value={palette} />
  );
}
