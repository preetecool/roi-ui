"use client";

import type { ComponentProps } from "react";
import type { PackageManager } from "@/components/package-manager-provider";
import { usePackageManager } from "@/components/package-manager-provider";
import { CodeTabs } from "./code-tabs";

/**
 * CodeTabs wrapper that syncs with PackageManagerProvider
 * Automatically sets the active tab based on user's package manager preference
 * and updates the preference when the user switches tabs
 */
export function PackageManagerCodeTabs(
  props: Omit<
    ComponentProps<typeof CodeTabs>,
    "variant" | "defaultValue" | "value" | "onValueChange"
  >
) {
  const { packageManager, setPackageManager } = usePackageManager();

  const handleValueChange = (value: string) => {
    if (value === "npm" || value === "pnpm") {
      setPackageManager(value as PackageManager);
    }
  };

  return (
    <CodeTabs
      onValueChange={handleValueChange}
      value={packageManager}
      variant="package"
      {...props}
    />
  );
}
