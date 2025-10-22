"use client";

import type { PageTree } from "fumadocs-core/server";
import { Gauge } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/logo";
import { Search } from "@/components/search/search";
import { ThemeSwitcher } from "@/components/theme-switcher/theme-switcher";
import { Badge } from "@/registry/brook/ui/badge/badge";
import { Button } from "@/registry/brook/ui/button/button";
import { Kbd } from "@/registry/brook/ui/kbd/kbd";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/registry/brook/ui/sidebar/sidebar";
import {
  Tooltip,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/brook/ui/tooltip/tooltip";
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
    <TooltipProvider delay={50}>
      <Search tree={tree} />
      <SidebarProvider defaultOpen={true}>
        <DocsSidebarInner tree={tree} pathname={pathname} />
      </SidebarProvider>
    </TooltipProvider>
  );
}

function DocsSidebarInner({
  tree,
  pathname,
}: {
  tree: PageTree.Root;
  pathname: string;
}) {
  const { open, setOpen } = useSidebar();
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

  const handleToggleCollapse = useCallback(() => {
    setOpen(!open);
    setIsHovering(false);
  }, [open, setOpen]);

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
  }, [handleToggleCollapse]);

  const tooltipContent = (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <span style={{ color: "var(--secondary-foreground)" }}>
        Toggle sidebar
      </span>
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
    <>
      {!open && (
        <div
          aria-hidden="true"
          className={styles.hoverTrigger}
          onMouseEnter={() => setIsHovering(true)}
        />
      )}

      <div
        className={`${styles.sidebarDesktop} ${!open ? styles.sidebarCollapsed : ""} ${isHovering ? styles.sidebarFloating : ""}`}
      >
        <div className={styles.sidebarGap} data-slot="sidebar-gap" />

        <aside
          className={styles.sidebarContainer}
          data-slot="sidebar-container"
          onMouseLeave={() => setIsHovering(false)}
          role="none"
        >
          <Sidebar side="left" className={styles.docsSidebar}>
            <SidebarHeader className={styles.docsSidebarHeader}>
              <div className={styles.logoRow}>
                <Link
                  className={styles.logoLink}
                  href="/"
                  style={{ marginLeft: "4px" }}
                >
                  <Logo
                    fillColor="var(--muted-foreground)"
                    height={20}
                    strokeColor="var(--card)"
                    strokeWidth={20}
                    width={20}
                  />
                  <span className={styles.logoText}>Roi UI</span>
                </Link>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        aria-label="Collapse sidebar"
                        className={`${styles.collapseButton} hit-area-extend`}
                        onClick={handleToggleCollapse}
                        render={<div />}
                        size="icon"
                        variant="ghost"
                      >
                        <svg
                          aria-hidden="true"
                          className={styles.collapseIcon}
                          fill="none"
                          height="18"
                          viewBox="0 0 24 24"
                          width="18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            fill="none"
                            height="18"
                            rx="2"
                            ry="2"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            width="18"
                            x="3"
                            y="3"
                          />
                          <path
                            d="M9 3L9 21"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                          <rect
                            className={`${styles.collapseIconFill} ${!open ? styles.collapseIconFillActive : ""}`}
                            fill="currentColor"
                            height="18"
                            rx="2"
                            ry="2"
                            width="6"
                            x="3"
                            y="3"
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

              <Button
                id={styles.searchWrapper}
                onClick={triggerSearch}
                variant="ghost"
              >
                <svg
                  aria-hidden="true"
                  className={styles.searchIcon}
                  fill="none"
                  height="16"
                  viewBox="0 0 16 16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M14 14L10.5 10.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>

                <input
                  className={styles.searchInput}
                  placeholder="Search"
                  readOnly
                  type="text"
                />

                <div className={styles.searchKbd}>
                  <Kbd size="sm">⌘</Kbd>
                  <Kbd size="sm">K</Kbd>
                </div>
              </Button>
            </SidebarHeader>

            <SidebarContent className={styles.docsSidebarContent}>
              <div className={styles.sidebarNav}>
                <nav className={styles.nav}>
                  {tree.children.map((item, index) => (
                    <SidebarGroup key={item.$id || `item-${index}`}>
                      <DocsSidebarGroup
                        item={item as SidebarItem}
                        level={0}
                        pathname={pathname}
                      />
                    </SidebarGroup>
                  ))}
                </nav>
              </div>
            </SidebarContent>

            <SidebarFooter className={styles.docsSidebarFooter}>
              <a
                aria-label="View source on GitHub"
                className={styles.githubLink}
                href="https://github.com/preetecool/roi-ui"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button
                  aria-label="View source on GitHub"
                  size="icon"
                  variant="ghost"
                >
                  <svg
                    aria-label="GitHub"
                    height="20"
                    role="img"
                    viewBox="0 0 98 96"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                      fill="currentColor"
                      fillRule="evenodd"
                    />
                  </svg>
                </Button>
              </a>
              <ThemeSwitcher />
            </SidebarFooter>
          </Sidebar>
        </aside>
      </div>

      <div className={styles.collapsedButtons}>
        <div className={styles.collapsedButtonsInner}>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  aria-label="Toggle sidebar"
                  className={`${styles.collapsedButton} hit-area-extend`}
                  onClick={handleToggleCollapse}
                  render={<div />}
                  size="icon"
                  variant="ghost"
                >
                  <svg
                    aria-hidden="true"
                    className={styles.collapseIcon}
                    fill="none"
                    height="18"
                    viewBox="0 0 24 24"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      fill="none"
                      height="18"
                      rx="2"
                      ry="2"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      width="18"
                      x="3"
                      y="3"
                    />
                    <path
                      d="M9 3L9 21"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <rect
                      className={`${styles.collapseIconFill} ${!open ? styles.collapseIconFillActive : ""}`}
                      fill="currentColor"
                      height="18"
                      rx="2"
                      ry="2"
                      width="6"
                      x="3"
                      y="3"
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
                  aria-label="Search"
                  className={`${styles.collapsedButton} hit-area-extend`}
                  onClick={triggerSearch}
                  render={<div />}
                  size="icon"
                  variant="ghost"
                >
                  <svg
                    aria-hidden="true"
                    fill="none"
                    height="18"
                    viewBox="0 0 16 16"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M14 14L10.5 10.5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
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
    </>
  );
}


function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
      fill="none"
      height="12"
      viewBox="0 0 12 12"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function getIconForItem(itemName: string) {
  const name = itemName.toLowerCase();

  if (name === "quick start") {
    return <Gauge className={styles.sidebarItemIcon} size={16} />;
  }
  if (name === "about roi ui" || name === "intro") {
    return (
      <Logo
        className={styles.sidebarItemIcon}
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

function hasActiveDescendant(item: SidebarItem, pathname: string): boolean {
  if (!item.children) {
    return false;
  }

  return item.children.some((child) => {
    if (pathname.startsWith(child.url || "")) {
      return true;
    }
    if (child.children) {
      return child.children.some((grandchild) =>
        pathname.startsWith(grandchild.url || "")
      );
    }
    return false;
  });
}

function buildGroupClasses(level: number): string {
  const classes = [styles.sidebarGroup];

  if (level === 0) {
    classes.push(styles.topLevelGroup);
  }
  if (level === 1) {
    classes.push(styles.nestedGroup);
  }

  return classes.filter(Boolean).join(" ");
}

function buildHeaderClasses(
  level: number,
  isCollapsedWithActive: boolean
): string {
  const classes = [
    level === 1 ? styles.nestedGroupHeader : styles.sidebarGroupHeader,
  ];

  if (isCollapsedWithActive) {
    classes.push(styles.activeHeader);
  }

  return classes.filter(Boolean).join(" ");
}

function SidebarItemLink({
  item,
  isActive,
  level,
}: {
  item: SidebarItem;
  isActive: boolean;
  level: number;
}) {
  const content = (
    <span
      className={`${styles.sidebarItem} ${isActive ? styles.active : ""} ${item.disabled ? styles.disabled : ""}`}
      data-level={level}
    >
      {getIconForItem(item.name as string)}
      {item.name}
      {item.badge && (
        <Badge className={styles.badge} size="sm" variant="secondary">
          {item.badge}
        </Badge>
      )}
    </span>
  );

  return (
    <div className={styles.sidebarItemWrapper}>
      {item.disabled || !item.url ? (
        content
      ) : (
        <Link className={styles.sidebarLink} href={item.url}>
          {content}
        </Link>
      )}
    </div>
  );
}

function GroupHeader({
  item,
  isCollapsible,
  isExpanded,
  onToggle,
  headerClasses,
  titleClasses,
  headerRef,
}: {
  item: SidebarItem;
  isCollapsible: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  headerClasses: string;
  titleClasses: string;
  headerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const titleContent = (
    <>
      {getIconForItem(item.name as string)}
      {item.name}
    </>
  );

  if (isCollapsible) {
    return (
      <button
        aria-expanded={isExpanded}
        className={headerClasses}
        onClick={onToggle}
        ref={headerRef}
        type="button"
      >
        <h5 className={titleClasses}>{titleContent}</h5>
        <ChevronIcon isOpen={isExpanded} />
      </button>
    );
  }

  return <h5 className={titleClasses}>{titleContent}</h5>;
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
  const hasActiveChild = hasActiveDescendant(item, pathname);

  // Call hooks unconditionally before early return
  const [isExpanded, setIsExpanded] = useState<boolean>(
    level === 0 ? item.name === "UI" : hasActiveChild
  );
  const childrenRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLButtonElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  // Early return for simple link items
  if (!hasChildren && item.type === "page" && item.url) {
    return <SidebarItemLink isActive={isActive} item={item} level={level} />;
  }

  const isCollapsible = Boolean(level === 1 && hasChildren);
  const isCollapsedWithActiveChild = !isExpanded && hasActiveChild;

  const groupClasses = buildGroupClasses(level);
  const headerClasses = buildHeaderClasses(level, isCollapsedWithActiveChild);
  const titleClasses =
    level === 1 ? styles.nestedGroupTitle : styles.sidebarGroupTitle;

  return (
    <div className={groupClasses} ref={groupRef}>
      <GroupHeader
        headerClasses={headerClasses}
        headerRef={headerRef}
        isCollapsible={isCollapsible}
        isExpanded={isExpanded}
        item={item}
        onToggle={() => setIsExpanded(!isExpanded)}
        titleClasses={titleClasses}
      />

      {hasChildren && (
        <div
          className={`${styles.sidebarGroupChildren} ${isCollapsible && !isExpanded ? styles.collapsed : ""}`}
          ref={childrenRef}
          style={{
            display: isCollapsible ? (isExpanded ? "flex" : "none") : "flex",
          }}
        >
          {item.children?.map((child, index) => (
            <DocsSidebarGroup
              item={child}
              key={child.$id || `child-${index}`}
              level={level + 1}
              pathname={pathname}
            />
          ))}
        </div>
      )}
    </div>
  );
}
