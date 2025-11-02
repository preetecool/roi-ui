"use client";

import type { ReactNode } from "react";
import { PackageManagerProvider } from "./package-manager-provider";
import { StyleProvider } from "./style-provider";

/**
 * DocsProvider composes all documentation-specific providers
 * - StyleProvider: Manages CSS Modules vs Tailwind preference
 * - PackageManagerProvider: Manages npm/pnpm/yarn/bun preference
 */
export function DocsProvider({ children }: { children: ReactNode }) {
  return (
    <StyleProvider>
      <PackageManagerProvider>{children}</PackageManagerProvider>
    </StyleProvider>
  );
}
