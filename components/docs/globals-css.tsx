import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cacheLife } from "next/cache";
import type { ColorPalette } from "@/components/providers/palette-provider";
import { highlightCode } from "@/lib/highlight-code";
import { GlobalsCSSClient } from "./globals-css-client";

function filterCssForStyle(css: string, style: "css-modules" | "tailwind"): string {
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

function extractPaletteValues(css: string, palette: ColorPalette, mode: "light" | "dark"): Record<string, string> {
  const values: Record<string, string> = {};
  if (palette === "default") return values;

  const lines = css.split("\n");
  let inTargetBlock = false;
  let braceCount = 0;

  // Look for the palette block matching the mode
  const selectorPattern =
    mode === "light"
      ? new RegExp(`\\.light\\[data-palette="${palette}"\\]|\\[data-theme="light"\\]\\[data-palette="${palette}"\\]`)
      : new RegExp(`\\.dark\\[data-palette="${palette}"\\]|\\[data-theme="dark"\\]\\[data-palette="${palette}"\\]`);

  for (const line of lines) {
    if (!inTargetBlock && selectorPattern.test(line)) {
      inTargetBlock = true;
      braceCount = 0;
    }

    if (inTargetBlock) {
      for (const char of line) {
        if (char === "{") braceCount++;
        if (char === "}") braceCount--;
      }

      // Extract CSS variable declarations
      const varMatch = line.match(/^\s*(--[\w-]+):\s*(.+?);?\s*$/);
      if (varMatch) {
        values[varMatch[1]] = varMatch[2].replace(/;$/, "");
      }

      if (braceCount === 0 && line.includes("}")) {
        inTargetBlock = false;
      }
    }
  }

  return values;
}

function filterCssForPalette(css: string, palette: ColorPalette): string {
  // For default palette, just remove the palette section entirely
  if (palette === "default") {
    const paletteStart = css.indexOf("/* =");
    if (paletteStart !== -1 && css.indexOf("COLOR PALETTE SYSTEM", paletteStart) !== -1) {
      return (
        css
          .substring(0, paletteStart)
          .replace(/\n{3,}/g, "\n\n")
          .trimEnd() + "\n"
      );
    }
    return css;
  }

  // Extract palette values for light and dark modes
  const lightValues = extractPaletteValues(css, palette, "light");
  const darkValues = extractPaletteValues(css, palette, "dark");

  const lines = css.split("\n");
  const resultLines: string[] = [];
  let inLightBlock = false;
  let inDarkBlock = false;
  let braceCount = 0;
  let skipPaletteSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip the entire palette section at the end
    if (line.includes("COLOR PALETTE SYSTEM")) {
      skipPaletteSection = true;
      continue;
    }
    if (skipPaletteSection) {
      continue;
    }

    // Detect light theme block start
    if (
      (line.includes(".light,") || line.includes('[data-theme="light"],') || line.includes(":root {")) &&
      !line.includes("data-palette") &&
      (line.includes(".light,") || (line.includes(":root") && !inDarkBlock))
    ) {
      inLightBlock = true;
      braceCount = 0;
    }

    // Detect dark theme block start
    if ((line.includes(".dark,") || line.includes('[data-theme="dark"]')) && !line.includes("data-palette")) {
      inDarkBlock = true;
      inLightBlock = false;
      braceCount = 0;
    }

    // Track braces
    if (inLightBlock || inDarkBlock) {
      for (const char of line) {
        if (char === "{") braceCount++;
        if (char === "}") braceCount--;
      }
    }

    // Replace values if we're in a theme block
    let outputLine = line;
    const varMatch = line.match(/^(\s*)(--[\w-]+):\s*(.+?);?\s*$/);
    if (varMatch) {
      const [, indent, varName] = varMatch;
      if (inLightBlock && lightValues[varName]) {
        outputLine = `${indent}${varName}: ${lightValues[varName]};`;
      } else if (inDarkBlock && darkValues[varName]) {
        outputLine = `${indent}${varName}: ${darkValues[varName]};`;
      }
    }

    resultLines.push(outputLine);

    // Check if we're exiting the block
    if ((inLightBlock || inDarkBlock) && braceCount === 0 && line.includes("}")) {
      inLightBlock = false;
      inDarkBlock = false;
    }
  }

  return (
    resultLines
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trimEnd() + "\n"
  );
}

export async function GlobalsCSS() {
  "use cache";
  cacheLife("max");

  const cssContent = readFileSync(join(process.cwd(), "styles/globals.css"), "utf8");

  // Pre-render all style variants
  const cssModulesContent = filterCssForStyle(cssContent, "css-modules");
  const tailwindContent = filterCssForStyle(cssContent, "tailwind");

  // Pre-render all palette variants for each style
  const variants = {
    cssModules: {
      default: filterCssForPalette(cssModulesContent, "default"),
      psevdaryiros: filterCssForPalette(cssModulesContent, "psevdaryiros"),
    },
    tailwind: {
      default: filterCssForPalette(tailwindContent, "default"),
      psevdaryiros: filterCssForPalette(tailwindContent, "psevdaryiros"),
    },
  };

  // Pre-highlight all variants
  const highlighted = {
    cssModules: {
      default: await highlightCode(variants.cssModules.default, "css"),
      psevdaryiros: await highlightCode(variants.cssModules.psevdaryiros, "css"),
    },
    tailwind: {
      default: await highlightCode(variants.tailwind.default, "css"),
      psevdaryiros: await highlightCode(variants.tailwind.psevdaryiros, "css"),
    },
  };

  return <GlobalsCSSClient highlighted={highlighted} variants={variants} />;
}
