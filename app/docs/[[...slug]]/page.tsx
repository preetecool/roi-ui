import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import { mdxComponents } from "@/mdx-components";
import { source } from "@/lib/source";
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
        {...((!params.slug || params.slug.length === 0 || (params.slug.length === 1 && params.slug[0] === "start")) && {
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
          {links ? (
            <div className={styles.linksSection}>
              {links?.doc && (
                <Button variant="link" size="sm" style={{ paddingLeft: 0 }} showArrow pointExternal>
                  <Link href={links.doc}>Docs</Link>
                </Button>
              )}
              {links?.api && (
                <Button variant="link" size="sm" style={{ paddingLeft: 0 }} showArrow pointExternal>
                  <Link href={links.api}>API Reference</Link>
                </Button>
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
              <Link href={neighbours.previous.url}>
                <Button variant="ghost" showArrow pointLeft className={styles.buttonCustomStyle}>
                  {neighbours.previous.data.title}
                </Button>
              </Link>
            )}
          </div>

          <div className={styles.nextButton}>
            {neighbours.next && (
              <Link href={neighbours.next.url}>
                <Button variant="ghost" showArrow className={styles.buttonCustomStyle}>
                  {neighbours.next.data.title}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
