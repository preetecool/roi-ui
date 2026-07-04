"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@/registry/brook/ui/collapsible/collapsible";
import styles from "./prop-table.module.css";

const CLASS_TYPES = new Set([
  "ReactNode",
  "ReactElement",
  "HTMLElement",
  "HTMLProps",
  "MouseEvent",
  "ChangeEvent",
  "KeyboardEvent",
  "FocusEvent",
  "FormEvent",
]);

const SEPARATORS = new Set(["|", "&", "(", ")", "<", ">", "[", "]", ",", " "]);

function isSeparator(char: string): boolean {
  return SEPARATORS.has(char);
}

function isPascalCase(text: string): boolean {
  if (text.length === 0) {
    return false;
  }
  const firstChar = text[0];
  const isFirstCharUppercase = firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase();
  const hasOnlyLetters = text.split("").every((char) => (char >= "a" && char <= "z") || (char >= "A" && char <= "Z"));
  return isFirstCharUppercase && hasOnlyLetters;
}

function isNumber(value: string): boolean {
  if (value.length === 0) {
    return false;
  }

  let startIndex = 0;
  if (value[0] === "-") {
    if (value.length === 1) {
      return false;
    }
    startIndex = 1;
  }

  let hasDecimal = false;
  for (let i = startIndex; i < value.length; i++) {
    const char = value[i];
    if (char === ".") {
      if (hasDecimal) {
        return false; // Multiple decimals
      }
      hasDecimal = true;
    } else if (char < "0" || char > "9") {
      return false;
    }
  }

  return true;
}

function splitTypeString(typeString: string): string[] {
  const parts: string[] = [];
  let current = "";

  for (const char of typeString) {
    if (isSeparator(char)) {
      if (current) {
        parts.push(current);
        current = "";
      }
      parts.push(char);
    } else {
      current += char;
    }
  }

  if (current) {
    parts.push(current);
  }

  return parts;
}

function highlightType(typeString: string) {
  const parts = splitTypeString(typeString);

  return parts.map((part, index) => {
    const key = `${part}-${index}`;

    if (isSeparator(part)) {
      return (
        <span className={styles.separator} key={key}>
          {part}
        </span>
      );
    }

    if (CLASS_TYPES.has(part) || isPascalCase(part)) {
      return (
        <span className={styles.typeClass} key={key}>
          {part}
        </span>
      );
    }

    switch (part) {
      case "boolean":
        return (
          <span className={styles.booleanValue} key={key}>
            {part}
          </span>
        );
      case "number":
        return (
          <span className={styles.numberValue} key={key}>
            {part}
          </span>
        );
      case "function":
      case "void":
        return (
          <span className={styles.functionValue} key={key}>
            {part}
          </span>
        );
      default:
        return <span key={key}>{part}</span>;
    }
  });
}

function getSimpleType(typeString: string): string {
  const pipeIndex = typeString.indexOf("|");
  const firstType = pipeIndex !== -1 ? typeString.slice(0, pipeIndex).trim() : typeString.trim();

  if (firstType.startsWith('"') && firstType.endsWith('"')) {
    return "string";
  }

  return firstType;
}

function renderDefaultValue(defaultValue?: string) {
  if (!defaultValue) {
    return <span className={styles.defaultEmpty}>-</span>;
  }

  if (defaultValue.startsWith('"') && defaultValue.endsWith('"')) {
    return <span className={styles.stringValue}>{defaultValue}</span>;
  }

  if (defaultValue === "true" || defaultValue === "false") {
    return <span className={styles.booleanValue}>{defaultValue}</span>;
  }

  if (isNumber(defaultValue)) {
    return <span className={styles.numberValue}>{defaultValue}</span>;
  }

  return defaultValue;
}

function PropTable({ className, children, ...props }: ComponentProps<"section">) {
  return (
    <section aria-label="Component props" className={cn(styles.container, className)} {...props}>
      <div className={styles.header}>
        <div className={styles.headerCell}>Prop</div>
        <div className={styles.headerCell}>Type</div>
        <div className={styles.headerCell}>Default</div>
      </div>
      <div className={styles.body}>{children}</div>
    </section>
  );
}

type PropTableRowProps = {
  name: string;
  type: string;
  defaultValue?: string;
  className?: string;
  children?: ReactNode;
};

function PropTableRow({ name, type, defaultValue, className, children }: PropTableRowProps) {
  return (
    <Collapsible className={cn(styles.collapsible, className)}>
      <CollapsibleTrigger className={styles.trigger}>
        <div className={styles.summaryGrid}>
          <code className={styles.code}>{name}</code>
          <code className={styles.typeCode}>{highlightType(getSimpleType(type))}</code>
          <div className={styles.defaultCell}>
            {defaultValue ? (
              <code className={styles.code}>{renderDefaultValue(defaultValue)}</code>
            ) : (
              renderDefaultValue()
            )}
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsiblePanel className={styles.panel} hiddenUntilFound>
        <div className={styles.panelRow}>
          <div className={styles.detailLabel}>Name</div>
          <div className={styles.detailValue}>
            <code className={styles.code}>{name}</code>
          </div>
        </div>

        <div className={styles.panelRow}>
          <div className={styles.detailLabel}>Description</div>
          <div className={styles.detailValueSpan}>{children}</div>
        </div>

        <div className={styles.panelRow}>
          <div className={styles.detailLabel}>Type</div>
          <div className={styles.detailValueSpan}>
            <code className={styles.typeCode}>{highlightType(type)}</code>
          </div>
        </div>

        <div className={styles.panelRow}>
          <div className={styles.detailLabel}>Default</div>
          <div className={styles.detailValue}>
            {defaultValue ? (
              <code className={styles.code}>{renderDefaultValue(defaultValue)}</code>
            ) : (
              renderDefaultValue()
            )}
          </div>
        </div>
      </CollapsiblePanel>
    </Collapsible>
  );
}

export { PropTable, PropTableRow };
