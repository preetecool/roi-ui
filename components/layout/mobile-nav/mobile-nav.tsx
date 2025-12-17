"use client";

import { Dialog } from "@base-ui/react";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ThemeSwitcher } from "@/components/layout/theme-switcher/theme-switcher";
import { GitHubIcon } from "@/components/shared/github-icon";
import { useSwipeToClose } from "@/hooks/use-swipe-to-close";
import type { PageTree } from "@/lib/source-types";
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
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <Dialog.Trigger aria-label="Toggle navigation menu" className={styles.menuButton} data-open={open}>
        <div className={styles.menuButtonInner}>
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className={styles.overlay} style={{ backgroundColor: "transparent" }} />
        <Dialog.Popup className={styles.drawer}>
          <MobileNavContent pathname={pathname} setOpen={setOpen} tree={tree} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function MobileNavContent({
  tree,
  pathname,
  setOpen,
}: {
  tree: PageTree.Root;
  pathname: string;
  setOpen: (open: boolean) => void;
}) {
  const { handleTouchStart } = useSwipeToClose({
    onClose: () => setOpen(false),
  });

  return (
    <div className={styles.viewport} onTouchStart={handleTouchStart}>
      <div className={styles.viewportInner}>
        <Dialog.Close className={styles.backdropTapArea} nativeButton={false} render={<div />} />
        <div className={styles.panel}>
          <div className={styles.closeContainer}>
            <Dialog.Close className={styles.closeButton}>
              <X size={16} />
            </Dialog.Close>
          </div>
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
        </div>
      </div>
    </div>
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
