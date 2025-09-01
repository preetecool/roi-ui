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
          target="_blank"
          rel="noopener noreferrer"
          render={
            <Button variant="link" className={styles.triggerLink}>
              Github
            </Button>
          }
        ></PreviewCardTrigger>

        <PreviewCardPortal>
          <PreviewCardPositioner side="top" align="center" sideOffset={8}>
            <PreviewCardPopup>
              <PreviewCardArrow />
              <div className={styles.previewContent}>
                <div className={styles.previewHeader}>
                  <Image
                    src="/preetecool.png"
                    alt="Profile"
                    width={32}
                    height={32}
                    className={styles.previewAvatar}
                  />
                  <div className="previewInfo">
                    <h3 className={styles.previewName}>
                      Preet
                    </h3>
                    <p className={styles.previewUsername}>
                      @preetecool
                    </p>
                  </div>
                </div>

                <p className={styles.previewBio}>
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
