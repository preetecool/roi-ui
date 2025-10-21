"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/registry/brook/ui/button/button";
import {
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPopup,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/registry/brook/ui/dialog/dialog";
import styles from "./dialog-motion.module.css";

export default function DialogFramerMotion() {
  const [open, setOpen] = useState(false);

  return (
    <DialogRoot onOpenChange={setOpen} open={open}>
      {!open && (
        <DialogTrigger
          render={
            <motion.button
              className={styles.button}
              key="button"
              layoutId="button"
            />
          }
        >
          Toggle Dialog
        </DialogTrigger>
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
                  <motion.button
                    className={styles.button}
                    key="button-inner"
                    layoutId="button"
                  >
                    Toggle Dialog
                  </motion.button>
                </AnimatePresence>
              </div>
            </DialogPopup>
          )}
        </DialogPortal>
      </AnimatePresence>
    </DialogRoot>
  );
}
