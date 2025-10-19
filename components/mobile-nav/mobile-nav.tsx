"use client";

import { Dialog } from "@base-ui-components/react";

import type { PageTree } from "fumadocs-core/server";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { ThemeSwitcher } from "../theme-switcher/theme-switcher";
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
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={`${styles.menuButton}`} aria-label="Toggle navigation menu" data-open={open}>
        <div className={styles.menuButtonInner}>
          <span className={styles.menuLine}></span>
          <span className={styles.menuLine}></span>
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className={`${styles.overlay}`} style={{ backgroundColor: "transparent" }} />
        <Dialog.Popup className={`${styles.drawer}`}>
          <div className={styles.viewport}>
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
                  <Dialog.Close
                    className={`${styles.pageLink} ${pathname === "/" ? styles.pageLinkActive : styles.pageLinkInactive}`}
                    onClick={() => router.push("/")}
                  >
                    Home
                  </Dialog.Close>
                </div>

                <nav className={styles.treeNav}>
                  {tree?.children?.map((item, index) => (
                    <MobileSidebarGroup
                      key={item.$id || `item-${index}`}
                      item={item as NodeWithChildren}
                      pathname={pathname}
                    />
                  ))}
                </nav>

                <div className={styles.iconsRow}>
                  <a
                    href="https://github.com/preetecool/roi-ui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconLink}
                    aria-label="View source on GitHub"
                  >
                    <svg width="20" height="20" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                  <ThemeSwitcher />
                </div>
              </div>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function MobileSidebarGroup({ item, pathname }: { item: NodeWithChildren; pathname: string }) {
  const router = useRouter();
  const hasChildren = item.children && item.children.length > 0;
  const isActive = pathname === item.url;

  if (!hasChildren && item.type === "page" && item.url) {
    return (
      <Dialog.Close
        className={`${styles.pageLink} ${isActive ? styles.pageLinkActive : styles.pageLinkInactive}`}
        onClick={() => router.push(item.url!)}
      >
        {item.name}
      </Dialog.Close>
    );
  }

  return (
    <div className={styles.groupContainer}>
      <div className={styles.groupTitle}>{item.name}</div>

      <div className={styles.groupChildren}>
        {item.children?.map((child, index) => (
          <MobileSidebarGroup key={child.$id || `child-${index}`} item={child} pathname={pathname} />
        ))}
      </div>
    </div>
  );
}
