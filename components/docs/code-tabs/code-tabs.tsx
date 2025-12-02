"use client";

import React from "react";
import { StyleSelector } from "@/components/docs/style-selector/style-selector";
import { useStyle } from "@/components/providers/style-provider";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
import {
  TabsContent as BaseTabsContent,
  TabsList as BaseTabsList,
  TabsTrigger as BaseTabsTrigger,
  Tabs,
} from "@/registry/brook/ui/tabs/tabs";
import styles from "./code-tabs.module.css";

type CodeTabsProps = {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  variant?: "installation" | "package";
  onValueChange?: (value: string) => void;
};

type CodeTabsListProps = React.ComponentProps<typeof BaseTabsList> & {
  showCopy?: boolean;
  showStyleSelector?: boolean;
};

// Small delay to ensure DOM is fully rendered before extracting code text
const DOM_RENDER_DELAY_MS = 50;

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

/**
 * Context for compound component pattern
 * Shares variant and container ref between CodeTabs parent and its children
 */
const CodeTabsContext = React.createContext<{
  variant: "installation" | "package";
  containerRef: React.RefObject<HTMLDivElement | null>;
}>({
  variant: "installation",
  containerRef: { current: null },
});

export function CodeTabs({
  children,
  defaultValue = "cli",
  value,
  variant = "installation",
  onValueChange,
}: CodeTabsProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <CodeTabsContext.Provider value={{ variant, containerRef }}>
      <div
        className={variant === "package" ? styles.packageContainer : undefined}
        ref={containerRef}
      >
        <Tabs
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          value={value}
        >
          {children}
        </Tabs>
      </div>
    </CodeTabsContext.Provider>
  );
}

export function CodeTabsList({
  children,
  showCopy = false,
  showStyleSelector = false,
  ...props
}: CodeTabsListProps) {
  const { variant, containerRef } = React.use(CodeTabsContext);
  const [commandText, setCommandText] = React.useState("");
  const { style } = useStyle();

  const isPackageVariant = variant === "package";
  const shouldShowCopy = showCopy || isPackageVariant;
  const shouldShowStyleSelector = showStyleSelector || isPackageVariant;

  const styleSuffix = style === "tailwind" ? "-tailwind" : "";
  const currentCommandText = commandText
    ? commandText.replace(/-tailwind|-css-modules/g, styleSuffix)
    : "";

  React.useEffect(() => {
    if (!shouldShowCopy) return;

    const timeoutId = setTimeout(() => {
      if (!containerRef.current) return;
      const text = findFirstVisibleCodeText(containerRef.current);
      if (text) setCommandText(text);
    }, DOM_RENDER_DELAY_MS);

    return () => clearTimeout(timeoutId);
  }, [shouldShowCopy, style]);

  if (isPackageVariant) {
    return (
      <div className={styles.packageListWrapper}>
        <BaseTabsList className={styles.packageList} {...props}>
          {children}
        </BaseTabsList>
        <div className={styles.toolbar}>
          {shouldShowStyleSelector && <StyleSelector />}
          {shouldShowCopy && <CopyButton code={currentCommandText} />}
        </div>
      </div>
    );
  }

  return (
    <BaseTabsList className={styles.installationList} {...props}>
      {children}
    </BaseTabsList>
  );
}

export function CodeTabsTrigger({
  children,
  ...props
}: React.ComponentProps<typeof BaseTabsTrigger>) {
  const { variant } = React.use(CodeTabsContext);

  if (variant === "package") {
    return (
      <BaseTabsTrigger className={styles.packageTrigger} {...props}>
        {children}
      </BaseTabsTrigger>
    );
  }

  return (
    <BaseTabsTrigger className={styles.installationTrigger} {...props}>
      {children}
    </BaseTabsTrigger>
  );
}

export function CodeTabsContent({
  children,
  value,
  ...props
}: React.ComponentProps<typeof BaseTabsContent>) {
  const isManual = value === "manual";

  return (
    <BaseTabsContent
      className={styles.installationContent}
      data-manual={isManual ? "true" : undefined}
      value={value}
      {...props}
    >
      {children}
    </BaseTabsContent>
  );
}
