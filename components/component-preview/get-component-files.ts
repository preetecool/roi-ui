import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { transformCode } from "@/components/component-source/component-source-helpers";
import { highlightCode } from "@/lib/highlight-code";

type ProcessedFile = {
  name: string;
  content: string;
  rawContent: string;
  language?: string;
};

export async function getComponentFiles(
  name: string
): Promise<ProcessedFile[] | null> {
  // Check examples folder first
  let componentDir = join(process.cwd(), "registry/brook/examples", name);
  let hasFolder = existsSync(componentDir);

  // Check blocks folder if not in examples
  if (!hasFolder) {
    componentDir = join(process.cwd(), "registry/brook/blocks", name);
    hasFolder = existsSync(componentDir);
  }

  // If no folder found, return null (single file component)
  if (!hasFolder) {
    return null;
  }

  try {
    const entries = await readdir(componentDir, { withFileTypes: true });
    const files = entries.filter((entry) => entry.isFile());

    // Look for tsx and css files
    const tsxFile = files.find((f) => f.name === `${name}.tsx`);
    const cssFile = files.find((f) => f.name === `${name}.module.css`);

    if (!tsxFile) {
      return null;
    }

    const processedFiles: ProcessedFile[] = [];

    // Process TSX file
    const tsxPath = join(componentDir, tsxFile.name);
    const tsxContent = await readFile(tsxPath, "utf-8");
    const transformedTsx = transformCode(tsxContent);
    const highlightedTsx = await highlightCode(transformedTsx, "tsx");

    processedFiles.push({
      name: tsxFile.name,
      content: highlightedTsx,
      rawContent: transformedTsx,
      language: "tsx",
    });

    // Process CSS file if exists
    if (cssFile) {
      const cssPath = join(componentDir, cssFile.name);
      const cssContent = await readFile(cssPath, "utf-8");
      const highlightedCss = await highlightCode(cssContent, "css");

      processedFiles.push({
        name: cssFile.name,
        content: highlightedCss,
        rawContent: cssContent,
        language: "css",
      });
    }

    return processedFiles.length > 1 ? processedFiles : null;
  } catch (_error) {
    return null;
  }
}
