import { highlightCode } from "@/lib/highlight-code";
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

/**
 * Transforms import paths in code
 * Converts: @/registry/brook/ui/button/button -> @/components/ui/button/button
 */
export function transformCode(code: string): string {
  const REGISTRY_PATH = "@/registry/brook/ui/";
  const COMPONENT_PATH = "@/components/ui/";

  return code.replaceAll(REGISTRY_PATH, COMPONENT_PATH);
}

/**
 * Process a single file: transform and highlight
 */
export async function processFile(file: FileData): Promise<ProcessedFile> {
  const transformedContent = transformCode(file.content);
  const highlightedContent = await highlightCode(transformedContent, file.language);

  return {
    name: file.name,
    content: transformedContent,
    highlightedContent,
  };
}

/**
 * Process multiple files
 */
export async function processFiles(files: FileData[]): Promise<ProcessedFile[]> {
  return await Promise.all(files.map(processFile));
}

/**
 * Process all variants with their files
 */
export async function processVariants(variants: VariantFileData[]): Promise<ProcessedVariant[]> {
  return await Promise.all(
    variants.map(async (variant) => ({
      variant: variant.variant,
      files: await processFiles(variant.files),
    }))
  );
}
