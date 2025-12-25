"use client";

import { Palette } from "lucide-react";
import { useEffect, useState } from "react";
import { type ColorPalette, usePalette, VALID_PALETTES } from "@/components/providers/palette-provider";
import { Button } from "@/registry/brook/ui/button/button";
import {
	Select,
	SelectItem,
	SelectItemIndicator,
	SelectItemText,
	SelectPopup,
	SelectPortal,
	SelectPositioner,
	SelectSpacer,
	SelectTrigger,
} from "@/registry/brook/ui/select/select";
import styles from "./palette-switcher.module.css";

const PALETTE_LABELS: Record<ColorPalette, string> = {
	default: "Default",
	psevdaryiros: "Psevdaryiros",
};

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
		<Select value={palette} onValueChange={(value) => setPalette(value as ColorPalette)}>
			<SelectTrigger
				render={
					<Button aria-label="Select color palette" className={styles.button} size="icon" variant="ghost">
						<Palette size={18} />
					</Button>
				}
			/>
			<SelectPortal>
				<SelectPositioner align="end" sideOffset={8}>
					<SelectPopup className={styles.popup}>
						<SelectSpacer />
						{VALID_PALETTES.map((p) => (
							<SelectItem key={p} value={p} className={styles.item}>
								<SelectItemIndicator />
								<SelectItemText>{PALETTE_LABELS[p]}</SelectItemText>
							</SelectItem>
						))}
						<SelectSpacer />
					</SelectPopup>
				</SelectPositioner>
			</SelectPortal>
		</Select>
	);
}
