"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import styles from "./docs-sidebar.module.css";
import { Badge } from "@/registry/brook/ui/badge/badge";
import { Logo } from "@/components/logo";
import { ThemeSwitcher } from "@/components/theme-switcher/theme-switcher";
import { PanelRight } from "lucide-react";

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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
      {/* Hover trigger zone */}
      {isCollapsed && (
        <div
          className={styles.hoverTrigger}
          onMouseEnter={() => setIsHovering(true)}
        />
      )}

      <div className={`${styles.sidebarDesktop} ${isCollapsed ? styles.sidebarCollapsed : ""} ${isHovering ? styles.sidebarFloating : ""}`}>
        <div data-slot="sidebar-gap" className={styles.sidebarGap} />

        <div
          data-slot="sidebar-container"
          className={styles.sidebarContainer}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div data-slot="sidebar-inner" className={styles.sidebarInner}>
            <div className={styles.sidebarHeader}>
              <div className={styles.logoRow}>
                <Link href="/" className={styles.logoLink}>
                  <Logo width={24} height={24} />
                </Link>
                <button
                  className={`${styles.collapseButton} hit-area-extend`}
                  aria-label="Collapse sidebar"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  <PanelRight size={18} className={styles.collapseIcon} />
                </button>
              </div>
              <div className={styles.searchWrapper}>
                <input
                  type="text"
                  placeholder="Search..."
                  className={styles.searchInput}
                />
                <svg
                  className={styles.searchIcon}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 14L10.5 10.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <SidebarContent tree={tree} pathname={pathname} />
            <div className={styles.sidebarFooter}>
              <a
                href="https://github.com/preetecool/roi-ui"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubLink}
                aria-label="View source on GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="currentColor"/>
                </svg>
              </a>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Collapsed sidebar buttons */}
      <div className={styles.collapsedButtons}>
        <div className={styles.collapsedButtonsInner}>
          <button
            className={`${styles.collapsedButton} hit-area-extend`}
            aria-label="Toggle sidebar"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <PanelRight size={18} className={styles.collapseIcon} />
          </button>
          <button
            className={`${styles.collapsedButton} hit-area-extend`}
            aria-label="Search"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 14L10.5 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
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
            <SidebarGroup
              key={item.$id || `item-${index}`}
              item={item as SidebarItem}
              pathname={pathname}
              isFirst={index === 0}
              level={0}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SidebarGroup({
  item,
  pathname,
  isFirst = false,
  level = 0,
}: {
  item: SidebarItem;
  pathname: string;
  isFirst?: boolean;
  level?: number;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = pathname === item.url;
  const isTopLevel = level === 0;

  // Default expanded state: true for top-level sections, level 1 sections, or if child is active
  const hasActiveChild = hasChildren && item.children?.some(child =>
    pathname.startsWith(child.url || '') ||
    child.children?.some(grandchild => pathname.startsWith(grandchild.url || ''))
  );

  // For level 0 (top-level): only "Get Started" is open by default
  // For level 1+: only open if has active child
  const [isExpanded, setIsExpanded] = useState<boolean>(
    level === 0
      ? item.name === "Get Started"
      : hasActiveChild ?? false
  );
  const [updateTrigger, setUpdateTrigger] = useState(0);

  // Check if this collapsed section contains the active item
  const isCollapsedWithActiveChild = !isExpanded && hasActiveChild;
  const childrenRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLButtonElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ top: number; height: number; opacity: number }>({
    top: 0,
    height: 0,
    opacity: 0
  });
  const [hoverIndicatorStyle, setHoverIndicatorStyle] = useState<{ top: number; height: number; opacity: number }>({
    top: 0,
    height: 0,
    opacity: 0
  });

  // Trigger update when expand/collapse changes
  useEffect(() => {
    if (level === 1) {
      // Trigger parent update by dispatching a custom event
      const event = new CustomEvent('sidebarChildStateChange');
      window.dispatchEvent(event);
    }
  }, [isExpanded, level]);

  // Listen for child state changes if this is a level 0 component
  useEffect(() => {
    if (level !== 0) return;

    const handleChildStateChange = () => {
      setUpdateTrigger(prev => prev + 1);
    };

    window.addEventListener('sidebarChildStateChange', handleChildStateChange);
    return () => {
      window.removeEventListener('sidebarChildStateChange', handleChildStateChange);
    };
  }, [level]);

  // Update indicator position when pathname or children change
  useEffect(() => {
    if (!hasChildren || !childrenRef.current) return;

    // Don't show indicator for collapsed level 1 items - let parent handle it
    if (isCollapsedWithActiveChild && level === 1) {
      setIndicatorStyle({ top: 0, height: 0, opacity: 0 });
      return;
    }

    // Check if any level 1 child is collapsed with an active descendant
    if (level === 0 && isExpanded) {
      const childGroups = childrenRef.current.querySelectorAll(`.${styles.sidebarGroup}`);
      for (const childGroup of childGroups) {
        const header = childGroup.querySelector(`.${styles.sidebarGroupHeader}.${styles.activeHeader}`);
        if (header) {
          // If we found a collapsed child with active descendant, show indicator on it
          const container = childrenRef.current;
          const containerRect = container.getBoundingClientRect();
          const headerRect = header.getBoundingClientRect();
          const topOffset = 0.45 * 16;
          const top = headerRect.top - containerRect.top + topOffset;
          const height = headerRect.height - (topOffset * 2);

          setIndicatorStyle({ top, height, opacity: 1 });
          return;
        }
      }
    }

    // Otherwise, show indicator on the active child item
    const activeLink = childrenRef.current.querySelector(`.${styles.active}`);
    if (activeLink) {
      const container = childrenRef.current;
      const linkElement = activeLink.closest(`.${styles.sidebarItemWrapper}`) as HTMLElement;

      if (linkElement) {
        const containerRect = container.getBoundingClientRect();
        const linkRect = linkElement.getBoundingClientRect();
        const topOffset = 0.45 * 16; // 0.45rem in pixels (assuming 16px base)
        const top = linkRect.top - containerRect.top + topOffset;
        const height = linkRect.height - (topOffset * 2);

        setIndicatorStyle({ top, height, opacity: 1 });
      }
    } else {
      setIndicatorStyle({ top: 0, height: 0, opacity: 0 });
    }
  }, [pathname, hasChildren, isExpanded, isCollapsedWithActiveChild, level, updateTrigger]);

  const handleItemHover = (event: React.MouseEvent) => {
    if (!childrenRef.current) return;

    const target = event.target as HTMLElement;
    const itemWrapper = target.closest(`.${styles.sidebarItemWrapper}`) as HTMLElement;

    if (itemWrapper) {
      const container = childrenRef.current;
      const containerRect = container.getBoundingClientRect();
      const itemRect = itemWrapper.getBoundingClientRect();
      const topOffset = 0.45 * 16;
      const top = itemRect.top - containerRect.top + topOffset;
      const height = itemRect.height - (topOffset * 2);

      setHoverIndicatorStyle({ top, height, opacity: 1 });
    }
  };

  const handleItemLeave = () => {
    setHoverIndicatorStyle({ top: 0, height: 0, opacity: 0 });
  };

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
      <div className={styles.sidebarItemWrapper} style={{ paddingLeft: level > 1 ? `${(level - 1) * 1}rem` : 0 }}>
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

  // Collapsible section - allow both top-level (level 0) and level 1 items to be collapsible
  const isCollapsible = (level === 0 || level === 1) && hasChildren;

  return (
    <div
      ref={groupRef}
      className={`${styles.sidebarGroup} ${!isFirst ? styles.sidebarGroupWithMargin : ""} ${isTopLevel ? styles.topLevelGroup : ""}`}
      style={{ paddingLeft: level > 1 ? `${(level - 1) * 1}rem` : 0 }}
    >
      {isCollapsible ? (
        <button
          ref={headerRef}
          className={`${styles.sidebarGroupHeader} ${isCollapsedWithActiveChild ? styles.activeHeader : ""}`}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          <h5 className={styles.sidebarGroupTitle}>{item.name}</h5>
          <ChevronIcon isOpen={isExpanded} />
        </button>
      ) : (
        <h5 className={styles.sidebarGroupTitle}>{item.name}</h5>
      )}

      {hasChildren && (
        <div
          ref={childrenRef}
          className={`${styles.sidebarGroupChildren} ${isCollapsible && !isExpanded ? styles.collapsed : ""}`}
          style={{ display: isCollapsible ? (isExpanded ? 'flex' : 'none') : 'flex' }}
          onMouseOver={handleItemHover}
          onMouseLeave={handleItemLeave}
        >
          <div
            className={styles.timelineIndicatorHover}
            style={{
              transform: `translateY(${hoverIndicatorStyle.top}px)`,
              height: `${hoverIndicatorStyle.height}px`,
              opacity: hoverIndicatorStyle.opacity,
            }}
          />
          <div
            className={styles.timelineIndicator}
            style={{
              transform: `translateY(${indicatorStyle.top}px)`,
              height: `${indicatorStyle.height}px`,
              opacity: indicatorStyle.opacity,
            }}
          />
          {item.children?.map((child, index) => (
            <SidebarGroup
              key={child.$id || `child-${index}`}
              item={child}
              pathname={pathname}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
