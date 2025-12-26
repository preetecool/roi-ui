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

async function readFileSafe(filePath: string, errorMessage: string): Promise<string> {
  try {
    return await readFile(filePath, "utf-8");
  } catch {
    return errorMessage;
  }
}

export async function loadCodeByName(name: string): Promise<string> {
  const files = getRegistryFiles(name);

  if (!files || files.length === 0) {
    return `Component source not found: ${name}`;
  }

  const tsxFile = files.find((f) => f.endsWith(".tsx"));

  if (!tsxFile) {
    return `Component source not found: ${name}.tsx`;
  }

  const filePath = join(process.cwd(), tsxFile);
  return await readFileSafe(filePath, `Component source not found: ${name}.tsx`);
}

export async function loadCodeBySrc(src: string): Promise<string> {
  const filePath = join(process.cwd(), src);
  return await readFileSafe(filePath, `File not found: ${src}`);
}

export function getDisplayTitle(title: string | undefined, name: string | undefined, src: string | undefined): string {
  return title || (name && `${name}.tsx`) || (src && basename(src)) || "Code";
}

export async function loadAllVariants(name: string): Promise<VariantFileData[]> {
  const variants = getComponentVariants(name);
  const results: VariantFileData[] = [];

  if (variants.cssModules && variants.cssModules.length > 0) {
    const files = await loadFilesFromRegistry(variants.cssModules);
    if (files.length > 0) {
      results.push({ variant: "css-modules", files });
    }
  }

  if (variants.tailwind && variants.tailwind.length > 0) {
    const files = await loadFilesFromRegistry(variants.tailwind);
    if (files.length > 0) {
      results.push({ variant: "tailwind", files });
    }
  }

  return results;
}

async function loadFilesFromRegistry(registryFiles: string[]): Promise<FileData[]> {
  return await Promise.all(
    registryFiles.map(async (filePath) => {
      const fullPath = join(process.cwd(), filePath);
      const ext = extname(filePath).slice(1);
      const language = ext === "css" ? "css" : "tsx";

      return {
        name: basename(filePath),
        content: await readFile(fullPath, "utf-8"),
        language,
      };
    })
  );
}
