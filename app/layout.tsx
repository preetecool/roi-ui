import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/docs-styles.css";
import "@/styles/globals.css";
import "@/styles/syntax-highlight.css";
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
          className="root"
          style={{
            backgroundColor: "var(--mix-card-15-bg)",
            color: "var(--foreground)",
            minHeight: "100vh",
            margin: 0,
            padding: 0,
          }}
        >
          <ThemeProvider defaultTheme="dark" enableSystem disableTransitionOnChange storageKey="theme">
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
