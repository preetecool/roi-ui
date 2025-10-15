"use client";
import { Dialog } from "@base-ui-components/react/dialog";
import { Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import styles from "./expandable-card.module.css";

interface ExpandableCardItem {
  id: string | number;
  imageSrc: string;
  alt: string;
  cardHeading: string;
  content?: React.ReactNode;
}

interface ExpandableCardProps {
  item: ExpandableCardItem;
}

export default function ExpandableCard({ item }: ExpandableCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <AnimatePresence>
          {isOpen && (
            <Dialog.Backdrop
              render={
                <motion.div
                  className={styles.overlay}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              }
            />
          )}
        </AnimatePresence>

        <Dialog.Portal keepMounted>
          <AnimatePresence mode="popLayout">
            {isOpen && (
              <div className={styles.modalPositioner}>
                <Dialog.Popup
                  render={
                    <motion.div
                      layoutId={`card-${item.id}`}
                      className={styles.expandedCard}
                      style={{
                        borderRadius: "24px",
                        transform: "none",
                      }}
                    />
                  }
                >
                  <Dialog.Close className={styles.closeButton} aria-label="Close">
                    <X width={16} height={16} strokeWidth={2.5} />
                  </Dialog.Close>

                  <motion.img
                    layoutId={`image-${item.id}`}
                    width={600}
                    height={600}
                    src={item.imageSrc}
                    alt={item.alt}
                    className={styles.expandedImage}
                    style={{ borderRadius: "12px" }}
                  />

                  <div className={styles.contentExpanded}>
                    <motion.h3 layoutId={`heading-${item.id}`} className={styles.expandedHeading}>
                      {item.cardHeading}
                    </motion.h3>

                    <motion.div
                      className={styles.expandedContent}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      layout
                    >
                      {item.content}
                    </motion.div>
                  </div>
                </Dialog.Popup>
              </div>
            )}
          </AnimatePresence>
        </Dialog.Portal>

        <Dialog.Trigger
          render={
            <motion.button
              layoutId={`card-${item.id}`}
              className={styles.card}
              style={{ borderRadius: "24px" }}
            />
          }
        >
          <motion.img
            layoutId={`image-${item.id}`}
            height={300}
            width={300}
            src={item.imageSrc}
            alt={item.alt}
            className={styles.image}
            style={{ borderRadius: "12px" }}
          />

          <div className={styles.contentContainer}>
            <motion.h3
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              layoutId={`heading-${item.id}`}
              className={styles.heading}
            >
              {item.cardHeading}
            </motion.h3>

            <motion.div layout className={styles.expandIcon}>
              <Plus width={21} height={21} strokeWidth={2} />
            </motion.div>
          </div>
        </Dialog.Trigger>
      </Dialog.Root>
    </div>
  );
}

export type { ExpandableCardItem };
