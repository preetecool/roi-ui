"use client";

import { Button } from "@/registry/brook/ui/button/button";
import type { PageTree } from "fumadocs-core/server";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "../logo";
import { MobileNav } from "../mobile-nav/mobile-nav";
import { ThemeSwitcher } from "../theme-switcher/theme-switcher";
import styles from "./site-header.module.css";

interface SiteHeaderProps {
  pageTree?: PageTree.Root;
}

export function SiteHeader({ pageTree }: SiteHeaderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const top = useTransform(scrollY, [0, 100], isMobile ? [0, 0] : [30, 0]);
  const borderOpacity = useTransform(scrollY, [0, 50], isMobile ? [1, 1] : [0, 1]);

  return (
    <motion.header
      className={styles.header}
      style={{
        top,
      }}
    >
      <div className={styles.container}>
        <motion.div
          style={{
            borderBottom: "1px solid var(--border-dark)",
            borderBottomColor: useTransform(
              borderOpacity,
              (o) => `color-mix(in oklch, var(--border-dark) ${o * 50}%, transparent)`,
            ),
            marginLeft: "-20px",
            marginRight: "-20px",
            paddingLeft: "20px",
            paddingRight: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            width: "calc(100% + 40px)",
          }}
        >
          <nav className={styles.nav}>
            <div className={styles.leftSection}>
              <Link href="/" className={styles.logoLink}>
                <Logo width={24} height={24} fillColor="var(--muted-foreground)" strokeColor="var(--card)" />
              </Link>
            </div>

            <div className={`${styles.navLinks} lg:flex`}>
              <Button size="sm" variant="ghost" className={styles.navLink} render={<Link href="/docs" />}>
                Docs
              </Button>
            </div>
          </nav>

          <div className={styles.actions}>
            <Button
              variant="ghost"
              size="icon"
              className={`${styles.githubLink} ${styles.desktopOnly}`}
              aria-label="View source on GitHub"
              render={
                <a href="https://github.com/preetecool/roi-ui" target="_blank" rel="noopener noreferrer" />
              }
            >
              <svg width="18" height="18" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                  fill="currentColor"
                />
              </svg>
            </Button>
            <div className={`${styles.separator} ${styles.desktopOnly}`}></div>
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
