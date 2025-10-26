"use client";

import type { PageTree } from "fumadocs-core/server";
import { Gauge } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useEffect, useState } from "react";
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
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
  return (
    <>
      <Search tree={tree} />
      <SidebarProvider defaultOpen={true}>
        <DocsSidebarContent tree={tree} />
      </SidebarProvider>
    </>
  );
}

function DocsSidebarContent({ tree }: { tree: PageTree.Root }) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  const triggerSearch = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

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
    <TooltipProvider delay={150}>
      <Sidebar className={styles.sidebar} collapsible="offcanvas" side="left">
        <SidebarHeader id={styles.header}>
          <div className={styles.logoRow}>
            <Link className={styles.logoLink} href="/">
              <Logo
                fillColor="var(--foreground)"
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
                  <SidebarTrigger
                    aria-label="Collapse sidebar"
                    className="hit-area-extend"
                    id={styles.collapseButton}
                    render={<div />}
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
                        className={`${styles.collapseIconFill} ${state === "collapsed" ? styles.collapseIconFillActive : ""}`}
                        fill="currentColor"
                        height="18"
                        rx="2"
                        ry="2"
                        width="6"
                        x="3"
                        y="3"
                      />
                    </svg>
                  </SidebarTrigger>
                }
              />
              <TooltipPortal>
                <TooltipPositioner side="right">
                  <TooltipPopup>{tooltipContent}</TooltipPopup>
                </TooltipPositioner>
              </TooltipPortal>
            </Tooltip>
          </div>

          <SearchTrigger />
        </SidebarHeader>

        <SidebarContent className={styles.content}>
          {tree.children.map((item, index) => (
            <SidebarGroup key={item.$id || `item-${index}`}>
              <DocsSidebarGroup
                item={item as SidebarItem}
                level={0}
                pathname={pathname}
              />
            </SidebarGroup>
          ))}
        </SidebarContent>

        <DocsSidebarFooter />
      </Sidebar>

      {state === "collapsed" && (
        <div className={styles.collapsedButtons}>
          <div className={styles.collapsedButtonsInner}>
            <Tooltip>
              <TooltipTrigger
                render={
                  <SidebarTrigger
                    aria-label="Toggle sidebar"
                    className="hit-area-extend"
                    id={styles.collapsedButton}
                    render={<div />}
                  >
                    <svg
                      aria-hidden="true"
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
                        className={`${styles.collapseIconFill} ${state === "collapsed" ? styles.collapseIconFillActive : ""}`}
                        fill="currentColor"
                        height="18"
                        rx="2"
                        ry="2"
                        width="6"
                        x="3"
                        y="3"
                      />
                    </svg>
                  </SidebarTrigger>
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
      )}
    </TooltipProvider>
  );
}

// Memoize footer since it doesn't depend on pathname
const DocsSidebarFooter = memo(() => (
  <SidebarFooter className={styles.footer}>
    <a
      aria-label="View source on GitHub"
      className={styles.githubLink}
      href="https://github.com/preetecool/roi-ui"
      rel="noopener noreferrer"
      target="_blank"
    >
      <Button aria-label="View source on GitHub" size="icon" variant="ghost">
        <svg
          aria-label="GitHub"
          height="18"
          role="img"
          viewBox="0 0 98 96"
          width="18"
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
));

DocsSidebarFooter.displayName = "DocsSidebarFooter";

// Memoize SearchTrigger since it has no dynamic props
const SearchTrigger = memo(() => {
  const triggerSearch = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <Button id={styles.searchWrapper} onClick={triggerSearch} variant="ghost">
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
  );
});

SearchTrigger.displayName = "SearchTrigger";

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
      <SidebarMenuItem className={styles.menuButton}>
        <SidebarMenuButton
          isActive={isActive}
          render={<Link href={item.url} />}
        >
          {getIconForItem(item.name as string)}
          <span>{item.name}</span>
          {item.badge && (
            <Badge className={styles.badge} size="sm" variant="secondary">
              {item.badge}
            </Badge>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  if (level === 0 && hasChildren) {
    return (
      <>
        <SidebarGroupLabel id={styles.groupLabel}>
          {getIconForItem(item.name as string)}
          {item.name}
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {item.children?.map((child, index) => (
              <DocsSidebarGroup
                item={child}
                key={child.$id || `child-${index}`}
                level={level + 1}
                pathname={pathname}
              />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </>
    );
  }

  return null;
}
