"use client";

import * as React from "react";
import { Button } from "@/registry/brook/ui/button/button";
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
} from "@/registry/brook/ui/drawer/drawer";
import styles from "./drawer-indent.module.css";

export default function DrawerIndentDemo() {
  const [portalContainer, setPortalContainer] = React.useState<HTMLDivElement | null>(null);

  return (
    <DrawerProvider>
      <div className={styles.root} ref={setPortalContainer}>
        <DrawerIndentBackground className={styles.indentBackground} />
        <DrawerIndent className={styles.indent}>
          <div className={styles.center}>
            <DrawerRoot modal={false}>
              <DrawerTrigger render={<Button>New Note</Button>} />
              <DrawerPortal container={portalContainer}>
                <DrawerBackdrop className={styles.backdrop} />
                <DrawerViewport className={styles.viewport}>
                  <DrawerPopup>
                    <DrawerHandle />
                    <DrawerContent>
                      <DrawerTitle className={styles.title}>Quick Note</DrawerTitle>
                      <DrawerDescription className={styles.description}>
                        Capture a thought before it slips away.
                      </DrawerDescription>
                      <div className={styles.actions}>
                        <DrawerClose render={<Button variant="outline" size="sm">Done</Button>} />
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
