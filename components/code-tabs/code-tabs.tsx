"use client";

import React from "react";
import { useStyle } from "@/components/style-provider";
import { StyleSelector } from "@/components/style-selector/style-selector";
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
  variant?: "installation" | "package";
};

type CodeTabsListProps = React.ComponentProps<typeof BaseTabsList> & {
  showCopy?: boolean;
  showStyleSelector?: boolean;
};

const ASYNC_DELAY_ENSURE_DOM_RENDER = 50;

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
  variant = "installation",
}: CodeTabsProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <CodeTabsContext.Provider value={{ variant, containerRef }}>
      <div
        className={variant === "package" ? styles.packageContainer : undefined}
        ref={containerRef}
      >
        <Tabs defaultValue={defaultValue}>{children}</Tabs>
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

    setTimeout(() => {
      if (!containerRef.current) return;
      const text = findFirstVisibleCodeText(containerRef.current);
      if (text) {
        setCommandText(text);
      }
    }, ASYNC_DELAY_ENSURE_DOM_RENDER);
  }, [style, shouldShowCopy, containerRef]);

  if (isPackageVariant) {
    return (
      <BaseTabsList className={styles.packageList} {...props}>
        <div className={styles.tabsGroup}>{children}</div>
        <div className={styles.toolbar}>
          {shouldShowStyleSelector && <StyleSelector />}
          {shouldShowCopy && <CopyButton code={currentCommandText} />}
        </div>
      </BaseTabsList>
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
  const { variant } = React.use(CodeTabsContext);
  const isManual = value === "manual";

  const className =
    variant === "installation"
      ? isManual
        ? styles.manualContent
        : styles.installationContent
      : undefined;

  return (
    <BaseTabsContent
      className={className}
      data-manual={isManual ? "true" : undefined}
      value={value}
      {...props}
    >
      {children}
    </BaseTabsContent>
  );
}
