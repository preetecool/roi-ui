"use client";
import type { TOCItemType } from "fumadocs-core/server";
import { useEffect, useState } from "react";
import styles from "./toc.module.css";

type TableOfContentsProps = {
  toc?: TOCItemType[];
};

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const NESTED_ITEM_INDENT = 12;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-20% 0px -35% 0px" }
    );

    const headings = document.querySelectorAll(
      "h2[id], h3[id], h4[id], h5[id], h6[id]"
    );
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    const element = document.querySelector(url);
    element?.scrollIntoView({ behavior: "smooth" });
    setActiveId(url);
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
