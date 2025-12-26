"use client";

import type { ReactNode } from "react";
import { PackageManagerProvider } from "./package-manager-provider";
import { StyleProvider } from "./style-provider";

export function DocsProvider({ children }: { children: ReactNode }) {
  return (
    <StyleProvider>
      <PackageManagerProvider>{children}</PackageManagerProvider>
    </StyleProvider>
  );
}
