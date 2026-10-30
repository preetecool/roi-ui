import { ThemeProvider } from "next-themes";
import { PaletteProvider } from "@/components/providers/palette-provider";
import { StyleProvider } from "@/components/providers/style-provider";
import "@/styles/globals.css";
import "@/styles/syntax-highlight.css";
import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://roiui.com"),
  title: {
    default: "Roi UI - Components built on Base UI",
    template: "%s - Roi UI",
  },
  description: "Copy-paste components built on Base UI, in CSS Modules or Tailwind.",
  openGraph: {
    images: ["/og"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${GeistSans.className} ${GeistMono.variable}`} lang="en" suppressHydrationWarning>
      <body>
        <div className="root">
          <StyleProvider>
            <ThemeProvider defaultTheme="dark" disableTransitionOnChange enableSystem storageKey="theme">
              <PaletteProvider>
                {children}
                <Analytics />
              </PaletteProvider>
            </ThemeProvider>
          </StyleProvider>
        </div>
      </body>
    </html>
  );
}
