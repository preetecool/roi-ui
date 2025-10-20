"use client";
import type { TOCItemType } from "fumadocs-core/server";
import { AnchorProvider, ScrollProvider, TOCItem } from "fumadocs-core/toc";
import { type ReactNode, useRef } from "react";
import styles from "./toc.module.css";

type TableOfContentsProps = {
  toc?: TOCItemType[];
  children?: ReactNode;
};

export function TableOfContents({ toc, children }: TableOfContentsProps) {
  const viewRef = useRef<HTMLDivElement>(null);

  if (!toc || toc.length === 0) {
    return null;
  }

  return (
    <AnchorProvider toc={toc}>
      <div className={styles.container} ref={viewRef}>
        <h3 className={styles.heading}>On This Page</h3>

        <ScrollProvider containerRef={viewRef}>
          <nav>
            <div className={styles.tocList}>
              {toc.map((item) => (
                <TOCItem
                  className={styles.tocItem}
                  href={item.url}
                  key={item.url}
                  style={{
                    paddingLeft:
                      item.depth > 2 ? `${(item.depth - 2) * 12}px` : "0px",
                  }}
                >
                  {item.title}
                </TOCItem>
              ))}
            </div>
            <div className={styles.spacer} />
          </nav>
        </ScrollProvider>
      </div>
      {children}
    </AnchorProvider>
  );
}
