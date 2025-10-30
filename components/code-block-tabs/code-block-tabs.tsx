"use client";

import React from "react";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
import {
  Tabs as CustomTabs,
  TabsList,
  TabsTrigger,
} from "@/registry/brook/ui/tabs/tabs";
import { StyleSelector } from "../style-selector/style-selector";
import styles from "./code-block-tabs.module.css";

type CodeBlockTabsProps = {
  children: React.ReactNode;
  allowedTabs?: string[];
  showStyleSelector?: boolean;
};

// Delay to ensure DOM is fully rendered before detecting code text
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

export function CodeBlockTabs({
  children,
  allowedTabs = ["npm", "pnpm"],
  showStyleSelector = true,
}: CodeBlockTabsProps) {
  const filteredChildren = React.useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child): child is React.ReactElement<{ value: string }> => {
          if (!React.isValidElement(child)) {
            return false;
          }
          const props = child.props as { value?: string };
          return props.value ? allowedTabs.includes(props.value) : false;
        }
      ),
    [children, allowedTabs]
  );

  const [activeTab, setActiveTab] = React.useState(allowedTabs[0] || "npm");
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
      <CustomTabs defaultValue={allowedTabs[0]} onValueChange={setActiveTab}>
        <TabsList id={styles.tabsList}>
          <div className={styles.tabsGroup}>
            {allowedTabs.map((tab) => (
              <TabsTrigger id={styles.trigger} key={tab} value={tab}>
                {tab}
              </TabsTrigger>
            ))}
          </div>
          <div className={styles.rightGroup}>
            {showStyleSelector && <StyleSelector />}
            <CopyButton code={currentCommandText} />
          </div>
        </TabsList>
        {filteredChildren}
      </CustomTabs>
    </div>
  );
}
