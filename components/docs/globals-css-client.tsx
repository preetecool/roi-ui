"use client";

import codeTabsStyles from "@/components/docs/code-tabs/code-tabs-shared.module.css";
import { PaletteSelector } from "@/components/docs/palette-selector/palette-selector";
import { StyleSelector } from "@/components/docs/style-selector/style-selector";
import { usePalette } from "@/components/providers/palette-provider";
import { useStyle } from "@/components/providers/style-provider";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";

type PaletteVariants = {
  default: string;
  psevdaryiros: string;
};

type GlobalsCSSClientProps = {
  variants: {
    cssModules: PaletteVariants;
    tailwind: PaletteVariants;
  };
  highlighted: {
    cssModules: PaletteVariants;
    tailwind: PaletteVariants;
  };
};

export function GlobalsCSSClient({ variants, highlighted }: GlobalsCSSClientProps) {
  const { style } = useStyle();
  const { palette } = usePalette();

  const styleKey = style === "tailwind" ? "tailwind" : "cssModules";
  const content = variants[styleKey][palette];
  const highlightedCode = highlighted[styleKey][palette];

  return (
    <div className={codeTabsStyles.wrapper}>
      <div className={codeTabsStyles.header}>
        <span>globals.css</span>
        <div className={codeTabsStyles.actions}>
          <PaletteSelector />
          <span className={codeTabsStyles.separator} />
          <StyleSelector />
          <CopyButton code={content} />
        </div>
      </div>

      <div
        className="code-container"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for Shiki syntax highlighting
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  );
}
