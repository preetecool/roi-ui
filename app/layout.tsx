import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/docs-styles.css";
import "@/styles/globals.css";
import "@/styles/syntax-highlight.css";
import { Analytics } from "@vercel/analytics/next";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roi UI - Component system with CSS Modules",
  description: "Copy-paste components built on Base UI and CSS Modules",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={GeistSans.className} lang="en" suppressHydrationWarning>
      <head>
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/favicon.ico" rel="icon" sizes="any" />
        <link href="/favicon.svg" rel="shortcut icon" />
      </head>
      <body
        className="root"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          minHeight: "100vh",
          margin: 0,
          padding: 0,
        }}
      >
        <ThemeProvider
          defaultTheme="dark"
          disableTransitionOnChange
          enableSystem
          storageKey="theme"
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
