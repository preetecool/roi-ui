"use client";

import { PALETTE_OPTIONS, usePalette } from "@/components/providers/palette-provider";
import { SelectMenu } from "@/components/shared/select-menu/select-menu";

export function PaletteSelector() {
  const { palette, setPalette } = usePalette();

  return (
    <SelectMenu ariaLabel="Select color palette" onValueChange={setPalette} options={PALETTE_OPTIONS} value={palette} />
  );
}
