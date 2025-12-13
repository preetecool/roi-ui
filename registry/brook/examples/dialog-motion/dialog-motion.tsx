"use client";

import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useRef, useState } from "react";
import styles from "./dialog-motion.module.css";

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
    y: 30,
    scale: 0.7,
    filter: "blur(4px)",
    transformOrigin: "right center",
  },
  visible: {
    opacity: 1,
    transformOrigin: "right center",
    scale: 1,
    filter: "blur(0px)",
    x: 0,
    y: 0,
    transition: {
      duration: 0.38,
      delay: 0.12,
      type: "spring",
      bounce: 0,
      ease: "anticipate",
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(4px)",

    scale: 0.97,
    transition: {
      duration: 0.5,
      type: "spring",
    },
  },
};

const closeButtonVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(4px)",
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    rotate: 0,
    originX: -12,
    transition: {
      duration: 0.38,
      delay: 0.12,
      type: "spring",
      bounce: 0,
      ease: "anticipate",
    },
  },
  exit: {
    opacity: 0,

    filter: "blur(4px)",
    scale: 0.97,
    transition: {
      duration: 0.5,
      type: "spring",
    },
  },
};

export default function DialogFramerMotion() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <div className={styles.triggerWrapper}>
        <motion.div
          className={styles.morphWrapper}
          layoutId="wrapper"
          style={{ borderRadius: 8 }}
        />
        <Dialog.Trigger
          className={styles.trigger}
          render={<motion.button layoutId="button" />}
        >
          Upgrade
        </Dialog.Trigger>
      </div>

      <AnimatePresence>
        {open && (
          <Dialog.Backdrop
            className={styles.overlay}
            hidden={undefined}
            key="overlay"
            render={
              <motion.div
                animate={{
                  opacity: 1,
                }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
              />
            }
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <Dialog.Portal container={containerRef} keepMounted>
            <div className={styles.popupWrapper}>
              <motion.div
                className={styles.popupMorphWrapper}
                layoutId="wrapper"
                style={{ borderRadius: 12 }}
              />
              <Dialog.Popup className={styles.popup} hidden={undefined}>
                <div className={styles.popupContent}>
                  <Dialog.Title
                    className={styles.title}
                    render={
                      <motion.span
                        animate="visible"
                        exit="exit"
                        initial="hidden"
                        variants={contentVariants}
                      />
                    }
                  >
                    Plan Plus
                  </Dialog.Title>
                  <Dialog.Description
                    className={styles.description}
                    render={
                      <motion.p
                        animate="visible"
                        exit="exit"
                        initial="hidden"
                        variants={contentVariants}
                      />
                    }
                  >
                    Upgrade your plan for full access.
                  </Dialog.Description>

                  <div className={styles.actions}>
                    <Dialog.Close
                      className={styles.closeButton}
                      render={
                        <motion.button
                          animate="visible"
                          exit="exit"
                          initial="hidden"
                          style={{ originX: -20, originY: -20 }}
                          variants={closeButtonVariants}
                        />
                      }
                    >
                      Close
                    </Dialog.Close>
                    <motion.button
                      className={styles.actionButton}
                      layoutId="button"
                    >
                      Upgrade
                    </motion.button>
                  </div>
                </div>
              </Dialog.Popup>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
