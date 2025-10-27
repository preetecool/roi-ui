import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

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

export async function loadCodeByName(name: string): Promise<string> {
  const possiblePaths = [
    join(process.cwd(), "registry", "brook", "examples", name, `${name}.tsx`),
    join(process.cwd(), "registry", "brook", "examples", `${name}.tsx`),
    join(process.cwd(), "registry", "brook", "blocks", name, `${name}.tsx`),
    join(process.cwd(), "registry", "brook", "blocks", `${name}.tsx`),
  ];

  for (const filePath of possiblePaths) {
    try {
      return await readFile(filePath, "utf-8");
    } catch {
      // Continue to next path
    }
  }

  return `Component source not found: ${name}.tsx`;
}

export async function loadMultipleFiles(
  name: string
): Promise<FileData[] | null> {
  // Check if component has a folder (multi-file)
  const possibleDirs = [
    join(process.cwd(), "registry", "brook", "examples", name),
    join(process.cwd(), "registry", "brook", "blocks", name),
  ];

  for (const dir of possibleDirs) {
    if (existsSync(dir)) {
      const files: FileData[] = [];

      // Check for .tsx file
      const tsxPath = join(dir, `${name}.tsx`);
      if (existsSync(tsxPath)) {
        const content = await readFile(tsxPath, "utf-8");
        files.push({
          name: `${name}.tsx`,
          content,
          language: "tsx",
        });
      }

      // Check for .module.css file
      const cssPath = join(dir, `${name}.module.css`);
      if (existsSync(cssPath)) {
        const content = await readFile(cssPath, "utf-8");
        files.push({
          name: `${name}.module.css`,
          content,
          language: "css",
        });
      }

      // Only return if we have multiple files
      if (files.length > 1) {
        return files;
      }
    }
  }

  return null;
}

export async function loadCodeBySrc(src: string): Promise<string> {
  try {
    const filePath = join(process.cwd(), src);
    return await readFile(filePath, "utf-8");
  } catch (_error) {
    return `File not found: ${src}`;
  }
}

export function transformCode(code: string): string {
  return code.replace(
    /@\/registry\/brook\/ui\/([^"']+)/g,
    "@/components/ui/$1"
  );
}

export function getDisplayTitle(
  title: string | undefined,
  name: string | undefined,
  src: string | undefined
): string {
  if (title) {
    return title;
  }
  if (name) {
    return `${name}.tsx`;
  }
  if (src) {
    const filename = src.split("/").pop();
    return filename || "Code";
  }
  return "Code";
}

/**
 * Load both CSS modules and Tailwind variants of a component
 */
export async function loadAllVariants(
  name: string
): Promise<VariantFileData[]> {
  const variants: VariantFileData[] = [];

  // Load CSS modules variant
  const cssModulesFiles = await loadVariantFiles(name, "css-modules");
  if (cssModulesFiles.length > 0) {
    variants.push({
      variant: "css-modules",
      files: cssModulesFiles,
    });
  }

  // Load Tailwind variant
  const tailwindFiles = await loadVariantFiles(name, "tailwind");
  if (tailwindFiles.length > 0) {
    variants.push({
      variant: "tailwind",
      files: tailwindFiles,
    });
  }

  return variants;
}

async function loadVariantFiles(
  name: string,
  variant: StyleVariant
): Promise<FileData[]> {
  const basePath =
    variant === "css-modules"
      ? join(process.cwd(), "registry", "brook")
      : join(process.cwd(), "registry", "brook", "tailwind");

  const files: FileData[] = [];

  // Check for examples directory (with and without subdirectory)
  const examplesSubdirPath = join(basePath, "examples", name);
  const examplesFilePath = join(basePath, "examples", `${name}.tsx`);

  // Try subdirectory first
  if (existsSync(examplesSubdirPath)) {
    const tsxPath = join(examplesSubdirPath, `${name}.tsx`);
    if (existsSync(tsxPath)) {
      const content = await readFile(tsxPath, "utf-8");
      files.push({
        name: `${name}.tsx`,
        content,
        language: "tsx",
      });
    }

    // For CSS modules, also check for .module.css
    if (variant === "css-modules") {
      const cssPath = join(examplesSubdirPath, `${name}.module.css`);
      if (existsSync(cssPath)) {
        const content = await readFile(cssPath, "utf-8");
        files.push({
          name: `${name}.module.css`,
          content,
          language: "css",
        });
      }
    }

    return files;
  }

  // Try direct file
  if (existsSync(examplesFilePath)) {
    const content = await readFile(examplesFilePath, "utf-8");
    files.push({
      name: `${name}.tsx`,
      content,
      language: "tsx",
    });
    return files;
  }

  // Check blocks directory
  const blocksSubdirPath = join(basePath, "blocks", name);
  const blocksFilePath = join(basePath, "blocks", `${name}.tsx`);

  if (existsSync(blocksSubdirPath)) {
    const tsxPath = join(blocksSubdirPath, `${name}.tsx`);
    if (existsSync(tsxPath)) {
      const content = await readFile(tsxPath, "utf-8");
      files.push({
        name: `${name}.tsx`,
        content,
        language: "tsx",
      });
    }

    if (variant === "css-modules") {
      const cssPath = join(blocksSubdirPath, `${name}.module.css`);
      if (existsSync(cssPath)) {
        const content = await readFile(cssPath, "utf-8");
        files.push({
          name: `${name}.module.css`,
          content,
          language: "css",
        });
      }
    }

    return files;
  }

  if (existsSync(blocksFilePath)) {
    const content = await readFile(blocksFilePath, "utf-8");
    files.push({
      name: `${name}.tsx`,
      content,
      language: "tsx",
    });
    return files;
  }

  return files;
}
