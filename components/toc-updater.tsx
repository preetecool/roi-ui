"use client";

import type { TOCItemType } from "fumadocs-core/server";
import { useEffect } from "react";
import { useTOC } from "./toc-context";

type TOCUpdaterProps = {
  toc: TOCItemType[] | null;
};

export function TOCUpdater({ toc }: TOCUpdaterProps) {
  const { setToc } = useTOC();

  useEffect(() => {
    setToc(toc);

    return () => setToc(null);
  }, [toc, setToc]);

  return null;
}
