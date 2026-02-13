"use client";

import * as React from "react";
import { cn } from "@/lib/utils-tailwind";
import { Button } from "@/registry/brook/tailwind/ui/button";
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from "@/registry/brook/tailwind/ui/drawer";

const TOP_MARGIN_REM = 1;
const VISIBLE_SNAP_POINTS_REM = [30];

function toViewportSnapPoint(heightRem: number) {
  return `${heightRem + TOP_MARGIN_REM}rem`;
}

const snapPoints = [...VISIBLE_SNAP_POINTS_REM.map(toViewportSnapPoint), 1];

export default function DrawerSnapPoints() {
  return (
    <Drawer snapPoints={snapPoints}>
      <DrawerTrigger render={<Button>Explore</Button>} />
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport className="touch-none">
          <DrawerPopup
            className={cn(
              "[--bleed:3rem] relative flex flex-col",
              "!max-h-[calc(100dvh-var(--top-margin))] !p-0 !pb-[max(0px,calc(var(--drawer-snap-point-offset)+var(--drawer-swipe-movement-y)))]",
              "!mb-0 overflow-visible touch-none",
              "shadow-[0_-16px_48px_rgb(0_0_0/0.12),0_6px_18px_rgb(0_0_0/0.06),0_0_0_1px_oklch(from_var(--border)_l_c_h/0.5)]",
              "transition-[transform,box-shadow] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
              "[transform:translateY(calc(var(--drawer-snap-point-offset)+var(--drawer-swipe-movement-y)))]",
              "after:content-[''] after:absolute after:inset-x-0 after:top-full after:h-[var(--bleed)] after:bg-[var(--mix-card-5-bg)] after:pointer-events-none",
              "data-[starting-style]:[transform:translateY(100%)] data-[starting-style]:!pb-0",
              "data-[starting-style]:shadow-[0_-16px_48px_rgb(0_0_0/0),0_6px_18px_rgb(0_0_0/0),0_0_0_1px_oklch(from_var(--border)_l_c_h/0)]",
              "data-[ending-style]:[transform:translateY(100%)] data-[ending-style]:!pb-0",
              "data-[ending-style]:shadow-[0_-16px_48px_rgb(0_0_0/0),0_6px_18px_rgb(0_0_0/0),0_0_0_1px_oklch(from_var(--border)_l_c_h/0)]",
              "data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
            )}
            style={{ "--top-margin": `${TOP_MARGIN_REM}rem` } as React.CSSProperties}
          >
            <div className="shrink-0 touch-none border-b border-border px-6 pt-3.5 pb-3">
              <div className="mx-auto mb-2.5 h-1 w-12 shrink-0 rounded-full bg-border" />
              <DrawerTitle className="m-0 text-center cursor-default">Discover</DrawerTitle>
            </div>
            <DrawerContent className="flex-1 min-h-0 max-w-none overflow-y-auto overscroll-contain touch-auto px-6 pt-4 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
              <div className="mx-auto w-full max-w-[350px]">
                <DrawerDescription className="text-center">
                  Trending topics and curated picks based on your interests.
                </DrawerDescription>
                <div className="mb-6 grid gap-3" aria-hidden>
                  {Array.from({ length: 20 }, (_, index) => (
                    <div className="h-12 rounded-[calc(var(--radius)-2px)] border border-border bg-accent" key={index} />
                  ))}
                </div>
                <div className="flex items-center justify-end gap-4">
                  <DrawerClose render={<Button variant="outline" size="sm">Close</Button>} />
                </div>
              </div>
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  );
}
