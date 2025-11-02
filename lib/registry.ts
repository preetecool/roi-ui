import { Index } from "@/registry/__index__";

export type RegistryItem = {
  name: string;
  type: "example" | "block";
  component: React.ComponentType;
};

/**
 * Get a registry item by name using the generated __index__ file.
 */
export function getRegistryItem(name: string): RegistryItem | null {
  return Index[name] || null;
}

/**
 * Get the type of a registry entry (example or block)
 * Returns null if not found in registry
 */
export function getRegistryType(name: string): "example" | "block" | null {
  const item = Index[name];
  return item ? item.type : null;
}

/**
 * Legacy function for backward compatibility.
 * Prefer getRegistryItem for better type safety and performance.
 */
export async function getComponent(name: string) {
  try {
    try {
      const component = await import(
        `@/registry/brook/examples/${name}/${name}`
      );
      return (
        component.default || component[name] || Object.values(component)[0]
      );
    } catch {
      const component = await import(`@/registry/brook/examples/${name}`);
      return (
        component.default || component[name] || Object.values(component)[0]
      );
    }
  } catch (_error) {
    return null;
  }
}
