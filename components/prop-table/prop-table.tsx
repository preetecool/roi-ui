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

// Regex patterns at top level for performance
const SEPARATOR_PATTERN = /([|&()<>[\],\s]+)/;
const SEPARATOR_TEST_PATTERN = /^[|&()<>[\],\s]+$/;
const PASCAL_CASE_PATTERN = /^[A-Z][a-zA-Z]*$/;
const STRING_LITERAL_PATTERN = /^"(.+)"$/;

function highlightType(typeString: string) {
  const parts = typeString.split(SEPARATOR_PATTERN);

  return parts.map((part, index) => {
    const key = `${part}-${index}`;

    if (SEPARATOR_TEST_PATTERN.test(part)) {
      return (
        <span className={styles.separator} key={key}>
          {part}
        </span>
      );
    }

    // Check if it's a class type (PascalCase)
    // Matches: ReactNode, HTMLElement, etc.
    if (CLASS_TYPES.includes(part) || PASCAL_CASE_PATTERN.test(part)) {
      return (
        <span className={styles.typeClass} key={key}>
          {part}
        </span>
      );
    }

    if (part === "boolean") {
      return (
        <span className={styles.booleanValue} key={key}>
          {part}
        </span>
      );
    }

    if (part === "number") {
      return (
        <span className={styles.numberValue} key={key}>
          {part}
        </span>
      );
    }

    if (part === "function" || part === "void") {
      return (
        <span className={styles.functionValue} key={key}>
          {part}
        </span>
      );
    }

    // Default color for primitives like string, etc
    return <span key={key}>{part}</span>;
  });
}

// Extract simple type (first type before |)
function getSimpleType(typeString: string): string {
  const firstType = typeString.split("|")[0].trim();
  // Remove quotes if it's a string literal type
  return firstType.replace(STRING_LITERAL_PATTERN, "string");
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

  // Check if it's a number (including negative numbers and decimals)
  if (/^-?\d+(\.\d+)?$/.test(defaultValue)) {
    return <span className={styles.numberValue}>{defaultValue}</span>;
  }

  return defaultValue;
}

export function PropTable({ data }: PropTableProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerCell}>Prop</div>
        <div className={styles.headerCell}>Type</div>
        <div className={styles.headerCell}>Default</div>
      </div>
      {data.map((row, index) => (
        <Collapsible
          className={styles.collapsible}
          hiddenUntilFound
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
          <CollapsiblePanel className={styles.panel}>
            <div className={styles.panelRow}>
              <div className={styles.detailLabel}>Name</div>
              <div className={styles.detailValue}>
                <code className={styles.code}>{row.prop}</code>
              </div>
              <div />
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
              <div />
            </div>
          </CollapsiblePanel>
        </Collapsible>
      ))}
    </div>
  );
}
