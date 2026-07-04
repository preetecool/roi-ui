"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils-tailwind";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@/registry/brook/tailwind/ui/collapsible";

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

const codeClass = "font-mono text-xs leading-5 text-[var(--prop-code-color,var(--foreground))]";
const typeCodeClass = "font-mono text-xs leading-5 text-[var(--prop-type-color,var(--muted-foreground))]";
const typeClassClass = "text-[var(--prop-type-class-color,var(--foreground))]";
const stringValueClass = "text-[var(--prop-string-color,var(--foreground))]";
const booleanValueClass = "text-[var(--prop-boolean-color,var(--foreground))]";
const numberValueClass = "text-[var(--prop-number-color,var(--foreground))]";
const functionValueClass = "text-[var(--prop-function-color,var(--foreground))]";

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
        <span className="text-muted-foreground" key={key}>
          {part}
        </span>
      );
    }

    if (CLASS_TYPES.has(part) || isPascalCase(part)) {
      return (
        <span className={typeClassClass} key={key}>
          {part}
        </span>
      );
    }

    switch (part) {
      case "boolean":
        return (
          <span className={booleanValueClass} key={key}>
            {part}
          </span>
        );
      case "number":
        return (
          <span className={numberValueClass} key={key}>
            {part}
          </span>
        );
      case "function":
      case "void":
        return (
          <span className={functionValueClass} key={key}>
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
    return <span className="text-muted-foreground">-</span>;
  }

  if (defaultValue.startsWith('"') && defaultValue.endsWith('"')) {
    return <span className={stringValueClass}>{defaultValue}</span>;
  }

  if (defaultValue === "true" || defaultValue === "false") {
    return <span className={booleanValueClass}>{defaultValue}</span>;
  }

  if (isNumber(defaultValue)) {
    return <span className={numberValueClass}>{defaultValue}</span>;
  }

  return defaultValue;
}

function PropTable({ className, children, ...props }: ComponentProps<"section">) {
  return (
    <section
      aria-label="Component props"
      className={cn("mb-[var(--space-lg)] flex flex-col border-[0.5px] border-border/70", className)}
      {...props}
    >
      {/* pr-12 = 16px + trigger chevron (16px) + gap (16px), so columns align with rows */}
      <div className="grid grid-cols-1 gap-4 border-border/70 border-b-[0.5px] bg-[var(--mix-card-33-bg)] py-2 pr-12 pl-4 md:grid-cols-[200px_1fr_1fr]">
        <div className="font-medium text-foreground text-sm">Prop</div>
        <div className="hidden font-medium text-foreground text-sm md:block">Type</div>
        <div className="hidden font-medium text-foreground text-sm md:block">Default</div>
      </div>
      <div className="flex flex-col">{children}</div>
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

const panelRowClass =
  "grid grid-cols-1 items-start gap-2 border-b-[0.5px] border-border/50 px-4 py-3 first:pt-4 last:border-b-0 last:pb-4 md:grid-cols-[200px_1fr_1fr] md:gap-4 md:border-b-0";
const detailLabelClass = "font-normal text-[13px] text-muted-foreground leading-5";
const detailValueClass = "break-words text-[13px] text-foreground leading-[1.6]";

function PropTableRow({ name, type, defaultValue, className, children }: PropTableRowProps) {
  return (
    <Collapsible className={cn("w-full max-w-none border-border/70 border-b-[0.5px] last:border-b-0", className)}>
      <CollapsibleTrigger className="focus-visible:-outline-offset-2 flex w-full items-center justify-between gap-4 rounded-none border-none bg-[var(--mix-card-33-bg)] px-4 py-2 hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring">
        <div className="grid flex-1 grid-cols-1 items-center gap-4 text-left md:grid-cols-[200px_1fr_1fr]">
          <code className={codeClass}>{name}</code>
          <code className={cn(typeCodeClass, "hidden md:block")}>{highlightType(getSimpleType(type))}</code>
          <div className="hidden items-center justify-start md:flex">
            {defaultValue ? (
              <code className={codeClass}>{renderDefaultValue(defaultValue)}</code>
            ) : (
              renderDefaultValue()
            )}
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsiblePanel
        className={cn(
          "justify-start bg-[var(--mix-card-50-bg)] transition-none",
          "data-[starting-style]:h-[var(--collapsible-panel-height)]",
          "data-[closed]:h-0",
          "data-[ending-style]:h-0 data-[ending-style]:transition-[height] data-[ending-style]:duration-200 data-[ending-style]:ease-[var(--ease-out-expo)]",
          "motion-reduce:data-[ending-style]:transition-none"
        )}
        hiddenUntilFound
      >
        <div className={panelRowClass}>
          <div className={detailLabelClass}>Name</div>
          <div className={detailValueClass}>
            <code className={codeClass}>{name}</code>
          </div>
        </div>

        <div className={panelRowClass}>
          <div className={detailLabelClass}>Description</div>
          <div className={cn(detailValueClass, "md:col-span-2")}>{children}</div>
        </div>

        <div className={panelRowClass}>
          <div className={detailLabelClass}>Type</div>
          <div className={cn(detailValueClass, "md:col-span-2")}>
            <code className={typeCodeClass}>{highlightType(type)}</code>
          </div>
        </div>

        <div className={panelRowClass}>
          <div className={detailLabelClass}>Default</div>
          <div className={detailValueClass}>
            {defaultValue ? (
              <code className={codeClass}>{renderDefaultValue(defaultValue)}</code>
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
