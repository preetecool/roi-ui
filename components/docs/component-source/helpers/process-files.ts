import { highlightCode } from "@/lib/highlight-code";
import { transformRegistryImports } from "@/lib/registry-imports";
import registry from "@/registry.json";
import type { FileData, VariantFileData } from "./file-loaders";

export type ProcessedFile = {
  name: string;
  content: string;
  highlightedContent: string;
};

export type ProcessedVariant = {
  variant: "css-modules" | "tailwind";
  files: ProcessedFile[];
};

export function transformCode(code: string): string {
  return transformRegistryImports(code, registry, false);
}

export async function processFile(file: FileData): Promise<ProcessedFile> {
  const transformedContent = transformCode(file.content);
  const highlightedContent = await highlightCode(transformedContent, file.language);

  return {
    name: file.name,
    content: transformedContent,
    highlightedContent,
  };
}

export async function processFiles(files: FileData[]): Promise<ProcessedFile[]> {
  return await Promise.all(files.map(processFile));
}

export async function processVariants(variants: VariantFileData[]): Promise<ProcessedVariant[]> {
  return await Promise.all(
    variants.map(async (variant) => ({
      variant: variant.variant,
      files: await processFiles(variant.files),
    }))
  );
}
