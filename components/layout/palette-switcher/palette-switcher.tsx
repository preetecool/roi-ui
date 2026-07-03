"use client";

import { Palette } from "lucide-react";
import { PALETTE_OPTIONS, usePalette } from "@/components/providers/palette-provider";
import { SelectMenu } from "@/components/shared/select-menu/select-menu";
import { useMounted } from "@/hooks/use-mounted";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./palette-switcher.module.css";

export function PaletteSwitcher() {
  const { palette, setPalette } = usePalette();
  const mounted = useMounted();

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
      options={PALETTE_OPTIONS}
      trigger={
        <Button aria-label="Select color palette" className={styles.button} size="icon" variant="ghost">
          <Palette size={18} />
        </Button>
      }
      value={palette}
    />
  );
}
