"use client";

import Image from "next/image";
import { Button } from "@/registry/brook/tailwind/ui/button";
import {
  PreviewCard,
  PreviewCardArrow,
  PreviewCardPopup,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardTrigger,
} from "@/registry/brook/tailwind/ui/preview-card";

export default function PreviewCardDemo() {
  return (
    <div className="p-8 text-center">
      <p className="mb-8 text-muted-foreground">
        Hover over the link below to see a preview card:
      </p>

      <PreviewCard closeDelay={200}>
        <PreviewCardTrigger
          href="https://github.com/base-ui"
          rel="noopener noreferrer"
          render={
            <Button className="text-foreground" variant="link">
              Github
            </Button>
          }
          target="_blank"
        />

        <PreviewCardPortal>
          <PreviewCardPositioner align="center" side="top" sideOffset={8}>
            <PreviewCardPopup>
              <PreviewCardArrow />
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Image
                    alt="Profile"
                    className="rounded-full border-2 border-border"
                    height={32}
                    src="/preetecool.png"
                    width={32}
                  />
                  <div className="previewInfo">
                    <h3 className="m-0 font-semibold text-foreground text-sm">
                      Preet
                    </h3>
                    <p className="m-0 text-muted-foreground text-xs">
                      @preetecool
                    </p>
                  </div>
                </div>

                <p className="m-0 text-muted-foreground text-sm leading-snug">
                  ❤️ Design & Build
                </p>
              </div>
            </PreviewCardPopup>
          </PreviewCardPositioner>
        </PreviewCardPortal>
      </PreviewCard>
    </div>
  );
}
