"use client";

import { useEffect, useState } from "react";
import { StyleSelector } from "@/components/docs/style-selector/style-selector";
import { useStyle } from "@/components/providers/style-provider";
import { highlightCode } from "@/lib/highlight-code";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
import codeTabsStyles from "@/components/docs/code-tabs/code-tabs-shared.module.css";

type GlobalsCSSClientProps = {
  cssModulesContent: string;
  tailwindContent: string;
};

export function GlobalsCSSClient({
  cssModulesContent,
  tailwindContent,
}: GlobalsCSSClientProps) {
  const { style } = useStyle();
  const [highlightedCode, setHighlightedCode] = useState("");

  const content = style === "tailwind" ? tailwindContent : cssModulesContent;

  useEffect(() => {
    highlightCode(content, "css").then(setHighlightedCode);
  }, [content]);

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
