"use client";

import Image from "next/image";
import { Button } from "@/registry/brook/ui/button/button";
import {
  PreviewCard,
  PreviewCardArrow,
  PreviewCardPopup,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardTrigger,
} from "@/registry/brook/ui/preview-card/preview-card";
import styles from "./preview-card-demo.module.css";

export default function PreviewCardDemo() {
  return (
    <div className={styles.container}>
      <p className={styles.description}>
        Hover over the{" "}
        <PreviewCard>
          <PreviewCardTrigger
            closeDelay={400}
            href="https://github.com/base-ui"
            rel="noopener noreferrer"
            render={
              <Button className={styles.triggerLink} variant="link" style={{ paddingLeft: 0, paddingRight: 0 }}>
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
                  <Image alt="Profile" className={styles.previewAvatar} height={32} src="/preetecool.png" width={32} />
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
        </PreviewCard>{" "}
        link to see a preview card.
      </p>
    </div>
  );
}
