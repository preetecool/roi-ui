import { loadAllVariants } from "./file-loaders";
import { type ProcessedVariant, processVariants } from "./process-files";

export async function getCachedVariants(name: string): Promise<ProcessedVariant[]> {
  const variants = await loadAllVariants(name);
  return await processVariants(variants);
}
