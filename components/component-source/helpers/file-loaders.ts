import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { getRegistryType } from "@/lib/registry";

/**
 * Helper: Find first existing file from a list of paths
 */
function findExistingFile(paths: string[]): string | null {
  return paths.find((path) => existsSync(path)) || null;
}

/**
 * Helper: Get all component files (tsx + optional css) from a directory
 */
function getComponentFiles(
  dirPath: string,
  name: string,
  includeCss = true
): { path: string; language: string }[] {
  const files: { path: string; language: string }[] = [];

  const tsxPath = join(dirPath, `${name}.tsx`);
  if (existsSync(tsxPath)) {
    files.push({ path: tsxPath, language: "tsx" });
  }

  if (includeCss) {
    const cssPath = join(dirPath, `${name}.module.css`);
    if (existsSync(cssPath)) {
      files.push({ path: cssPath, language: "css" });
    }
  }

  return files;
}

/**
 * Fallback: Generate UI component paths when not found in __index__
 * Only needed for UI components like button, dialog, etc.
 */
function generateUIComponentPaths(name: string): string[] {
  const basePath = join(process.cwd(), "registry", "brook", "ui");

  return [join(basePath, name, `${name}.tsx`), join(basePath, `${name}.tsx`)];
}

export type FileData = {
  name: string;
  content: string;
  language: string;
};

export type StyleVariant = "css-modules" | "tailwind";

export type VariantFileData = {
  variant: StyleVariant;
  files: FileData[];
};

/**
 * Reads file content safely, returning error message if not found
 */
async function readFileSafe(
  filePath: string,
  errorMessage: string
): Promise<string> {
  try {
    return await readFile(filePath, "utf-8");
  } catch {
    return errorMessage;
  }
}

/**
 * Loads code by component name from registry
 * Uses __index__ to determine type and avoid unnecessary path searching
 */
export async function loadCodeByName(name: string): Promise<string> {
  // Check index first to know if it's example or block
  const type = getRegistryType(name);

  let paths: string[];

  if (type) {
    // Use index to narrow down search - only check the correct directory
    const dir = type === "example" ? "examples" : "blocks";
    paths = [
      join(process.cwd(), "registry", "brook", dir, name, `${name}.tsx`),
      join(process.cwd(), "registry", "brook", dir, `${name}.tsx`),
    ];
  } else {
    // Fallback for UI components (not in index)
    paths = generateUIComponentPaths(name);
  }

  const filePath = findExistingFile(paths);

  if (!filePath) {
    return `Component source not found: ${name}.tsx`;
  }

  return await readFileSafe(
    filePath,
    `Component source not found: ${name}.tsx`
  );
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
export function getDisplayTitle(
  title: string | undefined,
  name: string | undefined,
  src: string | undefined
): string {
  return title || (name && `${name}.tsx`) || (src && basename(src)) || "Code";
}

/**
 * Load both CSS modules and Tailwind variants of a component
 */
export async function loadAllVariants(
  name: string
): Promise<VariantFileData[]> {
  const variantTypes: StyleVariant[] = ["css-modules", "tailwind"];

  const variants = await Promise.all(
    variantTypes.map(async (variant) => {
      const files = await loadVariantFiles(name, variant);
      return files.length > 0 ? { variant, files } : null;
    })
  );

  return variants.filter((v): v is VariantFileData => v !== null);
}

/**
 * Load files for a specific variant (CSS modules or Tailwind)
 */
async function loadVariantFiles(
  name: string,
  variant: StyleVariant
): Promise<FileData[]> {
  const basePath =
    variant === "css-modules"
      ? join(process.cwd(), "registry", "brook")
      : join(process.cwd(), "registry", "brook", "tailwind");

  const includeCss = variant === "css-modules";

  // Define search directories in priority order
  const searchDirs = [
    join(basePath, "ui", name),
    join(basePath, "ui"),
    join(basePath, "examples", name),
    join(basePath, "examples"),
    join(basePath, "blocks", name),
    join(basePath, "blocks"),
  ];

  for (const dir of searchDirs) {
    const componentFiles = getComponentFiles(dir, name, includeCss);

    if (componentFiles.length > 0) {
      return await Promise.all(
        componentFiles.map(async ({ path, language }) => ({
          name: basename(path),
          content: await readFile(path, "utf-8"),
          language,
        }))
      );
    }
  }

  return [];
}
