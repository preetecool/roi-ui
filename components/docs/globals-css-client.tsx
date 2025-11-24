"use client";

import codeTabsStyles from "@/components/docs/code-tabs/code-tabs-shared.module.css";
import { StyleSelector } from "@/components/docs/style-selector/style-selector";
import { useStyle } from "@/components/providers/style-provider";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";

type GlobalsCSSClientProps = {
  cssModulesContent: string;
  tailwindContent: string;
  highlightedCssModules: string;
  highlightedTailwind: string;
};

export function GlobalsCSSClient({
  cssModulesContent,
  tailwindContent,
  highlightedCssModules,
  highlightedTailwind,
}: GlobalsCSSClientProps) {
  const { style } = useStyle();

  const content = style === "tailwind" ? tailwindContent : cssModulesContent;
  const highlightedCode =
    style === "tailwind" ? highlightedTailwind : highlightedCssModules;

  return (
    <div className={codeTabsStyles.wrapper}>
      <div className={codeTabsStyles.header}>
        <span>globals.css</span>
        <div className={codeTabsStyles.actions}>
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
