"use client";

import Image from "next/image";
import {
  PreviewCard,
  PreviewCardTrigger,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardPopup,
  PreviewCardArrow,
} from "@/registry/brook/ui/preview-card/preview-card";
import { Button } from "@/registry/brook/ui/button/button";

export default function PreviewCardDemo() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <p style={{ marginBottom: "2rem", color: "var(--muted-foreground)" }}>
        Hover over the link below to see a preview card:
      </p>

      <PreviewCard closeDelay={200}>
        <PreviewCardTrigger
          href="https://github.com/base-ui"
          target="_blank"
          rel="noopener noreferrer"
          render={
            <Button variant="link" style={{ color: "var(--foreground)" }}>
              Github
            </Button>
          }
        ></PreviewCardTrigger>

        <PreviewCardPortal>
          <PreviewCardPositioner side="top" align="center" sideOffset={8}>
            <PreviewCardPopup>
              <PreviewCardArrow />
              <div
                className="previewContent"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <div
                  className="previewHeader"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <Image
                    src="/preetecool.png"
                    alt="Profile"
                    width={32}
                    height={32}
                    className="previewAvatar"
                    style={{
                      borderRadius: "50%",
                      border: "2px solid var(--border)",
                    }}
                  />
                  <div className="previewInfo">
                    <h3
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--foreground)",
                        margin: 0,
                      }}
                    >
                      Preet
                    </h3>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--muted-foreground)",
                        margin: 0,
                      }}
                    >
                      @preetecool
                    </p>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--muted-foreground)",
                    lineHeight: 1.4,
                    margin: 0,
                  }}
                >
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
