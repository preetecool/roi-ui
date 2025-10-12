"use client";

import { Button } from "@/registry/brook/ui/button/button";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import styles from "./home-animated-dialog.module.css";

const popupVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

const popupTransition = {
  duration: 0.4,
  ease: [0.19, 1, 0.22, 1] as const,
  layout: { duration: 0.4, ease: [0.19, 1, 0.22, 1] as const },
};

export const HomeAnimatedDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [triggerClicked, setTriggerClicked] = useState(false);

  useEffect(() => {
    // Dialog auto-open
    const clickTimer = setTimeout(() => {
      setTriggerClicked(true);
    }, 2500);

    const openTimer = setTimeout(() => {
      setDialogOpen(true);
      setTriggerClicked(false);
    }, 2700);

    return () => {
      clearTimeout(clickTimer);
      clearTimeout(openTimer);
    };
  }, []);

  return (
    <div style={{ transform: "rotate(4deg)", transformOrigin: "top left" }}>
      {!dialogOpen && (
        <motion.div
          layoutId="dialog-container"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            scale: triggerClicked ? 0.97 : 1,
            backgroundColor: triggerClicked ? "var(--accent)" : "transparent",
          }}
          style={{
            borderRadius: "var(--radius)",
          }}
          transition={{
            opacity: { duration: 0.6, delay: 1.75, ease: [0.19, 1, 0.22, 1] },
            scale: { duration: 0.2 },
            backgroundColor: { duration: 0.2 },
          }}
        >
          <motion.div layoutId="button-content">
            <Button variant="outline" size="sm">
              Button
            </Button>
          </motion.div>
        </motion.div>
      )}

      <AnimatePresence>
        {dialogOpen && (
          <motion.div
            layoutId="dialog-container"
            className={styles.dialogBox}
            style={{
              backgroundColor: "color-mix(in oklch, var(--card) 33%, var(--background))",
              border: "1px solid var(--border)",
            }}
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={popupTransition}
          >
            <h3 className={styles.title}>Hi, how are you?</h3>
            <p className={styles.description}>
              I just wanted to let you know that making this component was fun.{" "}
            </p>
            <div className={styles.actions}>
              <motion.div layoutId="button-content" transition={popupTransition}>
                <Button variant="outline" size="sm">
                  Button
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
