"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ThemeSwitcher } from "@/components/layout/theme-switcher/theme-switcher";
import { GitHubIcon } from "@/components/shared/github-icon";
import type { PageTree } from "@/lib/source-types";
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHandle,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from "@/registry/brook/ui/drawer/drawer";
import styles from "./mobile-nav.module.css";

type NodeWithChildren = {
  $id?: string;
  name: React.ReactNode;
  url?: string;
  type: string;
  children?: NodeWithChildren[];
};

type MobileNavProps = {
  tree: PageTree.Root;
};

export function MobileNav({ tree }: MobileNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button aria-label="Toggle navigation menu" className={styles.menuButton} type="button">
        <div className={styles.menuButtonInner}>
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
        </div>
      </button>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger aria-label="Toggle navigation menu" className={styles.menuButton} data-open={open}>
        <div className={styles.menuButtonInner}>
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
        </div>
      </DrawerTrigger>

      <DrawerPortal>
        <DrawerBackdrop className={styles.backdrop} />
        <DrawerViewport className={styles.viewport}>
          <DrawerPopup className={styles.popup}>
            <div className={styles.popupInner}>
              <DrawerClose className={styles.backdropTapArea} nativeButton={false} render={<div />} />
              <div className={styles.panel}>
                <DrawerHandle className={styles.handle} />
                <div className={styles.closeContainer}>
                  <DrawerClose className={styles.closeButton}>
                    <X size={16} />
                  </DrawerClose>
                </div>

                <DrawerTitle className={styles.srOnly}>Navigation</DrawerTitle>
                <DrawerDescription className={styles.srOnly}>Site navigation menu</DrawerDescription>

                <DrawerContent className={styles.content}>
                  <div className={styles.menuSection}>
                    <div className={styles.groupTitle}>Menu</div>
                    <Link
                      aria-current={pathname === "/" ? "page" : undefined}
                      className={`${styles.pageLink} ${pathname === "/" ? styles.pageLinkActive : styles.pageLinkInactive}`}
                      href="/"
                      onClick={() => setOpen(false)}
                    >
                      Home
                    </Link>
                  </div>

                  <nav className={styles.treeNav}>
                    <ul className={styles.navList}>
                      {tree?.children?.map((item: PageTree.Node, index: number) => (
                        <li key={item.$id || `item-${index}`}>
                          <MobileSidebarGroup
                            item={item as NodeWithChildren}
                            onNavigate={() => setOpen(false)}
                            pathname={pathname}
                          />
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className={styles.iconsRow}>
                    <a
                      aria-label="View source on GitHub"
                      className={styles.iconLink}
                      href="https://github.com/preetecool/roi-ui"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <GitHubIcon size={20} />
                    </a>
                    <ThemeSwitcher />
                  </div>
                </DrawerContent>
              </div>
            </div>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  );
}

function MobileSidebarGroup({
  item,
  pathname,
  onNavigate,
}: {
  item: NodeWithChildren;
  pathname: string;
  onNavigate: () => void;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = pathname === item.url;

  if (!hasChildren && item.type === "page" && item.url) {
    return (
      <Link
        aria-current={isActive ? "page" : undefined}
        className={`${styles.pageLink} ${isActive ? styles.pageLinkActive : styles.pageLinkInactive}`}
        href={item.url}
        onClick={onNavigate}
      >
        {item.name}
      </Link>
    );
  }

  return (
    <div className={styles.groupContainer}>
      <div className={styles.groupTitle}>{item.name}</div>

      <ul className={styles.groupChildren}>
        {item.children?.map((child, index) => (
          <li key={child.$id || `child-${index}`}>
            <MobileSidebarGroup item={child} onNavigate={onNavigate} pathname={pathname} />
          </li>
        ))}
      </ul>
    </div>
  );
}
