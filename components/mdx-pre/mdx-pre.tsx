"use client";

import type React from "react";
import type { ComponentProps, ReactElement } from "react";
import { cloneElement, isValidElement } from "react";
import { useStyle } from "@/components/style-provider";

function hasRoiuiUrl(children: unknown): boolean {
  if (typeof children === "string") {
    return children.includes("roiui.com/r/") && children.includes(".json");
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
    <div
      style={
        title
          ? {
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              overflow: "hidden",
            }
          : undefined
      }
    >
      {title && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 16px",
            backgroundColor: "var(--card)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: "400",
              fontFamily: "monospace",
              color: "var(--muted-foreground)",
            }}
          >
            {title}
          </span>
        </div>
      )}
      <div
        className="code-container"
        style={{
          maxHeight: "400px",
          boxSizing: "border-box",
          overflow: "auto",
          position: "relative",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <pre {...rest} style={{ margin: 0, padding: "1rem" }}>
          {transformedChildren}
        </pre>
      </div>
    </div>
  );
}
