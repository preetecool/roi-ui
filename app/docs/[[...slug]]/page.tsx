import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { source } from "@/lib/source";
import { mdxComponents } from "@/mdx-components";
import { Badge } from "@/registry/brook/ui/badge/badge";
import { Button } from "@/registry/brook/ui/button/button";

import { TOCUpdater } from "@/components/toc-updater";
import styles from "./page.module.css";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const doc = page.data;

  if (!doc.title || !doc.description) {
    notFound();
  }

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: page.url,
      images: [
        {
          url: `/og?title=${encodeURIComponent(doc.title)}&description=${encodeURIComponent(doc.description)}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [
        {
          url: `/og?title=${encodeURIComponent(doc.title)}&description=${encodeURIComponent(doc.description)}`,
        },
      ],
    },
  };
}

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    notFound();
  }

  const doc = page.data;

  // @ts-expect-error - revisit fumadocs types.
  const MDX = doc.body;
  // @ts-expect-error - revisit fumadocs types.
  const links = doc.links;
  // @ts-expect-error - revisit fumadocs types.
  const components = doc.components;
  // @ts-expect-error - revisit fumadocs types.
  const motion = doc.motion;
  // @ts-expect-error - revisit fumadocs types.
  const exportedToc = doc.toc;

  const toc = exportedToc;

  const allPages = source.getPages();
  const currentIndex = allPages.findIndex((p) => p.url === page.url);
  const neighbours = {
    previous: currentIndex > 0 ? allPages[currentIndex - 1] : null,
    next: currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null,
  };

  return (
    <>
      <TOCUpdater toc={toc} />

      <div
        className={styles.pageContent}
        {...(doc.title === "Introduction" && {
          "data-introduction-page": true,
        })}
        {...((!params.slug ||
          params.slug.length === 0 ||
          (params.slug.length === 1 && params.slug[0] === "start")) && {
          "data-no-gap-page": true,
        })}
      >
        <div className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <div className={styles.titleSection}>
              <h1 className={styles.pageTitle}>{doc.title}</h1>
            </div>
            {doc.description && <p className={styles.pageDescription}>{doc.description}</p>}
          </div>
          {links || components ? (
            <div className={styles.linksSection}>
              {(links?.doc || links?.api) && (
                <div className={styles.externalLinks}>
                  {links?.doc && (
                    <Button
                      variant="outline"
                      size="sm"
                      showArrow
                      pointExternal
                      className={styles.badgeButton}
                      render={<a href={links.doc} target="_blank" rel="noopener noreferrer" />}
                    >
                      Docs
                    </Button>
                  )}
                  {links?.api && (
                    <Button
                      variant="outline"
                      size="sm"
                      showArrow
                      pointExternal
                      className={styles.badgeButton}
                      render={<a href={links.api} target="_blank" rel="noopener noreferrer" />}
                    >
                      API Reference
                    </Button>
                  )}
                </div>
              )}
              {components && components.length > 0 && (
                <div className={styles.componentBadges}>
                  {components.map((component: string) => (
                    <Button
                      key={component}
                      variant="secondary"
                      size="sm"
                      className={styles.badgeButton}
                      render={<Link href={`/docs/ui/${component}`} />}
                    >
                      {component.charAt(0).toUpperCase() + component.slice(1)}
                    </Button>
                  ))}
                  {motion && (
                    <Button
                      variant="outline"
                      size="sm"
                      showArrow
                      pointExternal
                      className={styles.badgeButton}
                      render={<a href="https://motion.dev" target="_blank" rel="noopener noreferrer" />}
                    >
                      Motion
                    </Button>
                  )}
                </div>
              )}
            </div>
          ) : null}
        </div>

        <div className={`${styles.contentWrapper} docs-content`}>
          <MDX components={mdxComponents} />
        </div>

        <div className={styles.bottomNavigation}>
          <div className={styles.prevButton}>
            {neighbours.previous && (
              <Button
                variant="ghost"
                showArrow
                pointLeft
                className={styles.buttonCustomStyle}
                render={<Link href={neighbours.previous.url} />}
              >
                {neighbours.previous.data.title}
              </Button>
            )}
          </div>

          <div className={styles.nextButton}>
            {neighbours.next && (
              <Button
                variant="ghost"
                showArrow
                className={styles.buttonCustomStyle}
                render={<Link href={neighbours.next.url} />}
              >
                {neighbours.next.data.title}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
