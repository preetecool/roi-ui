"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/brook/ui/button/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/registry/brook/ui/dialog/dialog";
import styles from "./dialog-sheet.module.css";

type Side = "left" | "right";

export default function DialogSheet() {
  const [side, setSide] = useState<Side>("right");

  return (
    <div className={styles.buttons}>
      <Dialog>
        <DialogTrigger
          render={
            <Button onClick={() => setSide("left")} variant="outline">
              Open Left
            </Button>
          }
        />
        <DialogTrigger
          render={
            <Button onClick={() => setSide("right")} variant="outline">
              Open Right
            </Button>
          }
        />
        <DialogPortal>
          <DialogOverlay />
          <DialogPopup className={styles.popup} data-side={side}>
            <DialogClose className={styles.closeButton} render={<button type="button" />}>
              <X size={16} />
            </DialogClose>
            <DialogHeader className={styles.header}>
              <DialogTitle>Sheet Panel</DialogTitle>
              <DialogDescription>This dialog slides in from the {side} side of the screen.</DialogDescription>
            </DialogHeader>
            <div className={styles.content}>
              <p>
                Sheet dialogs are useful for navigation menus, settings panels, or any content that benefits from a
                slide-in interaction.
              </p>
            </div>
            <div className={styles.footer}>
              <DialogClose render={<Button variant="outline">Close</Button>} />
              <Button>Save</Button>
            </div>
          </DialogPopup>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
