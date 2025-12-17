"use client";

import dynamic from "next/dynamic";
import { SiteFooter } from "@/components/layout/site-footer/site-footer";
import type { PageTree } from "@/lib/source-types";
import { Hero } from "./hero/hero";
import styles from "./home-page.module.css";

const SiteHeader = dynamic(() => import("@/components/layout/site-header/site-header").then((mod) => mod.SiteHeader), {
  ssr: false,
});

type HomePageProps = {
  pageTree: PageTree.Root;
};

export default function HomePage({ pageTree }: HomePageProps) {
  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <SiteHeader isHomePage pageTree={pageTree} />
      </div>
      <div className={styles.mainWrapper}>
        <div className={styles.contentWrapper}>
          <div className={styles.homeContent}>
            <Hero />
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
