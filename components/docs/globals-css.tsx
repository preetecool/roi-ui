import { readFileSync } from "node:fs";
import { join } from "node:path";
import { highlightCode } from "@/lib/highlight-code";
import { GlobalsCSSClient } from "./globals-css-client";

function filterCssForStyle(
  css: string,
  style: "css-modules" | "tailwind"
): string {
  const lines = css.split("\n");

  if (style === "tailwind") {
    // For Tailwind, include everything
    return css;
  }

  // For CSS Modules, exclude Tailwind-specific imports and layers
  const filteredLines: string[] = [];
  let insideThemeBlock = false;
  let braceCount = 0;

  for (const line of lines) {
    // Skip Tailwind import lines
    if (line.includes('@import "tailwindcss/')) {
      continue;
    }

    // Skip layer declarations (Tailwind-specific)
    if (
      line.trim() === "@layer all;" ||
      line.trim() === "@layer base;" ||
      line.trim() === "@layer theme;" ||
      line.trim() === "@layer components;" ||
      line.trim() === "@layer utilities;"
    ) {
      continue;
    }

    // Detect start of @theme inline block
    if (line.includes("@theme inline")) {
      insideThemeBlock = true;
      braceCount = 1; // Start with 1 to account for the opening brace
      continue;
    }

    // Track braces inside @theme block
    if (insideThemeBlock) {
      for (const char of line) {
        if (char === "{") braceCount++;
        if (char === "}") braceCount--;
      }

      // If we've closed all braces, we're done with the @theme block
      if (braceCount === 0) {
        insideThemeBlock = false;
      }
      continue;
    }

    filteredLines.push(line);
  }

  return filteredLines.join("\n");
}

export async function GlobalsCSS() {
  const cssContent = readFileSync(
    join(process.cwd(), "styles/globals.css"),
    "utf8"
  );

  // Pre-render both versions at build time
  const cssModulesContent = filterCssForStyle(cssContent, "css-modules");
  const tailwindContent = filterCssForStyle(cssContent, "tailwind");

  // Pre-highlight both versions at build time
  const highlightedCssModules = await highlightCode(cssModulesContent, "css");
  const highlightedTailwind = await highlightCode(tailwindContent, "css");

  return (
    <GlobalsCSSClient
      cssModulesContent={cssModulesContent}
      highlightedCssModules={highlightedCssModules}
      highlightedTailwind={highlightedTailwind}
      tailwindContent={tailwindContent}
    />
  );
}
