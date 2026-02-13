"use client";

import * as React from "react";
import Link from "next/link";
import { ScrollArea } from "@base-ui/react/scroll-area";
import { Button } from "@/registry/brook/ui/button/button";
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHandle,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from "@/registry/brook/ui/drawer/drawer";
import styles from "./drawer-mobile-nav.module.css";

const ITEMS = [
  { href: "#", label: "Home" },
  { href: "#", label: "Products" },
  { href: "#", label: "Pricing" },
  { href: "#", label: "About" },
] as const;

const LONG_LIST = Array.from({ length: 50 }, (_, i) => ({
  href: "#",
  label: `Page ${i + 1}`,
}));

export default function DrawerMobileNav() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button>Open Menu</Button>} />
      <DrawerPortal>
        <DrawerBackdrop className={styles.backdrop} />
        <DrawerViewport className={styles.viewport}>
          <ScrollArea.Root style={{ position: undefined }} className={styles.scrollAreaRoot}>
            <ScrollArea.Viewport className={styles.scrollAreaViewport}>
              <ScrollArea.Content className={styles.scrollContent}>
                <DrawerPopup className={styles.popup}>
                  <nav aria-label="Navigation" className={styles.panel}>
                    <div className={styles.header}>
                      <div aria-hidden className={styles.headerSpacer} />
                      <DrawerHandle className={styles.handle} />
                      <DrawerClose aria-label="Close menu" className={styles.closeButton}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M0.75 0.75L6 6M11.25 11.25L6 6M6 6L0.75 11.25M6 6L11.25 0.75"
                            stroke="currentcolor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </DrawerClose>
                    </div>

                    <DrawerContent className={styles.content}>
                      <DrawerTitle className={styles.title}>Navigation</DrawerTitle>
                      <DrawerDescription className={styles.description}>
                        Browse all sections. Pull down to dismiss.
                      </DrawerDescription>

                      <div className={styles.scrollArea}>
                        <ul className={styles.list}>
                          {ITEMS.map((item) => (
                            <li key={item.label} className={styles.item}>
                              <Link className={styles.link} href={item.href}>
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>

                        <ul className={styles.longList} aria-label="Long list">
                          {LONG_LIST.map((item) => (
                            <li key={item.label} className={styles.item}>
                              <Link className={styles.link} href={item.href}>
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </DrawerContent>
                  </nav>
                </DrawerPopup>
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className={styles.scrollbar}>
              <ScrollArea.Thumb className={styles.scrollbarThumb} />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  );
}
