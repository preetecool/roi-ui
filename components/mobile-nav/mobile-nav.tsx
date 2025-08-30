"use client";

import { useState } from "react";
import type { PageTree } from "fumadocs-core/server";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "../theme-switcher/theme-switcher";
import { Logo } from "../logo";
import styles from "./mobile-nav.module.css";

interface NodeWithChildren {
  $id?: string;
  name: React.ReactNode;
  url?: string;
  type: string;
  children?: NodeWithChildren[];
}

interface MobileNavProps {
  tree: PageTree.Root;
}

export function MobileNav({ tree }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.hamburgerButton} ${styles.mobileOnly}`}
        aria-label="Toggle navigation menu"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isOpen ? (
            <>
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </>
          ) : (
            <>
              <path d="M3 12h18" />
              <path d="M3 6h18" />
              <path d="M3 18h18" />
            </>
          )}
        </svg>
      </button>

      {isOpen && <div className={`${styles.overlay} ${styles.mobileOnly}`} onClick={() => setIsOpen(false)} />}

      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : styles.sidebarClosed} ${styles.mobileOnly}`}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.logoLink} onClick={() => setIsOpen(false)}>
            <Logo width={32} height={32} />
          </Link>
          <div className={styles.headerActions}>
            <ThemeSwitcher />
            <button onClick={() => setIsOpen(false)} className={styles.closeButton}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.sidebarContent}>
          <div className={styles.mainNavSection}>
            <Link
              href="/docs"
              onClick={() => setIsOpen(false)}
              className={`${styles.navLink} ${pathname === "/docs" ? styles.navLinkActive : styles.navLinkInactive}`}
            >
              Docs
            </Link>
          </div>

          <nav className={styles.treeNav}>
            {tree.children.map((item, index) => (
              <MobileSidebarGroup
                key={item.$id || `item-${index}`}
                item={item as NodeWithChildren}
                pathname={pathname}
                onClose={() => setIsOpen(false)}
              />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

function MobileSidebarGroup({
  item,
  pathname,
  onClose,
}: {
  item: NodeWithChildren;
  pathname: string;
  onClose: () => void;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = pathname === item.url;

  if (!hasChildren && item.type === "page" && item.url) {
    return (
      <Link
        href={item.url}
        onClick={onClose}
        className={`${styles.pageLink} ${isActive ? styles.pageLinkActive : styles.pageLinkInactive}`}
      >
        {item.name}
      </Link>
    );
  }

  return (
    <div className={styles.groupContainer}>
      <div className={styles.groupTitle}>{item.name}</div>

      <div className={styles.groupChildren}>
        {item.children?.map((child, index) => (
          <MobileSidebarGroup key={child.$id || `child-${index}`} item={child} pathname={pathname} onClose={onClose} />
        ))}
      </div>
    </div>
  );
}
