"use client";

import { useEffect, useState } from "react";
import codeTabsStyles from "@/components/code-tabs/code-tabs-shared.module.css";
import { withCodeTabsStyle } from "@/components/code-tabs/with-code-tabs-style";
import { useStyle, type StyleVariant } from "@/components/style-provider";
import { StyleSelector } from "@/components/style-selector/style-selector";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/brook/ui/tabs/tabs";

type ProcessedFile = {
  name: string;
  content: string;
  highlightedContent: string;
};

type ProcessedVariant = {
  variant: StyleVariant;
  files: ProcessedFile[];
};

type ComponentSourceClientProps = {
  variants: ProcessedVariant[];
};

// Create styled component using HOC
const CodeTabsContent = withCodeTabsStyle(TabsContent, codeTabsStyles.content);

export function ComponentSourceClient({
  variants,
}: ComponentSourceClientProps) {
  const { style } = useStyle();
  const [activeTab, setActiveTab] = useState(0);

  // Find the current variant based on the global style preference
  const currentVariant =
    variants.find((v) => v.variant === style) || variants[0];
  const files = currentVariant.files;

  useEffect(() => {
    if (activeTab >= files.length) {
      setActiveTab(0);
    }
  }, [style, activeTab, files.length]);

  const safeActiveTab = activeTab < files.length ? activeTab : 0;
  const currentFile = files[safeActiveTab];

  return (
    <div className={codeTabsStyles.wrapper}>
      <Tabs onValueChange={setActiveTab} value={safeActiveTab}>
        <div className={codeTabsStyles.header}>
          <TabsList>
            {files.map((file, index) => (
              <TabsTrigger key={file.name} value={index}>
                {file.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className={codeTabsStyles.actions}>
            {variants.length > 1 && <StyleSelector />}
            <CopyButton code={currentFile.content} />
          </div>
        </div>

        {files.map((file, index) => (
          <CodeTabsContent key={file.name} value={index}>
            <div
              className="code-container"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for Shiki syntax highlighting
              dangerouslySetInnerHTML={{ __html: file.highlightedContent }}
            />
          </CodeTabsContent>
        ))}
      </Tabs>
    </div>
  );
}
