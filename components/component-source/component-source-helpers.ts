import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export type FileData = {
  name: string;
  content: string;
  language: string;
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
