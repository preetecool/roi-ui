import { Index } from "@/registry/__index__";

/**
 * Get component file paths from __index__ (build-time file metadata)
 */
export function getRegistryFiles(name: string): string[] | null {
  const item = Index[name];
  return item?.files || null;
}

/**
 * Get both CSS Modules and Tailwind variants for a component
 */
export function getComponentVariants(
  name: string
): { cssModules: string[] | null; tailwind: string[] | null } {
  return {
    cssModules: getRegistryFiles(name),
    tailwind: getRegistryFiles(`${name}-tailwind`),
  };
}

/**
 * Get a registry item by name (for component rendering)
 */
export function getRegistryItem(name: string) {
  return Index[name] || null;
}

/**
 * Get the type of a registry entry (example, block, or ui)
 */
export function getRegistryType(
  name: string
): "example" | "block" | "ui" | null {
  const item = Index[name];
  return item ? item.type : null;
}
