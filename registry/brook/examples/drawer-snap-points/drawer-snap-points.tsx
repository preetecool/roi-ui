"use client";

import * as React from "react";
import { Button } from "@/registry/brook/ui/button/button";
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
} from "@/registry/brook/ui/drawer/drawer";
import styles from "./drawer-snap-points.module.css";

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
        <DrawerViewport className={styles.viewport}>
          <DrawerPopup
            className={styles.popup}
            style={{ "--top-margin": `${TOP_MARGIN_REM}rem` } as React.CSSProperties}
          >
            <div className={styles.dragArea}>
              <div className={styles.handle} />
              <DrawerTitle className={styles.title}>Discover</DrawerTitle>
            </div>
            <DrawerContent className={styles.scroll}>
              <div className={styles.content}>
                <DrawerDescription className={styles.description}>
                  Trending topics and curated picks based on your interests.
                </DrawerDescription>
                <div className={styles.cards} aria-hidden>
                  {Array.from({ length: 20 }, (_, index) => (
                    <div className={styles.card} key={index} />
                  ))}
                </div>
                <div className={styles.actions}>
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
