"use client";

import { useTOC } from "./toc-context";
import { TableOfContents } from "./toc/toc";

export function TOCDisplay() {
  const { toc } = useTOC();

  if (!toc || toc.length === 0) {
    return null;
  }

  return <TableOfContents toc={toc} />;
}
