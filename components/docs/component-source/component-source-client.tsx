"use client";

import { useEffect, useState } from "react";
import codeTabsStyles from "@/components/docs/code-tabs/code-tabs-shared.module.css";
import { withCodeTabsStyle } from "@/components/docs/code-tabs/with-code-tabs-style";
import { StyleSelector } from "@/components/docs/style-selector/style-selector";
import { type StyleVariant, useStyle } from "@/components/providers/style-provider";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/brook/ui/tabs/tabs";

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

const CodeTabsContent = withCodeTabsStyle(TabsContent, codeTabsStyles.content);

export function ComponentSourceClient({ variants }: ComponentSourceClientProps) {
  const { style } = useStyle();
  const [activeTab, setActiveTab] = useState(0);

  const currentVariant = variants.find((v) => v.variant === style) || variants[0];
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
      <Tabs onValueChange={(val: number) => setActiveTab(val)} value={safeActiveTab}>
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
