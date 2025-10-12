"use client";

import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import styles from "./home-animated-card.module.css";

const cardData = {
  title: "Art Brook",
  description: "Beautiful landscapes",
  longDescription: "Discover This stunning landscape captures the essence of tranquility.",
  image: "/art-brook.png",
};

export const HomeAnimatedCard = () => {
  const [visible, setVisible] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [ref, bounds] = useMeasure();

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 1000);

    setTimeout(() => {
      setCardOpen(true);
    }, 1500);
  }, []);

  return (
    <MotionConfig transition={{ duration: 0.4, type: "spring", bounce: 0 }}>
      <AnimatePresence>
        <motion.div initial={{ rotate: -4 }} className={styles.container} animate={{ height: bounds.height }}>
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
                  <motion.p layoutId="description" className={styles.description}>
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
