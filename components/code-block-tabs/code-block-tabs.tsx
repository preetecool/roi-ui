"use client";

import React from "react";
import { Tabs as CustomTabs, TabsList, TabsTrigger } from "@/registry/brook/ui/tabs/tabs";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
import styles from "./code-block-tabs.module.css";

interface CodeBlockTabsProps {
  children: React.ReactNode;
}

export function CodeBlockTabs({ children }: CodeBlockTabsProps) {
  const filteredChildren = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<{ value: string }> => {
      if (!React.isValidElement(child)) return false;
      const props = child.props as { value?: string };
      return props.value === "npm" || props.value === "pnpm";
    },
  );

  const [activeTab, setActiveTab] = React.useState("npm");
  const [commandText, setCommandText] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      const codeElements = containerRef.current.querySelectorAll("pre code, pre, code");
      for (const codeEl of codeElements) {
        const rect = codeEl.getBoundingClientRect();
        if (rect.height > 0 && rect.width > 0) {
          const text = codeEl.textContent?.trim();
          if (text) {
            setCommandText(text);
            break;
          }
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [activeTab]);

  const currentCommandText = commandText || `${activeTab} install package-name`;

  return (
    <div ref={containerRef} className={styles.container}>
      <CustomTabs defaultValue="npm" onValueChange={setActiveTab}>
        <TabsList className={styles.tabsList}>
          <div className={styles.tabsGroup}>
            <TabsTrigger value="npm">npm</TabsTrigger>
            <TabsTrigger value="pnpm">pnpm</TabsTrigger>
          </div>
          <CopyButton code={currentCommandText} className="header-copy-button" />
        </TabsList>
        {filteredChildren}
      </CustomTabs>
    </div>
  );
}
