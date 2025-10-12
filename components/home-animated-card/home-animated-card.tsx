"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./home-animated-card.module.css";

const cardData = {
  title: "Art Brook",
  description: "Beautiful landscapes",
  longDescription: "Discover This stunning landscape captures the essence of tranquility.",
  image: "/art-brook.png",
};

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
  ease: [0.19, 1, 0.22, 1],
  layout: { duration: 0.4, ease: [0.19, 1, 0.22, 1] },
};

export const HomeAnimatedCard = () => {
  const [visible, setVisible] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [triggerClicked, setTriggerClicked] = useState(false);

  useEffect(() => {
    // Card animation
    setTimeout(() => {
      setVisible(true);
    }, 1000);

    setTimeout(() => {
      setCardOpen(true);
    }, 1500);

    // Dialog auto-open 0.1s before card animation completes
    const clickTimer = setTimeout(() => {
      setTriggerClicked(true);
    }, 2750);

    const openTimer = setTimeout(() => {
      setDialogOpen(true);
      setTriggerClicked(false);
    }, 2950);

    return () => {
      clearTimeout(clickTimer);
      clearTimeout(openTimer);
    };
  }, []);

  return (
    <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
      {/* Card Animation */}
      <div
        style={{
          width: "300px",
          minHeight: "360px",
          transform: "rotate(-3deg)",
          transformOrigin: "top left",
        }}
      >
        {!visible && null}
        {visible && cardOpen && (
          <motion.div
            layoutId="card"
            style={{
              backgroundColor: "color-mix(in oklch, var(--card) 33%, var(--background))",
              borderRadius: "24px",
              padding: "12px",
              width: "300px",
              overflow: "hidden",
            }}
          >
            <motion.img
              layoutId="image"
              alt={cardData.title}
              src={cardData.image}
              style={{
                width: "100%",
                height: "200px",
                borderRadius: "12px",
                objectFit: "cover",
                marginBottom: "12px",
              }}
            />
            <motion.div layout style={{ paddingLeft: "8px" }}>
              <motion.h2 layoutId="title" style={{ fontSize: "20px", fontWeight: "600" }}>
                {cardData.title}
              </motion.h2>
              <motion.p
                layoutId="description"
                style={{ fontSize: "12px", color: "var(--foreground)", opacity: 0.7, marginTop: "4px" }}
              >
                {cardData.description}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ fontSize: "14px", lineHeight: "1.6", margin: "12px 0" }}
              >
                {cardData.longDescription}
              </motion.p>
            </motion.div>
          </motion.div>
        )}

        {visible && !cardOpen && (
          <motion.div
            layoutId="card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            style={{
              backgroundColor: "color-mix(in oklch, var(--card) 33%, var(--background))",
              borderRadius: "20px",
              width: "300px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "12px",
            }}
          >
            <motion.img
              layoutId="image"
              alt={cardData.title}
              src={cardData.image}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "10px",
              }}
            />
            <motion.div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                paddingRight: "12px",
              }}
            >
              <motion.h2 layoutId="title" style={{ fontSize: "14px", fontWeight: "500", margin: 0 }}>
                {cardData.title}
              </motion.h2>
              <motion.p
                layoutId="description"
                style={{ fontSize: "14px", color: "var(--foreground)", opacity: 0.6, margin: 0 }}
              >
                {cardData.description}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Dialog Animation */}
      <div style={{ transform: "rotate(3deg)", transformOrigin: "top left" }}>
        {!dialogOpen && (
          <motion.div
            layoutId="dialog-container"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              scale: triggerClicked ? 0.97 : 1,
              backgroundColor: triggerClicked ? "var(--accent)" : "transparent"
            }}
            style={{
              borderRadius: "var(--radius)"
            }}
            transition={{
              opacity: { duration: 0.6, delay: 1.75, ease: [0.19, 1, 0.22, 1] },
              scale: { duration: 0.2 },
              backgroundColor: { duration: 0.2 }
            }}
          >
            <motion.div layoutId="button-content">
              <Button variant="outline">View Component</Button>
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
              <h3 className={styles.title}>Animated Dialog Example</h3>
              <p className={styles.description}>
                This dialog morphs from a button with smooth layout animations powered by Framer Motion.
              </p>
              <div className={styles.actions}>
                <motion.div layoutId="button-content" transition={popupTransition}>
                  <Button variant="outline">
                    View Component
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
