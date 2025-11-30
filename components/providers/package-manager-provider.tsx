"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useIsoLayoutEffect } from "@/hooks/use-iso-layout-effect";

export type PackageManager = "npm" | "pnpm";

type PackageManagerContextType = {
  packageManager: PackageManager;
  setPackageManager: (pm: PackageManager) => void;
};

const PackageManagerContext = createContext<
  PackageManagerContextType | undefined
>(undefined);

const LOCAL_STORAGE_KEY = "preferred-package-manager";

type PackageManagerProviderProps = {
  children: ReactNode;
  defaultValue?: PackageManager;
};

export function PackageManagerProvider({
  children,
  defaultValue = "npm",
}: PackageManagerProviderProps) {
  const [packageManager, setValue] = useState<PackageManager>(defaultValue);

  const handleSetPackageManager = useCallback((newPm: PackageManager) => {
    setValue(newPm);
    localStorage.setItem(LOCAL_STORAGE_KEY, newPm);
  }, []);

  // Load saved preference from localStorage before first paint to prevent flash
  useIsoLayoutEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved === "npm" || saved === "pnpm") {
      setValue(saved);
    }
  }, []);

  useIsoLayoutEffect(() => {
    document.documentElement.setAttribute(
      "data-package-manager",
      packageManager
    );
  }, [packageManager]);

  const contextValue = useMemo(
    () => ({
      packageManager,
      setPackageManager: handleSetPackageManager,
    }),
    [packageManager, handleSetPackageManager]
  );

  return (
    <PackageManagerContext.Provider value={contextValue}>
      {children}
    </PackageManagerContext.Provider>
  );
}

export function usePackageManager() {
  const context = useContext(PackageManagerContext);
  if (context === undefined) {
    throw new Error(
      "usePackageManager must be used within a PackageManagerProvider"
    );
  }
  return context;
}
