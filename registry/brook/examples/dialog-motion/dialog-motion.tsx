"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./dialog-motion.module.css";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const overlayTransition = {
  duration: 0.2,
};

const popupVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

const popupTransition = {
  duration: 0.2,
  layout: { duration: 0.2 },
};

const buttonTransition = {
  duration: 0.2,
};

export default function DialogFramerMotion() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog.Root open={open} onOpenChange={setOpen} key="root">
        <motion.div layoutId="container">
          <motion.div layoutId="button">
            <Dialog.Trigger render={<Button />}>Toggle Dialog</Dialog.Trigger>
          </motion.div>
        </motion.div>

        <Dialog.Backdrop
          render={
            <AnimatePresence>
              {open && (
                <motion.div
                  key="overlay"
                  className={styles.overlay}
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={overlayTransition}
                />
              )}
            </AnimatePresence>
          }
        />
        <Dialog.Portal>
          <AnimatePresence>
            {open && (
              <Dialog.Popup
                key="modal"
                render={
                  <motion.div
                    className={styles.popup}
                    layoutId="container"
                    variants={popupVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={popupTransition}
                  />
                }
              >
                <Dialog.Title className={styles.title}>What is a brook?</Dialog.Title>
                <Dialog.Description>
                  A small, natural stream of fresh water, often winding gently through forests, meadows, or valleys.
                </Dialog.Description>
                <div className={styles.actions}>
                  <Dialog.Close render={<Button variant="secondary">Close</Button>}>Close</Dialog.Close>
                  <motion.div layoutId="button" transition={buttonTransition}>
                    <Button>Toggle Dialog</Button>
                  </motion.div>
                </div>
              </Dialog.Popup>
            )}
          </AnimatePresence>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
