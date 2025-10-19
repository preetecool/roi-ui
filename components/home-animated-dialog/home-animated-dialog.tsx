"use client";

import { Button } from "@/registry/brook/ui/button/button";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    // Dialog auto-open
    const clickTimer = setTimeout(() => {
      setTriggerClicked(true);
    }, 2700);

    const openTimer = setTimeout(() => {
      setDialogOpen(true);
      setTriggerClicked(false);
    }, 2900);

    return () => {
      clearTimeout(clickTimer);
      clearTimeout(openTimer);
    };
  }, []);

  return (
    <motion.div
      style={{ transformOrigin: "top left" }}
      initial={{ rotate: 4, y: 40, opacity: 0 }}
      animate={{ rotate: 4, y: 0, opacity: 1 }}
      transition={{
        y: { type: "spring", bounce: 0.4, duration: 0.8, delay: 1.65 },
        opacity: { duration: 0.4, ease: [0.19, 1, 0.22, 1], delay: 1.65 },
      }}
    >
      {!dialogOpen && (
        <AnimatePresence>
          <motion.div
            layoutId="button"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              scale: triggerClicked ? 0.97 : 1,
              backgroundColor: triggerClicked ? "var(--accent)" : "transparent",
            }}
            exit={{ opacity: 0 }}
            style={{
              borderRadius: "var(--radius)",
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0, ease: [0.19, 1, 0.22, 1] },
              scale: { duration: 0.2 },
            }}
          >
            <div style={{ opacity: 1 }}>
              <Button variant="outline" size="sm">
                Button
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {dialogOpen && (
        <motion.div
          layoutId="container"
          className={styles.dialogBox}
          style={{
            backgroundColor: "color-mix(in oklch, var(--card) 33%, var(--background))",
            boxShadow:
              "0 .753698px .452219px -.583333px #0000000f, 0 1.927px 1.1562px -1.16667px #0000000d, 0 3.86321px 2.31793px -1.75px #0000000d, 0 7.32331px 4.39398px -2.33333px #0000000d, 0 14.5565px 8.73393px -2.91667px #0000000a, 0 32px 19.2px -3.5px #00000005",
          }}
          variants={popupVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={popupTransition}
        >
          <motion.h3
            layout
            className={styles.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.25 }}
          >
            Motion dialog
          </motion.h3>
          <motion.p
            layout
            className={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.25 }}
          >
            This is a Dialog component made with motion.
          </motion.p>

          <motion.div layout className={styles.actions}>
            <AnimatePresence>
              <motion.div layoutId="button" transition={buttonTransition}>
                <Button variant="outline" size="sm">
                  <Link href="/docs/examples/dialog">View Component</Link>
                </Button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
