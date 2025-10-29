"use client";

import type { PageTree } from "fumadocs-core/server";
import { Gauge } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { Badge } from "@/registry/brook/ui/badge/badge";
import styles from "./docs-sidebar.module.css";

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

export function DocsSidebar({ tree }: DocsSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className={styles.sidebar}>
        <div className={styles.content}>
          {tree.children.map((item, index) => (
            <div className={styles.group} key={item.$id || `item-${index}`}>
              <DocsSidebarGroup
                item={item as SidebarItem}
                level={0}
                pathname={pathname}
              />
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
    return (
      <Logo
        fillColor="transparent"
        height={16}
        strokeColor="currentColor"
        strokeWidth={20}
        width={16}
      />
    );
  }

  return null;
}

function DocsSidebarGroup({
  item,
  pathname,
  level = 0,
}: {
  item: SidebarItem;
  pathname: string;
  level?: number;
}) {
  const hasChildren = Boolean(item.children && item.children.length > 0);
  const isActive = pathname === item.url;

  // Simple link item
  if (!hasChildren && item.type === "page" && item.url) {
    return (
      <Link
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
      </Link>
    );
  }

  if (level === 0 && hasChildren) {
    return (
      <>
        <div className={styles.groupLabel}>
          {getIconForItem(item.name as string)}
          {item.name}
        </div>
        <div className={styles.groupContent}>
          {item.children?.map((child, index) => (
            <DocsSidebarGroup
              item={child}
              key={child.$id || `child-${index}`}
              level={level + 1}
              pathname={pathname}
            />
          ))}
        </div>
      </>
    );
  }

  return null;
}
