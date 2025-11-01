"use client";

import type React from "react";
import type { ComponentProps, ReactElement } from "react";
import { cloneElement, isValidElement } from "react";
import { useStyle } from "@/components/style-provider";
import styles from "./mdx-pre.module.css";

function hasRoiuiUrl(children: unknown): boolean {
  if (typeof children === "string") {
    return (children.includes("roiui.com/r/") && children.includes(".json")) ||
           children.includes("@roiui/utils");
  }
  if (Array.isArray(children)) {
    return children.some(hasRoiuiUrl);
  }
  if (isValidElement(children)) {
    return hasRoiuiUrl((children.props as { children?: unknown }).children);
  }
  return false;
}

function transformChildren(children: unknown, toTailwind: boolean): unknown {
  if (typeof children === "string") {
    if (children.includes("roiui.com/r/") && children.includes(".json")) {
      return toTailwind
        ? children.replace(
            /roiui\.com\/r\/([a-z-]+)\.json/g,
            "roiui.com/r/$1-tailwind.json"
          )
        : children.replace(
            /roiui\.com\/r\/([a-z-]+-tailwind)\.json/g,
            (_, name) => `roiui.com/r/${name.replace("-tailwind", "")}.json`
          );
    }
    // Handle @roiui/utils transformation
    if (children.includes("@roiui/utils")) {
      return toTailwind
        ? children.replace(/@roiui\/utils\b/g, "@roiui/tw-utils")
        : children.replace(/@roiui\/tw-utils\b/g, "@roiui/utils");
    }
    return children;
  }

  if (Array.isArray(children)) {
    return children.map((child, index) => {
      const transformed = transformChildren(child, toTailwind);
      // Preserve key if it's a React element, otherwise use index
      if (isValidElement(child) && isValidElement(transformed)) {
        return cloneElement(transformed as ReactElement, {
          key: (child as ReactElement).key ?? index,
        });
      }
      return transformed;
    });
  }

  if (isValidElement(children)) {
    const element = children as ReactElement;
    const transformedChild = transformChildren(
      (element.props as { children?: unknown }).children,
      toTailwind
    );
    return cloneElement(
      element,
      { key: element.key }, // Preserve original key
      transformedChild as React.ReactNode
    );
  }

  return children;
}

export function MdxPre(props: ComponentProps<"pre"> & { title?: string }) {
  const { title, children, ...rest } = props;
  const { style } = useStyle();

  // Check if this pre contains a roiui.com installation command
  const containsRoiuiUrl = hasRoiuiUrl(children);

  // Transform children based on current style
  const transformedChildren = (containsRoiuiUrl
    ? transformChildren(children, style === "tailwind")
    : children) as React.ReactNode;

  return (
    <div className={title ? styles.container : undefined}>
      {title && (
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
        </div>
      )}
      <div className={`code-container ${styles.codeContainer}`}>
        <pre {...rest} className={styles.pre}>
          {transformedChildren}
        </pre>
      </div>
    </div>
  );
}
