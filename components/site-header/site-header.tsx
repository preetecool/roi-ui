"use client";

import type { PageTree } from "fumadocs-core/server";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/registry/brook/ui/button/button";
import { Logo } from "../logo";
import { MobileNav } from "../mobile-nav/mobile-nav";
import { ThemeSwitcher } from "../theme-switcher/theme-switcher";
import styles from "./site-header.module.css";

type SiteHeaderProps = {
  pageTree?: PageTree.Root;
};

export function SiteHeader({ pageTree }: SiteHeaderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();

  const MOBILE_BREAKPOINT = 1024;
  const SCROLL_THRESHOLD = 100;
  const HEADER_TOP_OFFSET = 30;

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const top = useTransform(
    scrollY,
    [0, SCROLL_THRESHOLD],
    isMobile ? [0, 0] : [HEADER_TOP_OFFSET, 0]
  );

  return (
    <motion.header
      className={styles.header}
      style={{
        top,
      }}
    >
      <div className={styles.container}>
        <motion.div className={styles.innerWrapper}>
          <nav className={styles.nav}>
            <div className={styles.leftSection}>
              <Link className={styles.logoLink} href="/">
                <Logo
                  fillColor="var(--muted-foreground)"
                  height={24}
                  strokeColor="var(--card)"
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
            </div>
          </nav>

          <div className={styles.actions}>
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
        </motion.div>
      </div>
    </motion.header>
  );
}
