"use client";

import React from "react";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
import {
  Tabs as CustomTabs,
  TabsList,
  TabsTrigger,
} from "@/registry/brook/ui/tabs/tabs";
import styles from "./code-block-tabs.module.css";

type CodeBlockTabsProps = {
  children: React.ReactNode;
};

const CODE_DETECTION_DELAY_MS = 100;

function isVisibleElement(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return rect.height > 0 && rect.width > 0;
}

function findFirstVisibleCodeText(container: HTMLElement): string | null {
  const codeElements = container.querySelectorAll("pre code, pre, code");

  for (const codeEl of codeElements) {
    if (isVisibleElement(codeEl)) {
      const text = codeEl.textContent?.trim();
      if (text) {
        return text;
      }
    }
  }

  return null;
}

export function CodeBlockTabs({ children }: CodeBlockTabsProps) {
  const filteredChildren = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<{ value: string }> => {
      if (!React.isValidElement(child)) {
        return false;
      }
      const props = child.props as { value?: string };
      return props.value === "npm" || props.value === "pnpm";
    }
  );

  const [activeTab, setActiveTab] = React.useState("npm");
  const [commandText, setCommandText] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!containerRef.current) {
        return;
      }

      const text = findFirstVisibleCodeText(containerRef.current);
      if (text) {
        setCommandText(text);
      }
    }, CODE_DETECTION_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const currentCommandText = commandText || `${activeTab} install package-name`;

  return (
    <div className={styles.container} ref={containerRef}>
      <CustomTabs defaultValue="npm" onValueChange={setActiveTab}>
        <TabsList className={styles.tabsList}>
          <div className={styles.tabsGroup}>
            <TabsTrigger className={styles.trigger} value="npm">
              npm
            </TabsTrigger>
            <TabsTrigger className={styles.trigger} value="pnpm">
              pnpm
            </TabsTrigger>
          </div>
          <CopyButton code={currentCommandText} />
        </TabsList>
        {filteredChildren}
      </CustomTabs>
    </div>
  );
}
