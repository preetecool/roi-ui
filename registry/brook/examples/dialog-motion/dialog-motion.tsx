"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/registry/brook/ui/button/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/registry/brook/ui/dialog/dialog";
import styles from "./dialog-motion.module.css";

export default function DialogFramerMotion() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      {!open && (
        <DialogTrigger
          render={
            <Button
              render={
                <motion.button
                  className={styles.trigger}
                  id={styles.id}
                  key="button-inner"
                  layoutId="button"
                />
              }
              style={{ transition: "none" }}
            >
              Toggle Dialog
            </Button>
          }
        />
      )}
      <AnimatePresence>
        <AnimatePresence>
          {open && <DialogOverlay key="overlay" />}
        </AnimatePresence>

        <DialogPortal keepMounted key="portal">
          {open && (
            <DialogPopup
              className={styles.popup}
              render={
                <motion.div
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0.9999 }}
                  transition={{ type: "spring", duration: 0.4 }}
                />
              }
            >
              <DialogTitle className={styles.title}>Premium Plan</DialogTitle>
              <DialogDescription className={styles.description}>
                Unlimited projects, priority support, and team collaboration
                tools for growing businesses.
              </DialogDescription>
              <div className={styles.actions}>
                <DialogClose
                  render={<Button variant="outline">Close</Button>}
                />
                <AnimatePresence>
                  <Button
                    render={
                      <motion.button
                        className={styles.trigger}
                        id={styles.id}
                        key="button-inner"
                        layoutId="button"
                      />
                    }
                    style={{ transition: "none" }}
                  >
                    Toggle Dialog
                  </Button>
                </AnimatePresence>
              </div>
            </DialogPopup>
          )}
        </DialogPortal>
      </AnimatePresence>
    </Dialog>
  );
}
