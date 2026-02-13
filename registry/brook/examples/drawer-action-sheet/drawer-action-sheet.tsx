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
import styles from "./drawer-action-sheet.module.css";

const ACTIONS = ["Share", "Duplicate", "Move to Folder", "Pin to Top", "Print"];

export default function DrawerActionSheet() {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger render={<Button>More Actions</Button>} />
      <DrawerPortal>
        <DrawerBackdrop className={styles.backdrop} />
        <DrawerViewport>
          <DrawerPopup className={styles.popup}>
            <DrawerContent className={styles.surface}>
              <DrawerTitle className={styles.visuallyHidden}>File actions</DrawerTitle>
              <DrawerDescription className={styles.visuallyHidden}>
                Choose an action for this file.
              </DrawerDescription>

              <ul className={styles.actions} aria-label="File actions">
                {ACTIONS.map((action, index) => (
                  <li key={action} className={styles.action}>
                    {index === 0 && (
                      <DrawerClose className={styles.visuallyHidden}>
                        Close file actions
                      </DrawerClose>
                    )}
                    <button
                      type="button"
                      className={styles.actionButton}
                      onClick={() => setOpen(false)}
                    >
                      {action}
                    </button>
                  </li>
                ))}
              </ul>
            </DrawerContent>
            <div className={styles.dangerSurface}>
              <button
                type="button"
                className={styles.dangerButton}
                onClick={() => setOpen(false)}
              >
                Delete
              </button>
            </div>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  );
}
