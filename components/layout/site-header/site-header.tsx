"use client";

import Link from "next/link";
import { Search } from "@/components/docs/search/search";
import { MobileNav } from "@/components/layout/mobile-nav/mobile-nav";
import { ThemeSwitcher } from "@/components/layout/theme-switcher/theme-switcher";
import { GitHubIcon } from "@/components/shared/github-icon";
import { Logo } from "@/components/shared/logo";
import type { PageTree } from "@/lib/source-types";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./site-header.module.css";

type SiteHeaderProps = {
  pageTree?: PageTree.Root;
  isHomePage?: boolean;
};

export function SiteHeader({ pageTree, isHomePage }: SiteHeaderProps) {
  return (
    <header className={styles.header}>
      <div
        className={styles.container}
        style={isHomePage ? { padding: 0 } : undefined}
      >
        <div
          className={styles.innerWrapper}
          style={isHomePage ? { paddingLeft: 0, paddingRight: 0 } : undefined}
        >
          <nav className={styles.nav}>
            <div className={styles.leftSection}>
              <Link
                aria-label="ROI UI Home"
                className={styles.logoLink}
                href="/"
              >
                <Logo
                  fillColor="var(--foreground)"
                  height={24}
                  strokeColor="var(--card)"
                  strokeWidth={12}
                  width={24}
                />
              </Link>
            </div>

            <div className={`${styles.navLinks} lg:flex`}>
              <Button
                aria-label="Navigate to /docs page"
                className={styles.navLink}
                render={<Link href="/docs" />}
                size="sm"
                variant="ghost"
              >
                Docs
              </Button>
              <Button
                aria-label="Navigate to /components page"
                className={styles.navLink}
                render={<Link href="/docs/components" />}
                size="sm"
                variant="ghost"
              >
                Components
              </Button>
            </div>
          </nav>

          <div className={styles.actions}>
            <div className={styles.desktopOnly}>
              <Search tree={pageTree} />
            </div>
            <div className={`${styles.separator} ${styles.desktopOnly}`} />
            <Button
              aria-label="View source on GitHub"
              className={`${styles.githubLink} ${styles.desktopOnly}`}
              render={
                <Link
                  href="https://github.com/preetecool/roi-ui"
                  rel="noopener noreferrer"
                  target="_blank"
                />
              }
              size="icon"
              variant="ghost"
            >
              <GitHubIcon />
            </Button>
            <div className={`${styles.separator} ${styles.desktopOnly}`} />
            <div className={styles.desktopOnly}>
              <ThemeSwitcher />
            </div>
            {pageTree && (
              <div className={styles.mobileMenuWrapper}>
                <MobileNav tree={pageTree} />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
