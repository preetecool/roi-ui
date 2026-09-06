"use client";

import type { ReactNode } from "react";
import { PackageManagerProvider } from "./package-manager-provider";

export function DocsProvider({ children }: { children: ReactNode }) {
  return <PackageManagerProvider>{children}</PackageManagerProvider>;
}
