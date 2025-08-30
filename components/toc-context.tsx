"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { TOCItemType } from "fumadocs-core/server";

interface TOCContextType {
  toc: TOCItemType[] | null;
  setToc: (toc: TOCItemType[] | null) => void;
}

const TOCContext = createContext<TOCContextType | undefined>(undefined);

export function TOCProvider({ children }: { children: ReactNode }) {
  const [toc, setToc] = useState<TOCItemType[] | null>(null);

  return (
    <TOCContext.Provider value={{ toc, setToc }}>
      {children}
    </TOCContext.Provider>
  );
}

export function useTOC() {
  const context = useContext(TOCContext);
  if (context === undefined) {
    throw new Error("useTOC must be used within a TOCProvider");
  }
  return context;
}