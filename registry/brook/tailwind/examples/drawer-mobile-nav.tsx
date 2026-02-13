"use client";

import * as React from "react";
import Link from "next/link";
import { ScrollArea } from "@base-ui/react/scroll-area";
import { cn } from "@/lib/utils-tailwind";
import { Button } from "@/registry/brook/tailwind/ui/button";
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
} from "@/registry/brook/tailwind/ui/drawer";

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
        <DrawerBackdrop
          className={cn(
            "[--backdrop-opacity:1] !bg-transparent",
            "bg-[linear-gradient(to_bottom,rgb(0_0_0/5%)_0,rgb(0_0_0/10%)_50%)]",
            "backdrop-blur-[1.5px]",
            "opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))]",
            "transition-[backdrop-filter,opacity] duration-[600ms] ease-[cubic-bezier(0.45,1.005,0,1.005)]",
            "data-[starting-style]:backdrop-blur-0 data-[starting-style]:opacity-0",
            "data-[ending-style]:backdrop-blur-0 data-[ending-style]:opacity-0",
            "data-[ending-style]:duration-[350ms] data-[ending-style]:ease-[cubic-bezier(0.375,0.015,0.545,0.455)]",
          )}
        />
        <DrawerViewport className="!block fixed inset-0">
          <ScrollArea.Root
            style={{ position: undefined }}
            className={cn(
              "box-border h-full overscroll-contain",
              "transition-transform duration-[600ms] ease-[cubic-bezier(0.45,1.005,0,1.005)]",
              "[*[data-ending-style]_&]:pointer-events-none",
              "[*[data-starting-style]_&]:[transform:translateY(100dvh)]",
            )}
          >
            <ScrollArea.Viewport className="box-border h-full overscroll-contain touch-auto">
              <ScrollArea.Content className="flex min-h-full items-end justify-center pt-8 md:pt-16 md:pb-16 md:px-16">
                <DrawerPopup
                  className={cn(
                    "!box-border !w-full !max-w-[42rem] !max-h-none",
                    "!mx-auto !mb-0 !p-0 !rounded-none",
                    "!bg-transparent !shadow-none !overflow-visible !overscroll-auto",
                    "transition-transform duration-[600ms] ease-[cubic-bezier(0.45,1.005,0,1.005)]",
                    "will-change-transform [transform:translateY(var(--drawer-swipe-movement-y))]",
                    "data-[swiping]:select-none",
                    "motion-reduce:transition-none",
                    "data-[ending-style]:[transform:translateY(max(100dvh,100%))]",
                    "data-[ending-style]:duration-[350ms]",
                    "data-[ending-style]:ease-[cubic-bezier(0.375,0.015,0.545,0.455)]",
                  )}
                >
                  <nav
                    aria-label="Navigation"
                    className={cn(
                      "relative flex flex-col p-4 pb-6 pl-6",
                      "rounded-t-[var(--radius)] md:rounded-[var(--radius)]",
                      "bg-[var(--mix-card-5-bg)] text-foreground",
                      "shadow-[0_10px_64px_-10px_rgb(36_40_52/20%),0_0_0_1px_oklch(from_var(--border)_l_c_h/0.5),var(--shadow-border-stack)]",
                      "transition-shadow duration-[350ms] ease-[cubic-bezier(0.375,0.015,0.545,0.455)]",
                      "[*[data-ending-style]_&]:shadow-[0_10px_64px_-10px_rgb(36_40_52/0%),0_0_0_1px_oklch(from_var(--border)_l_c_h/0),0_0_0_0_transparent]",
                    )}
                  >
                    <div className="mb-3 grid grid-cols-[1fr_auto_1fr] items-center">
                      <div aria-hidden className="h-9 w-9" />
                      <DrawerHandle className="!m-0 w-12 h-1 rounded-full bg-border justify-self-center" />
                      <DrawerClose
                        aria-label="Close menu"
                        className={cn(
                          "flex h-9 w-9 cursor-pointer items-center justify-center justify-self-end",
                          "rounded-full border border-border bg-background text-foreground",
                          "hover:bg-accent active:bg-accent",
                          "focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:-outline-offset-1",
                        )}
                      >
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

                    <DrawerContent className="w-full max-w-none">
                      <DrawerTitle className="m-0 mb-1 text-left">Navigation</DrawerTitle>
                      <DrawerDescription className="m-0 mb-5">
                        Browse all sections. Pull down to dismiss.
                      </DrawerDescription>

                      <div className="pb-8">
                        <ul className="m-0 grid list-none gap-1 p-0">
                          {ITEMS.map((item) => (
                            <li key={item.label} className="flex">
                              <Link className="w-full rounded-[calc(var(--radius)-2px)] bg-accent px-4 py-3 text-foreground no-underline focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:-outline-offset-1" href={item.href}>
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>

                        <ul className="m-0 mt-6 grid list-none gap-1 p-0" aria-label="Long list">
                          {LONG_LIST.map((item) => (
                            <li key={item.label} className="flex">
                              <Link className="w-full rounded-[calc(var(--radius)-2px)] bg-accent px-4 py-3 text-foreground no-underline focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:-outline-offset-1" href={item.href}>
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
            <ScrollArea.Scrollbar
              className={cn(
                "absolute flex w-1 justify-center rounded-2xl opacity-0 transition-opacity duration-250 pointer-events-none m-[0.4rem]",
                "hover:opacity-100 hover:duration-75 hover:pointer-events-auto",
                "data-[scrolling]:opacity-100 data-[scrolling]:duration-75 data-[scrolling]:pointer-events-auto",
                "[*[data-ending-style]_&]:duration-250 [*[data-ending-style]_&]:opacity-0",
                "md:w-[0.4375rem]",
              )}
            >
              <ScrollArea.Thumb className="w-full rounded-[inherit] bg-muted-foreground before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-[calc(100%+1rem)] before:h-[calc(100%+1rem)]" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  );
}
