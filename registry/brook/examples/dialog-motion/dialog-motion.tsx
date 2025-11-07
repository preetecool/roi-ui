"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import styles from "./dialog-motion.module.css";

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
          Button
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
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: {
                            duration: 0.3,
                            delay: 0.2,

                            type: "spring",
                            bounce: 0,
                          },
                        }}
                        exit={{
                          opacity: 0,
                          transition: {
                            duration: 0.15,
                            type: "spring",
                          },
                        }}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      />
                    }
                  >
                    Title
                  </Dialog.Title>
                  <Dialog.Description
                    className={styles.description}
                    render={
                      <motion.p
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: {
                            duration: 0.3,
                            delay: 0.2,

                            type: "spring",
                            bounce: 0,
                          },
                        }}
                        exit={{
                          opacity: 0,
                          transition: {
                            duration: 0.15,
                            type: "spring",
                          },
                        }}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      />
                    }
                  >
                    This is a description of the dialog.
                  </Dialog.Description>

                  <div className={styles.actions}>
                    <Dialog.Close
                      className={styles.closeButton}
                      render={
                        <motion.button
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: {
                              duration: 0.3,
                              delay: 0.2,

                              type: "spring",
                              bounce: 0,
                            },
                          }}
                          exit={{
                            opacity: 0,
                            transition: {
                              duration: 0.15,
                              type: "spring",
                            },
                          }}
                          initial={{ opacity: 0, y: -5, scale: 0.95 }}
                        />
                      }
                    >
                      Close
                    </Dialog.Close>
                    <motion.button
                      className={styles.actionButton}
                      layoutId="button"
                    >
                      Button
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
