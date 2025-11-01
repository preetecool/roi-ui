"use client";

import type { PageTree } from "fumadocs-core/server";
import { memo } from "react";
import { Search } from "@/components/search/search";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { SiteHeader } from "@/components/site-header/site-header";
import { BentoGrid } from "./bento-grid/bento-grid";
import { Hero } from "./hero/hero";
import styles from "./home-page.module.css";

type HomePageProps = {
  pageTree: PageTree.Root;
};

const HeaderWrapper = memo<{ pageTree: PageTree.Root }>(({ pageTree }) => (
  <div className={styles.headerWrapper}>
    <SiteHeader isHomePage pageTree={pageTree} />
  </div>
));

HeaderWrapper.displayName = "HeaderWrapper";

const HomeContent = memo(() => (
  <div className={styles.homeContent}>
    <Hero />
    <BentoGrid />
  </div>
));

HomeContent.displayName = "HomeContent";

const ContentWrapper = memo(() => (
  <div className={styles.contentWrapper}>
    <HomeContent />
  </div>
));

ContentWrapper.displayName = "ContentWrapper";

export default function HomePage({ pageTree }: HomePageProps) {
  return (
    <>
      <Search tree={pageTree} />
      <div className={styles.container}>
        <HeaderWrapper pageTree={pageTree} />
        <div className={styles.mainWrapper}>
          <ContentWrapper />
        </div>
        <SiteFooter />
      </div>
    </>
  );
}
