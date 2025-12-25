"use client";

import { type ColorPalette, usePalette, VALID_PALETTES } from "@/components/providers/palette-provider";
import {
	Select,
	SelectIcon,
	SelectItem,
	SelectItemIndicator,
	SelectItemText,
	SelectList,
	SelectPopup,
	SelectPortal,
	SelectPositioner,
	SelectSpacer,
	SelectTrigger,
	SelectValue,
} from "@/registry/brook/ui/select/select";

import styles from "./palette-selector.module.css";

const paletteOptions: { value: ColorPalette; label: string }[] = [
	{ value: "default", label: "Default" },
	{ value: "psevdaryiros", label: "Psevdaryiros" },
];

export function PaletteSelector() {
	const { palette, setPalette } = usePalette();

	return (
		<Select items={paletteOptions} onValueChange={(value) => setPalette(value as ColorPalette)} value={palette}>
			<SelectTrigger aria-label="Select color palette" className={styles.trigger}>
				<SelectValue>
					{(value) => {
						const selected = paletteOptions.find((opt) => opt.value === value);
						return <span>{selected?.label}</span>;
					}}
				</SelectValue>
				<SelectIcon />
			</SelectTrigger>
			<SelectPortal>
				<SelectPositioner sideOffset={8}>
					<SelectPopup className={styles.popup}>
						<SelectSpacer />
						<SelectList>
							{paletteOptions.map(({ label, value }) => (
								<SelectItem className={styles.item} key={value} value={value}>
									<SelectItemIndicator />
									<SelectItemText>{label}</SelectItemText>
								</SelectItem>
							))}
						</SelectList>
						<SelectSpacer />
					</SelectPopup>
				</SelectPositioner>
			</SelectPortal>
		</Select>
	);
}
