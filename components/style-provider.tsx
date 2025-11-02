"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useIsoLayoutEffect } from "@/hooks/use-iso-layout-effect";

type StyleVariant = "css-modules" | "tailwind";

type StyleContextType = {
  style: StyleVariant;
  setStyle: (style: StyleVariant) => void;
};

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export function StyleProvider({ children }: { children: ReactNode }) {
  const [style, setStyle] = useState<StyleVariant>("css-modules");

  // Load saved preference from localStorage before first paint to prevent flash
  useIsoLayoutEffect(() => {
    const saved = localStorage.getItem(
      "preferred-style"
    ) as StyleVariant | null;
    if (saved && (saved === "css-modules" || saved === "tailwind")) {
      setStyle(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-style", style);
  }, [style]);

  const handleSetStyle = (newStyle: StyleVariant) => {
    setStyle(newStyle);
    localStorage.setItem("preferred-style", newStyle);
  };

  return (
    <StyleContext.Provider value={{ style, setStyle: handleSetStyle }}>
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
