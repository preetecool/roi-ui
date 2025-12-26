"use client";

import type { ComponentProps } from "react";
import type { PackageManager } from "@/components/providers/package-manager-provider";
import { usePackageManager } from "@/components/providers/package-manager-provider";
import { CodeTabs } from "./code-tabs";

export function PackageManagerCodeTabs(
  props: Omit<ComponentProps<typeof CodeTabs>, "variant" | "defaultValue" | "value" | "onValueChange">
) {
  const { packageManager, setPackageManager } = usePackageManager();

  const handleValueChange = (value: string) => {
    if (value === "npm" || value === "pnpm") {
      setPackageManager(value as PackageManager);
    }
  };

  return <CodeTabs onValueChange={handleValueChange} value={packageManager} variant="package" {...props} />;
}
