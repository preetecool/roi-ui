"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./bento-dialog.module.css";

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

export function BentoDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [triggerClicked, setTriggerClicked] = useState(false);

  const handleClick = () => {
    setTriggerClicked(true);
    setTimeout(() => {
      setDialogOpen(true);
      setTriggerClicked(false);
    }, 200);
  };

  return (
    <motion.div
      animate={{ transform: "translateY(0px)", opacity: 1 }}
      className={styles.container}
      initial={{ transform: "translateY(40px)", opacity: 0 }}
      transition={{
        transform: { type: "spring", bounce: 0.4, duration: 0.8, delay: 1.65 },
        opacity: { duration: 0.4, ease: [0.19, 1, 0.22, 1], delay: 1.65 },
      }}
    >
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
              <Button onClick={handleClick} size="sm" variant="outline">
                Click here
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {dialogOpen && (
        <motion.div
          animate="visible"
          className={styles.dialogBox}
          exit="hidden"
          initial="hidden"
          layoutId="container"
          style={{
            backgroundColor: "var(--mix-card-33-bg)",
            boxShadow:
              "0 .753698px .452219px -.583333px #0000000f, 0 1.927px 1.1562px -1.16667px #0000000d, 0 3.86321px 2.31793px -1.75px #0000000d, 0 7.32331px 4.39398px -2.33333px #0000000d, 0 14.5565px 8.73393px -2.91667px #0000000a, 0 32px 19.2px -3.5px #00000005",
          }}
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
                <Button size="sm" variant="outline">
                  <Link href="/docs/ui/dialog#with-animations">
                    View Component
                  </Link>
                </Button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
