"use client";

import { Gauge, Puzzle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import type { PageTree } from "@/lib/source-types";
import { Badge } from "@/registry/brook/ui/badge/badge";
import styles from "./docs-sidebar.module.css";

const NEW_SIDEBAR_ITEMS = new Set(["Drawer"]);

type SidebarItem = {
  $id?: string;
  name: React.ReactNode;
  url?: string;
  type: string;
  disabled?: boolean;
  badge?: string;
  children?: SidebarItem[];
};

type DocsSidebarProps = {
  tree: PageTree.Root;
};

type TreeNode = PageTree.Node;

export function DocsSidebar({ tree }: DocsSidebarProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Documentation navigation" className={styles.sidebar}>
      <div className={styles.content}>
        {tree.children.map((item: TreeNode, index: number) => (
          <div className={styles.group} key={item.$id || `item-${index}`}>
            <DocsSidebarGroup item={item as SidebarItem} level={0} pathname={pathname} />
          </div>
        ))}
      </div>
    </nav>
  );
}

function getIconForItem(itemName: string) {
  const name = itemName.toLowerCase();

  if (name === "quick start") {
    return <Gauge size={16} />;
  }
  if (name === "about roi ui" || name === "intro") {
    return <Logo fillColor="transparent" height={16} strokeColor="currentColor" strokeWidth={20} width={16} />;
  }
  if (name === "components") {
    return <Puzzle size={16} />;
  }

  return null;
}

function DocsSidebarGroup({ item, pathname, level = 0 }: { item: SidebarItem; pathname: string; level?: number }) {
  const hasChildren = Boolean(item.children && item.children.length > 0);
  const isActive = pathname === item.url;

  if (!hasChildren && item.type === "page" && item.url) {
    return (
      <Link
        aria-current={isActive ? "page" : undefined}
        className={`${styles.menuButton} ${isActive ? styles.menuButtonActive : ""}`}
        href={item.url}
      >
        {getIconForItem(item.name as string)}
        <span>{item.name}</span>
        {item.badge && (
          <Badge className={styles.badge} size="sm" variant="secondary">
            {item.badge}
          </Badge>
        )}
        {NEW_SIDEBAR_ITEMS.has(item.name as string) && (
          <span className={styles.newBadge}>New</span>
        )}
      </Link>
    );
  }

  if (level === 0 && hasChildren) {
    return (
      <>
        <h3 className={styles.groupLabel}>
          {getIconForItem(item.name as string)}
          {item.name}
        </h3>
        <ul className={styles.groupContent}>
          {item.children?.map((child, index) => (
            <li key={child.$id || `child-${index}`}>
              <DocsSidebarGroup item={child} level={level + 1} pathname={pathname} />
            </li>
          ))}
        </ul>
      </>
    );
  }

  return null;
}
