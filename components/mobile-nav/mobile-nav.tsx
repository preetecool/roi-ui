"use client";

import { useState, useEffect } from "react";
import type { PageTree } from "fumadocs-core/server";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../logo";
import { motion, AnimatePresence } from "motion/react";
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.height = '100%';

      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.height = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.menuButton} ${styles.mobileOnly} ${isOpen ? styles.menuButtonActive : ""}`}
        aria-label="Toggle navigation menu"
      >
        <div className={styles.menuButtonInner}>
          <span className={`${styles.menuLine} ${styles.menuLineTop} ${isOpen ? styles.menuLineTopActive : ""}`}></span>
          <span className={`${styles.menuLine} ${styles.menuLineMiddle} ${isOpen ? styles.menuLineMiddleActive : ""}`}></span>
          <span className={`${styles.menuLine} ${styles.menuLineBottom} ${isOpen ? styles.menuLineBottomActive : ""}`}></span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${styles.overlay} ${styles.mobileOnly}`}
            onClick={() => setIsOpen(false)}
            onTouchMove={(e) => e.preventDefault()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${styles.sidebar} ${styles.mobileOnly}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              height: "calc(100vh - var(--header-height))",
              top: "var(--header-height)",
              maxHeight: "calc(100vh - var(--header-height))"
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 400,
              duration: 0.2
            }}
          >
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.logoLink} onClick={() => setIsOpen(false)}>
            <Logo width={32} height={32} />
          </Link>
        </div>

        <div className={styles.sidebarContent}>
          <div className={styles.menuSection}>
            <div className={styles.sectionHeader}>Menu</div>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`${styles.menuItem} ${pathname === "/" ? styles.menuItemActive : styles.menuItemInactive}`}
            >
              Home
            </Link>
          </div>

          <nav className={styles.treeNav}>
            {tree?.children?.map((item, index) => (
              <MobileSidebarGroup
                key={item.$id || `item-${index}`}
                item={item as NodeWithChildren}
                pathname={pathname}
                onClose={() => setIsOpen(false)}
              />
            ))}
          </nav>
        </div>
          </motion.div>
        )}
      </AnimatePresence>
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
