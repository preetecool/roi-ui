import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cacheLife } from "next/cache";
import type { ColorPalette } from "@/components/providers/palette-provider";
import { highlightCode } from "@/lib/highlight-code";
import { GlobalsCSSClient } from "./globals-css-client";

const CSS_VAR_PATTERN = /^(\s*)(--[\w-]+):\s*(.+?);?\s*$/;
const TRAILING_SEMICOLON = /;$/;
const MULTIPLE_NEWLINES = /\n{3,}/g;

function countBraces(line: string, currentCount: number): number {
  let count = currentCount;
  for (const char of line) {
    if (char === "{") {
      count += 1;
    }
    if (char === "}") {
      count -= 1;
    }
  }
  return count;
}

function shouldSkipForCssModules(line: string): boolean {
  const trimmed = line.trim();
  if (line.includes('@import "tailwindcss/')) {
    return true;
  }
  const layerDeclarations = ["@layer all;", "@layer base;", "@layer theme;", "@layer components;", "@layer utilities;"];
  return layerDeclarations.includes(trimmed);
}

function filterCssForStyle(css: string, style: "css-modules" | "tailwind"): string {
  if (style === "tailwind") {
    return css;
  }

  const lines = css.split("\n");
  const filteredLines: string[] = [];
  let insideThemeBlock = false;
  let braceCount = 0;

  for (const line of lines) {
    if (shouldSkipForCssModules(line)) {
      continue;
    }

    if (line.includes("@theme inline")) {
      insideThemeBlock = true;
      braceCount = 1;
      continue;
    }

    if (insideThemeBlock) {
      braceCount = countBraces(line, braceCount);
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
  if (palette === "default") {
    return values;
  }

  const lines = css.split("\n");
  let inTargetBlock = false;
  let braceCount = 0;

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
      braceCount = countBraces(line, braceCount);

      const varMatch = line.match(CSS_VAR_PATTERN);
      if (varMatch) {
        values[varMatch[1]] = varMatch[2].replace(TRAILING_SEMICOLON, "");
      }

      if (braceCount === 0 && line.includes("}")) {
        inTargetBlock = false;
      }
    }
  }

  return values;
}

function isLightBlockStart(line: string, inDarkBlock: boolean): boolean {
  const hasLightSelector = line.includes(".light,") || line.includes('[data-theme="light"],');
  const hasRootSelector = line.includes(":root {");
  const noPalette = !line.includes("data-palette");

  if (!noPalette) {
    return false;
  }
  if (line.includes(".light,")) {
    return true;
  }
  if ((hasLightSelector || hasRootSelector) && !inDarkBlock) {
    return true;
  }
  return false;
}

function isDarkBlockStart(line: string): boolean {
  const hasDarkSelector = line.includes(".dark,") || line.includes('[data-theme="dark"]');
  return hasDarkSelector && !line.includes("data-palette");
}

type ThemeContext = {
  lightValues: Record<string, string>;
  darkValues: Record<string, string>;
  inLightBlock: boolean;
  inDarkBlock: boolean;
};

function replaceVarValue(line: string, ctx: ThemeContext): string {
  const varMatch = line.match(CSS_VAR_PATTERN);
  if (!varMatch) {
    return line;
  }

  const [, indent, varName] = varMatch;
  if (ctx.inLightBlock && ctx.lightValues[varName]) {
    return `${indent}${varName}: ${ctx.lightValues[varName]};`;
  }
  if (ctx.inDarkBlock && ctx.darkValues[varName]) {
    return `${indent}${varName}: ${ctx.darkValues[varName]};`;
  }
  return line;
}

function filterDefaultPalette(css: string): string {
  const paletteStart = css.indexOf("/* =");
  if (paletteStart !== -1 && css.indexOf("COLOR PALETTE SYSTEM", paletteStart) !== -1) {
    return `${css.substring(0, paletteStart).replace(MULTIPLE_NEWLINES, "\n\n").trimEnd()}\n`;
  }
  return css;
}

function processLine(line: string, state: { inLightBlock: boolean; inDarkBlock: boolean; braceCount: number }) {
  if (isLightBlockStart(line, state.inDarkBlock)) {
    state.inLightBlock = true;
    state.braceCount = 0;
  }

  if (isDarkBlockStart(line)) {
    state.inDarkBlock = true;
    state.inLightBlock = false;
    state.braceCount = 0;
  }

  if (state.inLightBlock || state.inDarkBlock) {
    state.braceCount = countBraces(line, state.braceCount);
  }
}

function checkBlockExit(line: string, state: { inLightBlock: boolean; inDarkBlock: boolean; braceCount: number }) {
  if ((state.inLightBlock || state.inDarkBlock) && state.braceCount === 0 && line.includes("}")) {
    state.inLightBlock = false;
    state.inDarkBlock = false;
  }
}

function filterCssForPalette(css: string, palette: ColorPalette): string {
  if (palette === "default") {
    return filterDefaultPalette(css);
  }

  const lightValues = extractPaletteValues(css, palette, "light");
  const darkValues = extractPaletteValues(css, palette, "dark");

  const lines = css.split("\n");
  const resultLines: string[] = [];
  const state = { inLightBlock: false, inDarkBlock: false, braceCount: 0 };
  let skipPaletteSection = false;

  for (const line of lines) {
    if (line.includes("COLOR PALETTE SYSTEM")) {
      skipPaletteSection = true;
      continue;
    }
    if (skipPaletteSection) {
      continue;
    }

    processLine(line, state);

    const ctx: ThemeContext = {
      lightValues,
      darkValues,
      inLightBlock: state.inLightBlock,
      inDarkBlock: state.inDarkBlock,
    };
    resultLines.push(replaceVarValue(line, ctx));

    checkBlockExit(line, state);
  }

  return `${resultLines.join("\n").replace(MULTIPLE_NEWLINES, "\n\n").trimEnd()}\n`;
}

export async function GlobalsCSS() {
  "use cache";
  cacheLife("max");

  const cssContent = readFileSync(join(process.cwd(), "styles/globals.css"), "utf8");

  const cssModulesContent = filterCssForStyle(cssContent, "css-modules");
  const tailwindContent = filterCssForStyle(cssContent, "tailwind");

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
