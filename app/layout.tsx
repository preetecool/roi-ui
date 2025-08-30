import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/docs-styles.css";
import "@/styles/syntax-highlight.css";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "roi-ui - Component system with CSS Modules",
  description: "Copy-paste components built on Base UI and CSS Modules",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" className={GeistSans.className} suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="shortcut icon" href="/favicon.svg" />
        </head>
        <body
          style={{
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
            minHeight: "100vh",
            margin: 0,
            padding: 0,
          }}
        >
          <ThemeProvider defaultTheme="dark" enableSystem disableTransitionOnChange storageKey="theme">
            <div className="root">
              <div style={{ position: "relative", minHeight: "100vh" }}>
                <SiteHeader />
                <main className="main-content">{children}</main>
                <SiteFooter />
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
