import { readFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import type { StyleVariant } from "@/components/providers/style-provider";
import { getComponentVariants, getRegistryFiles } from "@/lib/registry";

export type FileData = {
  name: string;
  content: string;
  language: string;
};

export type VariantFileData = {
  variant: StyleVariant;
  files: FileData[];
};

/**
 * Reads file content safely, returning error message if not found
 */
async function readFileSafe(filePath: string, errorMessage: string): Promise<string> {
  try {
    return await readFile(filePath, "utf-8");
  } catch {
    return errorMessage;
  }
}

/**
 * Loads code by component name using __index__
 */
export async function loadCodeByName(name: string): Promise<string> {
  const files = getRegistryFiles(name);

  if (!files || files.length === 0) {
    return `Component source not found: ${name}`;
  }

  // Get the first .tsx file from registry
  const tsxFile = files.find((f) => f.endsWith(".tsx"));

  if (!tsxFile) {
    return `Component source not found: ${name}.tsx`;
  }

  const filePath = join(process.cwd(), tsxFile);
  return await readFileSafe(filePath, `Component source not found: ${name}.tsx`);
}

/**
 * Loads code from a source path
 */
export async function loadCodeBySrc(src: string): Promise<string> {
  const filePath = join(process.cwd(), src);
  return await readFileSafe(filePath, `File not found: ${src}`);
}

/**
 * Gets display title with fallback logic
 */
export function getDisplayTitle(title: string | undefined, name: string | undefined, src: string | undefined): string {
  return title || (name && `${name}.tsx`) || (src && basename(src)) || "Code";
}

/**
 * Load both CSS modules and Tailwind variants of a component using registry
 */
export async function loadAllVariants(name: string): Promise<VariantFileData[]> {
  const variants = getComponentVariants(name);
  const results: VariantFileData[] = [];

  // Load CSS Modules variant
  if (variants.cssModules && variants.cssModules.length > 0) {
    const files = await loadFilesFromRegistry(variants.cssModules);
    if (files.length > 0) {
      results.push({ variant: "css-modules", files });
    }
  }

  // Load Tailwind variant
  if (variants.tailwind && variants.tailwind.length > 0) {
    const files = await loadFilesFromRegistry(variants.tailwind);
    if (files.length > 0) {
      results.push({ variant: "tailwind", files });
    }
  }

  return results;
}

/**
 * Load files from registry file paths
 */
async function loadFilesFromRegistry(registryFiles: string[]): Promise<FileData[]> {
  return await Promise.all(
    registryFiles.map(async (filePath) => {
      const fullPath = join(process.cwd(), filePath);
      const ext = extname(filePath).slice(1); // Remove leading dot
      const language = ext === "css" ? "css" : "tsx";

      return {
        name: basename(filePath),
        content: await readFile(fullPath, "utf-8"),
        language,
      };
    })
  );
}
