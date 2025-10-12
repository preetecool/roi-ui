"use client";

import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import styles from "./home-animated-card.module.css";

const cardData = {
  title: "Art Brook",
  description: "Beautiful landscapes",
  longDescription: "Discover this stunning landscape capturing the essence of tranquility.",
  image: "/art-brook.png",
};

export const HomeAnimatedCard = () => {
  const [visible, setVisible] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [ref, bounds] = useMeasure();

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 200);

    setTimeout(() => {
      setCardOpen(true);
    }, 2150);
  }, []);

  return (
    <MotionConfig transition={{ duration: 0.4, type: "spring", bounce: 0 }}>
      <AnimatePresence mode="sync">
        <motion.div
          initial={{ rotate: -4, y: 20, opacity: 0 }}
          animate={{ height: bounds.height, y: 0, opacity: 1 }}
          transition={{
            height: { duration: 0.4, type: "spring", bounce: 0 },
            y: { duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.2 },
            opacity: { duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.2 }
          }}
          className={styles.container}
        >
          <div ref={ref}>
            {visible && cardOpen && (
              <motion.div layoutId="card" className={styles.cardExpanded} style={{ borderRadius: "24px" }}>
                <motion.img
                  layoutId="image"
                  alt={cardData.title}
                  src={cardData.image}
                  className={styles.imageExpanded}
                  style={{ borderRadius: "12px" }}
                />
                <motion.div layoutId="text-wrapper" className={styles.wrapperExpanded}>
                  <motion.h2 layoutId="title" className={styles.titleExpanded}>
                    {cardData.title}
                  </motion.h2>
                  <motion.p
                    layoutId="description"
                    className={`${styles.description} ${styles.descriptionExpanded}`}
                  >
                    {cardData.description}
                  </motion.p>
                  <motion.p
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={styles.longDescription}
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
                className={styles.cardCollapsed}
                style={{ borderRadius: "24px" }}
              >
                <motion.img
                  layoutId="image"
                  alt={cardData.title}
                  src={cardData.image}
                  className={styles.imageCollapsed}
                  style={{ borderRadius: "12px" }}
                />
                <motion.div layoutId="text-wrapper" className={styles.wrapperCollapsed}>
                  <motion.h2 layoutId="title" className={styles.titleCollapsed}>
                    {cardData.title}
                  </motion.h2>
                  <motion.p layoutId="description" className={styles.description}>
                    {cardData.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
};
