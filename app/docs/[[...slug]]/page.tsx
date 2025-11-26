import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TableOfContents } from "@/components/docs/toc/toc";
import { source } from "@/lib/source";
import { mdxComponents } from "@/mdx-components";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./page.module.css";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const doc = page.data;

  if (!(doc.title && doc.description)) {
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

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    notFound();
  }

  const doc = page.data;

  const MDX = doc.body;
  const links = doc.links;
  const components = doc.components;
  const motion = doc.motion;
  const toc = doc.toc;

  const allPages = source.getPages();
  const currentIndex = allPages.findIndex((p) => p.url === page.url);
  const neighbours = {
    previous: currentIndex > 0 ? allPages[currentIndex - 1] : null,
    next:
      currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null,
  };

  return (
    <>
      <div className={styles.pageContent}>
        <div className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <div className={styles.titleSection}>
              <h1 className={styles.pageTitle}>{doc.title}</h1>
            </div>
            {doc.description && (
              <p className={styles.pageDescription}>{doc.description}</p>
            )}
          </div>
          {links || components ? (
            <div className={styles.linksSection}>
              {(links?.doc || links?.api) && (
                <div className={styles.externalLinks}>
                  {links?.doc && (
                    <Button
                      className={styles.badgeButton}
                      pointExternal
                      render={
                        <Link
                          href={links.doc}
                          rel="noopener noreferrer"
                          target="_blank"
                        />
                      }
                      showArrow
                      size="sm"
                      variant="outline"
                    >
                      Docs
                    </Button>
                  )}
                  {links?.api && (
                    <Button
                      className={styles.badgeButton}
                      pointExternal
                      render={
                        <Link
                          href={links.api}
                          rel="noopener noreferrer"
                          target="_blank"
                        />
                      }
                      showArrow
                      size="sm"
                      variant="outline"
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
                      className={styles.badgeButton}
                      key={component}
                      render={<Link href={`/docs/ui/${component}`} />}
                      size="sm"
                      variant="secondary"
                    >
                      {component.charAt(0).toUpperCase() + component.slice(1)}
                    </Button>
                  ))}
                  {motion && (
                    <Button
                      className={styles.badgeButton}
                      pointExternal
                      render={
                        <Link
                          href="https://motion.dev"
                          rel="noopener noreferrer"
                          target="_blank"
                        />
                      }
                      showArrow
                      size="sm"
                      variant="outline"
                    >
                      Motion
                    </Button>
                  )}
                </div>
              )}
            </div>
          ) : null}
        </div>

        <div className={styles.contentWrapper}>
          <MDX components={mdxComponents} />
        </div>

        <div className={styles.bottomNavigation}>
          <div className={styles.prevButton}>
            {neighbours.previous && (
              <Button
                className={styles.buttonCustomStyle}
                pointLeft
                render={<Link href={neighbours.previous.url} />}
                showArrow
                size="sm"
                variant="ghost"
              >
                {neighbours.previous.data.title}
              </Button>
            )}
          </div>

          <div className={styles.nextButton}>
            {neighbours.next && (
              <Button
                className={styles.buttonCustomStyle}
                render={<Link href={neighbours.next.url} />}
                showArrow
                size="sm"
                variant="ghost"
              >
                {neighbours.next.data.title}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.toc}>
        <TableOfContents toc={toc} />
      </div>
    </>
  );
}
