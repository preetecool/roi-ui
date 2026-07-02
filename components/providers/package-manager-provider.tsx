"use client";

import { createPreferenceProvider } from "./create-preference-provider";

export type PackageManager = "npm" | "pnpm";

const VALID_PACKAGE_MANAGERS = ["npm", "pnpm"] as const;

const { Provider: PackageManagerProvider, usePreference } = createPreferenceProvider<PackageManager>({
  storageKey: "preferred-package-manager",
  validValues: VALID_PACKAGE_MANAGERS,
  dataAttribute: "data-package-manager",
  defaultValue: "npm",
});

export { PackageManagerProvider };

export function usePackageManager() {
  const { value, setValue } = usePreference();
  return { packageManager: value, setPackageManager: setValue };
}
