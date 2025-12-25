"use client";

import { Palette } from "lucide-react";
import { useEffect, useState } from "react";
import { type ColorPalette, usePalette, VALID_PALETTES } from "@/components/providers/palette-provider";
import { SelectMenu, type SelectMenuOption } from "@/components/shared/select-menu/select-menu";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./palette-switcher.module.css";

const paletteOptions: SelectMenuOption<ColorPalette>[] = VALID_PALETTES.map((p) => ({
  value: p,
  label: p === "default" ? "Default" : "Psevdaryiros",
}));

export function PaletteSwitcher() {
  const { palette, setPalette } = usePalette();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button aria-label="Select color palette" className={styles.button} size="icon" variant="ghost">
        <Palette size={18} />
      </Button>
    );
  }

  return (
    <SelectMenu
      align="end"
      ariaLabel="Select color palette"
      onValueChange={setPalette}
      options={paletteOptions}
      trigger={
        <Button aria-label="Select color palette" className={styles.button} size="icon" variant="ghost">
          <Palette size={18} />
        </Button>
      }
      value={palette}
    />
  );
}
