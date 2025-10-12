"use client";

import { Button } from "@/registry/brook/ui/button/button";
import { AnimatePresence, motion } from "motion/react";
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
              opacity: { duration: 0.6, delay: 1.5, ease: [0.19, 1, 0.22, 1] },
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
            border: "1px solid var(--border)",
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
            Hi, how are you?
          </motion.h3>
          <motion.p
            layout
            className={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.25 }}
          >
            I just wanted to let you know that making this component was fun.{" "}
          </motion.p>

          <motion.div layout className={styles.actions}>
            <AnimatePresence>
              <motion.div layoutId="button" transition={buttonTransition}>
                <Button variant="outline" size="sm">
                  Button
                </Button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
