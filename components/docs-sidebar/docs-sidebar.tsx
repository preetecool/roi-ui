"use client";

import { Logo } from "@/components/logo";
import { Search } from "@/components/search/search";
import { ThemeSwitcher } from "@/components/theme-switcher/theme-switcher";
import { Badge } from "@/registry/brook/ui/badge/badge";
import { Button } from "@/registry/brook/ui/button/button";
import { Kbd } from "@/registry/brook/ui/kbd/kbd";
import {
  Tooltip,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/brook/ui/tooltip/tooltip";
import { Gauge } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./docs-sidebar.module.css";

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
  const [isMac, setIsMac] = useState(false);

  const triggerSearch = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setIsHovering(false);
  };

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "b") {
        event.preventDefault();
        handleToggleCollapse();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isCollapsed]);

  const tooltipContent = (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <span style={{ color: "var(--secondary-foreground)" }}>Toggle sidebar</span>
      <div style={{ display: "flex", gap: "0.25rem" }}>
        <Kbd size="sm">{isMac ? "⌘" : "Ctrl"}</Kbd>
        <Kbd size="sm">B</Kbd>
      </div>
    </div>
  );

  const searchTooltipContent = (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <span style={{ color: "var(--secondary-foreground)" }}>Search</span>
      <div style={{ display: "flex", gap: "0.25rem" }}>
        <Kbd size="sm">{isMac ? "⌘" : "Ctrl"}</Kbd>
        <Kbd size="sm">K</Kbd>
      </div>
    </div>
  );

  return (
    <TooltipProvider delay={50}>
      <Search tree={tree} />
      {isCollapsed && <div className={styles.hoverTrigger} onMouseEnter={() => setIsHovering(true)} />}

      <div
        className={`${styles.sidebarDesktop} ${isCollapsed ? styles.sidebarCollapsed : ""} ${isHovering ? styles.sidebarFloating : ""}`}
      >
        <div data-slot="sidebar-gap" className={styles.sidebarGap} />

        <div
          data-slot="sidebar-container"
          className={styles.sidebarContainer}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div data-slot="sidebar-inner" className={styles.sidebarInner}>
            <div className={styles.sidebarHeader}>
              <div className={styles.logoRow}>
                <Link href="/" className={styles.logoLink} style={{ marginLeft: "4px" }}>
                  <Logo
                    width={20}
                    height={20}
                    fillColor="var(--muted-foreground)"
                    strokeColor="var(--card)"
                    strokeWidth={20}
                  />
                  <span className={styles.logoText}>Roi UI</span>
                </Link>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`${styles.collapseButton} hit-area-extend`}
                        aria-label="Collapse sidebar"
                        onClick={handleToggleCollapse}
                        render={<div />}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={styles.collapseIcon}
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                          <path
                            d="M9 3L9 21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <rect
                            x="3"
                            y="3"
                            width="6"
                            height="18"
                            rx="2"
                            ry="2"
                            fill="currentColor"
                            className={`${styles.collapseIconFill} ${isCollapsed ? styles.collapseIconFillActive : ""}`}
                          />
                        </svg>
                      </Button>
                    }
                  />
                  <TooltipPortal>
                    <TooltipPositioner side="right">
                      <TooltipPopup>{tooltipContent}</TooltipPopup>
                    </TooltipPositioner>
                  </TooltipPortal>
                </Tooltip>
              </div>

              <Button variant="ghost" onClick={triggerSearch} id={styles.searchWrapper}>
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

                <input type="text" placeholder="Search" className={styles.searchInput} readOnly />

                <div className={styles.searchKbd}>
                  <Kbd size="sm">⌘</Kbd>
                  <Kbd size="sm">K</Kbd>
                </div>
              </Button>
            </div>
            <SidebarContent tree={tree} pathname={pathname} />
            <div className={styles.sidebarFooter}>
              <Button
                variant="ghost"
                size="icon"
                className={styles.githubLink}
                aria-label="View source on GitHub"
                render={
                  <a href="https://github.com/preetecool/roi-ui" target="_blank" rel="noopener noreferrer" />
                }
              >
                <svg width="20" height="20" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                    fill="currentColor"
                  />
                </svg>
              </Button>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.collapsedButtons}>
        <div className={styles.collapsedButtonsInner}>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${styles.collapsedButton} hit-area-extend`}
                  aria-label="Toggle sidebar"
                  onClick={handleToggleCollapse}
                  render={<div />}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.collapseIcon}
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M9 3L9 21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="3"
                      y="3"
                      width="6"
                      height="18"
                      rx="2"
                      ry="2"
                      fill="currentColor"
                      className={`${styles.collapseIconFill} ${isCollapsed ? styles.collapseIconFillActive : ""}`}
                    />
                  </svg>
                </Button>
              }
            />
            <TooltipPortal>
              <TooltipPositioner side="bottom">
                <TooltipPopup>{tooltipContent}</TooltipPopup>
              </TooltipPositioner>
            </TooltipPortal>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${styles.collapsedButton} hit-area-extend`}
                  aria-label="Search"
                  onClick={triggerSearch}
                  render={<div />}
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
                </Button>
              }
            />
            <TooltipPortal>
              <TooltipPositioner side="bottom">
                <TooltipPopup>{searchTooltipContent}</TooltipPopup>
              </TooltipPositioner>
            </TooltipPortal>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}

function SidebarContent({ tree, pathname }: { tree: PageTree.Root; pathname: string }) {
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

function getIconForItem(itemName: string) {
  const name = itemName.toLowerCase();

  if (name === "quick start") {
    return <Gauge size={16} className={styles.sidebarItemIcon} />;
  }
  if (name === "about roi ui" || name === "intro") {
    return (
      <Logo
        width={16}
        height={16}
        strokeWidth={20}
        fillColor="transparent"
        strokeColor="currentColor"
        className={styles.sidebarItemIcon}
      />
    );
  }

  return null;
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

  const hasActiveChild =
    hasChildren &&
    item.children?.some(
      (child) =>
        pathname.startsWith(child.url || "") ||
        child.children?.some((grandchild) => pathname.startsWith(grandchild.url || "")),
    );

  const [isExpanded, setIsExpanded] = useState<boolean>(
    level === 0 ? item.name === "UI" : (hasActiveChild ?? false),
  );

  const isCollapsedWithActiveChild = !isExpanded && hasActiveChild;
  const childrenRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLButtonElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  if (!hasChildren && item.type === "page" && item.url) {
    const content = (
      <span
        className={`${styles.sidebarItem} ${isActive ? styles.active : ""} ${item.disabled ? styles.disabled : ""}`}
        data-level={level}
      >
        {getIconForItem(item.name as string)}
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

  const isCollapsible = level === 1 && hasChildren;

  const groupClasses = [
    styles.sidebarGroup,
    isTopLevel && styles.topLevelGroup,
    level === 1 && styles.nestedGroup,
  ]
    .filter(Boolean)
    .join(" ");

  const headerClasses = [
    level === 1 ? styles.nestedGroupHeader : styles.sidebarGroupHeader,
    isCollapsedWithActiveChild && styles.activeHeader,
  ]
    .filter(Boolean)
    .join(" ");

  const titleClasses = level === 1 ? styles.nestedGroupTitle : styles.sidebarGroupTitle;

  return (
    <div ref={groupRef} className={groupClasses}>
      {isCollapsible ? (
        <button
          ref={headerRef}
          className={headerClasses}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          <h5 className={titleClasses}>
            {getIconForItem(item.name as string)}
            {item.name}
          </h5>
          <ChevronIcon isOpen={isExpanded} />
        </button>
      ) : (
        <h5 className={titleClasses}>
          {getIconForItem(item.name as string)}
          {item.name}
        </h5>
      )}

      {hasChildren && (
        <div
          ref={childrenRef}
          className={`${styles.sidebarGroupChildren} ${isCollapsible && !isExpanded ? styles.collapsed : ""}`}
          style={{ display: isCollapsible ? (isExpanded ? "flex" : "none") : "flex" }}
        >
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
