"use client";
import { AnchorProvider, ScrollProvider, TOCItem } from "fumadocs-core/toc";
import { useRef, ReactNode } from "react";
import type { TOCItemType } from "fumadocs-core/server";
import styles from "./toc.module.css";

interface TableOfContentsProps {
  toc?: TOCItemType[];
  children?: ReactNode;
}

export function TableOfContents({ toc, children }: TableOfContentsProps) {
  const viewRef = useRef<HTMLDivElement>(null);

  if (!toc || toc.length === 0) return null;

  return (
    <AnchorProvider toc={toc}>
      <div ref={viewRef} className={styles.container}>
        <h3 className={styles.heading}>On This Page</h3>

        <ScrollProvider containerRef={viewRef}>
          <nav>
            <div className={styles.tocList}>
              {toc.map((item) => (
                <TOCItem
                  key={item.url}
                  href={item.url}
                  style={{
                    paddingLeft: item.depth > 2 ? `${(item.depth - 2) * 12}px` : "0px",
                  }}
                  className={styles.tocItem}
                >
                  {item.title}
                </TOCItem>
              ))}
            </div>
            <div className={styles.spacer}></div>
          </nav>
        </ScrollProvider>
      </div>
      {children}
    </AnchorProvider>
  );
}
