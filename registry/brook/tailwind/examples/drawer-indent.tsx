"use client";

import * as React from "react";
import { cn } from "@/lib/utils-tailwind";
import { Button } from "@/registry/brook/tailwind/ui/button";
import {
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHandle,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPopup,
  DrawerPortal,
  DrawerProvider,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from "@/registry/brook/tailwind/ui/drawer";

export default function DrawerIndentDemo() {
  const [portalContainer, setPortalContainer] = React.useState<HTMLDivElement | null>(null);

  return (
    <DrawerProvider>
      <div className="relative w-full overflow-hidden [--bleed:3rem]" ref={setPortalContainer}>
        <DrawerIndentBackground className="absolute inset-0 bg-black" />
        <DrawerIndent
          className={cn(
            "[--indent-progress:var(--drawer-swipe-progress)]",
            "[--indent-radius:calc(1rem*(1-var(--indent-progress)))]",
            "[--indent-transition:calc(1-clamp(0,calc(var(--drawer-swipe-progress)*100000),1))]",
            "relative min-h-[320px] origin-top will-change-transform",
            "border border-border bg-[var(--mix-card-5-bg)] p-4 text-foreground [contain:layout]",
            "transition-[transform,border-radius]",
            "[transition-duration:calc(400ms*var(--indent-transition)),calc(250ms*var(--indent-transition))]",
            "ease-[cubic-bezier(0.32,0.72,0,1)]",
            "data-[active]:[transform:scale(calc(0.98+(0.02*var(--indent-progress))))_translateY(calc(0.5rem*(1-var(--indent-progress))))]",
            "data-[active]:rounded-t-[var(--indent-radius)]"
          )}
        >
          <div className="flex min-h-[320px] items-center justify-center">
            <DrawerRoot modal={false}>
              <DrawerTrigger render={<Button>New Note</Button>} />
              <DrawerPortal container={portalContainer}>
                <DrawerBackdrop className="absolute" />
                <DrawerViewport className="absolute">
                  <DrawerPopup>
                    <DrawerHandle />
                    <DrawerContent>
                      <DrawerTitle className="text-center">Quick Note</DrawerTitle>
                      <DrawerDescription className="text-center">
                        Capture a thought before it slips away.
                      </DrawerDescription>
                      <div className="flex justify-center gap-4">
                        <DrawerClose
                          render={
                            <Button size="sm" variant="outline">
                              Done
                            </Button>
                          }
                        />
                      </div>
                    </DrawerContent>
                  </DrawerPopup>
                </DrawerViewport>
              </DrawerPortal>
            </DrawerRoot>
          </div>
        </DrawerIndent>
      </div>
    </DrawerProvider>
  );
}
