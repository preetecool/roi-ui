"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./home-animated-dialog.module.css";

const popupVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
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

export const HomeAnimatedDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [triggerClicked, setTriggerClicked] = useState(false);

  return (
    <div>
      {!dialogOpen && (
        <AnimatePresence>
          <motion.div
            animate={{
              opacity: 1,
              scale: triggerClicked ? 0.97 : 1,
              backgroundColor: triggerClicked ? "var(--accent)" : "transparent",
            }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            layoutId="button"
            style={{
              borderRadius: "var(--radius)",
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0, ease: [0.19, 1, 0.22, 1] },
              scale: { duration: 0.2 },
            }}
          >
            <div style={{ opacity: 1 }}>
              <Button
                onClick={() => {
                  setTriggerClicked(true);
                  setTimeout(() => {
                    setDialogOpen(true);
                    setTriggerClicked(false);
                  }, 200);
                }}
                size="sm"
                variant="outline"
              >
                Button
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {dialogOpen ? (
        <motion.div
          animate="visible"
          className={styles.dialogBox}
          exit="hidden"
          initial="hidden"
          layoutId="container"
          transition={popupTransition}
          variants={popupVariants}
        >
          <motion.h3
            animate={{ opacity: 1 }}
            className={styles.title}
            initial={{ opacity: 0 }}
            layout
            transition={{ delay: 0.2, duration: 0.25 }}
          >
            Motion dialog
          </motion.h3>
          <motion.p
            animate={{ opacity: 1 }}
            className={styles.description}
            initial={{ opacity: 0 }}
            layout
            transition={{ delay: 0.3, duration: 0.25 }}
          >
            This is a Dialog component made with motion.
          </motion.p>

          <motion.div className={styles.actions} layout>
            <AnimatePresence>
              <motion.div layoutId="button" transition={buttonTransition}>
                <Button onClick={() => setDialogOpen(false)} size="sm" variant="outline">
                  Button
                </Button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ) : null}
    </div>
  );
};
