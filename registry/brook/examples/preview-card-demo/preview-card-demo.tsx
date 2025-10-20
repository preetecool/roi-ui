"use client";

import { Button } from "@/registry/brook/ui/button/button";
import {
  PreviewCard,
  PreviewCardArrow,
  PreviewCardPopup,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardTrigger,
} from "@/registry/brook/ui/preview-card/preview-card";
import Image from "next/image";
import styles from "./preview-card-demo.module.css";

export default function PreviewCardDemo() {
  return (
    <div className={styles.container}>
      <p className={styles.description}>
        Hover over the link below to see a preview card:
      </p>

      <PreviewCard closeDelay={200}>
        <PreviewCardTrigger
          href="https://github.com/base-ui"
          rel="noopener noreferrer"
          render={
            <Button className={styles.triggerLink} variant="link">
              Github
            </Button>
          }
          target="_blank"
        />

        <PreviewCardPortal>
          <PreviewCardPositioner align="center" side="top" sideOffset={8}>
            <PreviewCardPopup>
              <PreviewCardArrow />
              <div className={styles.previewContent}>
                <div className={styles.previewHeader}>
                  <Image
                    alt="Profile"
                    className={styles.previewAvatar}
                    height={32}
                    src="/preetecool.png"
                    width={32}
                  />
                  <div className="previewInfo">
                    <h3 className={styles.previewName}>Preet</h3>
                    <p className={styles.previewUsername}>@preetecool</p>
                  </div>
                </div>

                <p className={styles.previewBio}>❤️ Design & Build</p>
              </div>
            </PreviewCardPopup>
          </PreviewCardPositioner>
        </PreviewCardPortal>
      </PreviewCard>
    </div>
  );
}
