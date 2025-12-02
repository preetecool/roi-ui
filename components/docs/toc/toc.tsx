"use client";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./toc.module.css";

type TOCItem = {
  title: ReactNode;
  url: string;
  depth: number;
};

type TableOfContentsProps = {
  toc?: TOCItem[];
};

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const visibleHeadingsRef = useRef<Set<string>>(new Set());
  const headingsRef = useRef<Element[]>([]);
  const NESTED_ITEM_INDENT = 12;

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll("h2[id], h3[id], h4[id], h5[id], h6[id]")
    );
    headingsRef.current = headings;

    const observer = new IntersectionObserver(
      (entries) => {
        // Update the set of visible headings
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleHeadingsRef.current.add(entry.target.id);
          } else {
            visibleHeadingsRef.current.delete(entry.target.id);
          }
        }

        // Find the topmost visible heading based on DOM order
        for (const heading of headingsRef.current) {
          if (visibleHeadingsRef.current.has(heading.id)) {
            setActiveId(`#${heading.id}`);
            break;
          }
        }
      },
      { rootMargin: "-50px 0px 0px 0px" }
    );

    for (const heading of headings) {
      observer.observe(heading);
    }

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    const element = document.querySelector(url);
    element?.scrollIntoView({ behavior: "smooth" });
    setActiveId(url);
    window.history.pushState(null, "", url);
  };

  if (!toc || toc.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>On This Page</h3>
      <nav>
        <div className={styles.tocList}>
          {toc.map((item) => (
            <a
              className={styles.tocItem}
              data-active={activeId === item.url}
              href={item.url}
              key={item.url}
              onClick={(e) => handleClick(e, item.url)}
              style={{
                paddingLeft:
                  item.depth > 2
                    ? `${(item.depth - 2) * NESTED_ITEM_INDENT}px`
                    : "0px",
              }}
            >
              {item.title}
            </a>
          ))}
        </div>
        <div className={styles.spacer} />
      </nav>
    </div>
  );
}
