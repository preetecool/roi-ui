import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TableOfContents } from "@/components/docs/toc/toc";
import { FooterNav } from "@/components/layout/footer-nav/footer-nav";
import { source } from "@/lib/source";
import { mdxComponents } from "@/mdx-components";
import { ArrowPointer, Button } from "@/registry/brook/ui/button/button";
import styles from "./page.module.css";

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

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
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

  const pageOrder = ["/docs", "/docs/start", "/docs/components"];
  const allPages = source.getPages();
  const uiPages = allPages.filter((p) => p.url.startsWith("/docs/ui/")).sort((a, b) => a.url.localeCompare(b.url));
  const orderedPages = [...pageOrder.map((url) => allPages.find((p) => p.url === url)).filter(Boolean), ...uiPages];
  const currentIndex = orderedPages.findIndex((p) => p?.url === page.url);
  const neighbours = {
    previous: currentIndex > 0 ? orderedPages[currentIndex - 1] : null,
    next: currentIndex < orderedPages.length - 1 ? orderedPages[currentIndex + 1] : null,
  };

  return (
    <>
      <article className={styles.pageContent}>
        <header className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <div className={styles.titleSection}>
              <h1 className={styles.pageTitle}>{doc.title}</h1>
            </div>
            {doc.description ? <p className={styles.pageDescription}>{doc.description}</p> : null}
          </div>
          {links || components ? (
            <div className={styles.linksSection}>
              {links?.doc || links?.api ? (
                <div className={styles.externalLinks}>
                  {links?.doc ? (
                    <Button
                      className={styles.badgeButton}
                      nativeButton={false}
                      render={<Link href={links.doc} rel="noopener noreferrer" target="_blank" />}
                      size="sm"
                      variant="outline"
                    >
                      Docs
                      <ArrowPointer pointExternal />
                    </Button>
                  ) : null}
                  {links?.api ? (
                    <Button
                      className={styles.badgeButton}
                      nativeButton={false}
                      render={<Link href={links.api} rel="noopener noreferrer" target="_blank" />}
                      size="sm"
                      variant="outline"
                    >
                      API Reference
                      <ArrowPointer pointExternal />
                    </Button>
                  ) : null}
                </div>
              ) : null}
              {components && components.length > 0 ? (
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
                  {motion ? (
                    <Button
                      className={styles.badgeButton}
                      render={<Link href="https://motion.dev" rel="noopener noreferrer" target="_blank" />}
                      size="sm"
                      variant="outline"
                    >
                      Motion
                      <ArrowPointer pointExternal />
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </header>

        <div className={`${styles.contentWrapper} ${styles.prose}`}>
          <MDX components={mdxComponents} />
        </div>

        <FooterNav
          className={styles.footerNav}
          next={neighbours.next ? { url: neighbours.next.url, title: neighbours.next.data.title } : null}
          previous={
            neighbours.previous ? { url: neighbours.previous.url, title: neighbours.previous.data.title } : null
          }
        />
      </article>

      <aside className={styles.toc}>
        <TableOfContents toc={toc} />
      </aside>
    </>
  );
}
