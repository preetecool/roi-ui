"use client";

import { useEffect } from "react";
import { useTOC } from "./toc-context";
import type { TOCItemType } from "fumadocs-core/server";

interface TOCUpdaterProps {
  toc: TOCItemType[] | null;
}

export function TOCUpdater({ toc }: TOCUpdaterProps) {
  const { setToc } = useTOC();

  useEffect(() => {
    setToc(toc);

    return () => setToc(null);
  }, [toc, setToc]);

  return null;
}
