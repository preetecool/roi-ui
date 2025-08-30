"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./docs-sidebar.module.css";
import { Badge } from "@/registry/brook/ui/badge/badge";

import type { PageTree } from "fumadocs-core/server";

interface SidebarItem {
  $id?: string;
  name: React.ReactNode;
  url?: string;
  type: string;
  disabled?: boolean;
  badge?: string;
  children?: SidebarItem[];
}

interface DocsSidebarProps {
  tree: PageTree.Root;
}

export function DocsSidebar({ tree }: DocsSidebarProps) {
  const pathname = usePathname();

  return (
    <div className={styles.sidebarDesktop}>
      <div data-slot="sidebar-gap" className={styles.sidebarGap} />

      <div data-slot="sidebar-container" className={styles.sidebarContainer}>
        <div data-slot="sidebar-inner" className={styles.sidebarInner}>
          <SidebarContent tree={tree} pathname={pathname} />
        </div>
      </div>
    </div>
  );
}

function SidebarContent({
  tree,
  pathname,
}: {
  tree: PageTree.Root;
  pathname: string;
}) {
  return (
    <div className={styles.sidebarContent}>
      <div className={styles.sidebarNav}>
        <nav className={styles.nav}>
          {tree.children.map((item, index) => (
            <SidebarGroup key={item.$id || `item-${index}`} item={item as SidebarItem} pathname={pathname} isFirst={index === 0} />
          ))}
        </nav>
      </div>
    </div>
  );
}

function SidebarGroup({
  item,
  pathname,
  isFirst = false,
}: {
  item: SidebarItem;
  pathname: string;
  isFirst?: boolean;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = pathname === item.url;

  if (!hasChildren && item.type === "page" && item.url) {
    const content = (
      <span className={`${styles.sidebarItem} ${isActive ? styles.active : ""} ${item.disabled ? styles.disabled : ""}`}>
        {item.name}
        {item.badge && (
          <Badge variant="secondary" size="sm" className={styles.badge}>
            {item.badge}
          </Badge>
        )}
      </span>
    );

    return (
      <div className={styles.sidebarItemWrapper}>
        {item.disabled ? (
          content
        ) : (
          <Link href={item.url} className={styles.sidebarLink}>
            {content}
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className={`${styles.sidebarGroup} ${!isFirst ? styles.sidebarGroupWithMargin : ""}`}>
      <h5 className={styles.sidebarGroupTitle}>{item.name}</h5>

      <div className={styles.sidebarGroupChildren}>
        {item.children?.map((child, index) => (
          <SidebarGroup key={child.$id || `child-${index}`} item={child} pathname={pathname} />
        ))}
      </div>
    </div>
  );
}
