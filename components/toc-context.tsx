"use client";

import type { TOCItemType } from "fumadocs-core/server";
import { createContext, type ReactNode, useContext, useState } from "react";

type TOCContextType = {
  toc: TOCItemType[] | null;
  setToc: (toc: TOCItemType[] | null) => void;
};

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
