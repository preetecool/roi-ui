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

export type StyleVariant = "css-modules" | "tailwind";

type StyleContextType = {
  style: StyleVariant;
  setStyle: (style: StyleVariant) => void;
};

const StyleContext = createContext<StyleContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "preferred-style";

type StyleProviderProps = {
  children: ReactNode;
  defaultValue?: StyleVariant;
};

export function StyleProvider({
  children,
  defaultValue = "css-modules",
}: StyleProviderProps) {
  const [style, setValue] = useState<StyleVariant>(defaultValue);

  const handleSetStyle = useCallback((newStyle: StyleVariant) => {
    setValue(newStyle);
    localStorage.setItem(LOCAL_STORAGE_KEY, newStyle);
  }, []);

  // Load saved preference from localStorage before first paint to prevent flash
  useIsoLayoutEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved === "css-modules" || saved === "tailwind") {
      setValue(saved as StyleVariant);
    }
  }, []);

  useIsoLayoutEffect(() => {
    document.documentElement.setAttribute("data-style", style);
  }, [style]);

  const contextValue = useMemo(
    () => ({
      style,
      setStyle: handleSetStyle,
    }),
    [style, handleSetStyle]
  );

  return (
    <StyleContext.Provider value={contextValue}>
      {children}
    </StyleContext.Provider>
  );
}

export function useStyle() {
  const context = useContext(StyleContext);
  if (context === undefined) {
    throw new Error("useStyle must be used within a StyleProvider");
  }
  return context;
}
