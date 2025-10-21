"use client";

import { TableOfContents } from "./toc/toc";
import { useTOC } from "./toc-context";

export function TOCDisplay() {
  const { toc } = useTOC();

  if (!toc || toc.length === 0) {
    return null;
  }

  return <TableOfContents toc={toc} />;
}
