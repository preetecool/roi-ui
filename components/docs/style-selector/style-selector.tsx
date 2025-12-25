"use client";

import { useStyle } from "@/components/providers/style-provider";
import { SelectMenu, type SelectMenuOption } from "@/components/shared/select-menu/select-menu";

type StyleValue = "css-modules" | "tailwind";

const styleOptions: SelectMenuOption<StyleValue>[] = [
  { value: "css-modules", label: "CSS Modules" },
  { value: "tailwind", label: "Tailwind CSS" },
];

export function StyleSelector() {
  const { style, setStyle } = useStyle();

  return (
    <SelectMenu ariaLabel="Select style framework" onValueChange={setStyle} options={styleOptions} value={style} />
  );
}
