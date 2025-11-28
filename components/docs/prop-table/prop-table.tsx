"use client";

import type { ReactNode } from "react";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/registry/brook/ui/collapsible/collapsible";
import styles from "./prop-table.module.css";

type PropRow = {
  prop: string;
  type: string;
  default?: string;
  description: string | ReactNode;
};

type PropTableProps = {
  data: PropRow[];
};

const CLASS_TYPES = [
  "ReactNode",
  "ReactElement",
  "HTMLElement",
  "HTMLProps",
  "MouseEvent",
  "ChangeEvent",
  "KeyboardEvent",
  "FocusEvent",
  "FormEvent",
];

const SEPARATORS = ["|", "&", "(", ")", "<", ">", "[", "]", ",", " "];

function isSeparator(char: string): boolean {
  return SEPARATORS.includes(char);
}

function isPascalCase(text: string): boolean {
  if (text.length === 0) {
    return false;
  }
  const firstChar = text[0];
  const isFirstCharUppercase =
    firstChar === firstChar.toUpperCase() &&
    firstChar !== firstChar.toLowerCase();
  const hasOnlyLetters = text
    .split("")
    .every(
      (char) => (char >= "a" && char <= "z") || (char >= "A" && char <= "Z")
    );
  return isFirstCharUppercase && hasOnlyLetters;
}

function isNumber(value: string): boolean {
  if (value.length === 0) {
    return false;
  }

  // Handle negative numbers
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

    // Check if it's a class type (PascalCase)
    // Matches: ReactNode, HTMLElement, etc.
    if (CLASS_TYPES.includes(part) || isPascalCase(part)) {
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

// Extract simple type (first type before |)
function getSimpleType(typeString: string): string {
  const pipeIndex = typeString.indexOf("|");
  const firstType =
    pipeIndex !== -1
      ? typeString.slice(0, pipeIndex).trim()
      : typeString.trim();

  // Remove quotes if it's a string literal type
  if (firstType.startsWith('"') && firstType.endsWith('"')) {
    return "string";
  }

  return firstType;
}

// Render default value with appropriate styling
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

export function PropTable({ data }: PropTableProps) {
  return (
    <section aria-labelledby="props-heading" className={styles.container}>
      <h3 className={styles.visuallyHidden} id="props-heading">
        Component props
      </h3>
      <div className={styles.header}>
        <div className={styles.headerCell}>Prop</div>
        <div className={styles.headerCell}>Type</div>
        <div className={styles.headerCell}>Default</div>
      </div>
      <div className={styles.body}>
        {data.map((row, index) => (
          <Collapsible
            className={styles.collapsible}
            key={`prop-${row.prop}-${index}`}
          >
            <CollapsibleTrigger className={styles.trigger}>
              <div className={styles.summaryGrid}>
                <code className={styles.code}>{row.prop}</code>
                <code className={styles.typeCode}>
                  {highlightType(getSimpleType(row.type))}
                </code>
                <div className={styles.defaultCell}>
                  {row.default ? (
                    <code className={styles.code}>
                      {renderDefaultValue(row.default)}
                    </code>
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
                  <code className={styles.code}>{row.prop}</code>
                </div>
              </div>

              <div className={styles.panelRow}>
                <div className={styles.detailLabel}>Description</div>
                <div className={styles.detailValueSpan}>{row.description}</div>
              </div>

              <div className={styles.panelRow}>
                <div className={styles.detailLabel}>Type</div>
                <div className={styles.detailValueSpan}>
                  <code className={styles.typeCode}>
                    {highlightType(row.type)}
                  </code>
                </div>
              </div>

              <div className={styles.panelRow}>
                <div className={styles.detailLabel}>Default</div>
                <div className={styles.detailValue}>
                  {row.default ? (
                    <code className={styles.code}>
                      {renderDefaultValue(row.default)}
                    </code>
                  ) : (
                    renderDefaultValue()
                  )}
                </div>
              </div>
            </CollapsiblePanel>
          </Collapsible>
        ))}
      </div>
    </section>
  );
}
