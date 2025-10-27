"use client";
import { Dialog } from "@base-ui-components/react/dialog";
import { Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import styles from "./expandable-card.module.css";

type ExpandableCardItem = {
  id: string | number;
  imageSrc: string;
  alt: string;
  cardHeading: string;
  content?: React.ReactNode;
};

type ExpandableCardProps = {
  item: ExpandableCardItem;
};

export default function ExpandableCard({ item }: ExpandableCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Dialog.Root onOpenChange={setIsOpen} open={isOpen}>
        <AnimatePresence>
          {isOpen && (
            <Dialog.Backdrop
              key="overlay"
              render={
                <motion.div
                  animate={{
                    opacity: 1,
                  }}
                  className={styles.overlay}
                  exit={{ opacity: 0 }}
                  hidden={undefined}
                  initial={{ opacity: 0 }}
                  transition={{
                    delay: 0.035,
                    duration: 0.2,
                    // biome-ignore lint/style/noMagicNumbers: cubic-bezier easing values
                    ease: [0.455, 0.03, 0.515, 0.955],
                  }}
                />
              }
            />
          )}
        </AnimatePresence>
        <Dialog.Portal keepMounted>
          <AnimatePresence>
            {isOpen && (
              <div className={styles.modalPositioner} key="positioner">
                <Dialog.Popup
                  hidden={undefined}
                  render={
                    <motion.div
                      className={styles.expandedCard}
                      layoutId={`card-${item.id}`}
                      style={{
                        borderRadius: "32px",
                        overflow: "hidden",
                      }}
                    />
                  }
                >
                  <div className={styles.scrollableContent}>
                    <div className={styles.closeButtonContainer}>
                      <Dialog.Close
                        aria-label="Close"
                        render={
                          <motion.button
                            animate={{ opacity: 1 }}
                            className={styles.closeButton}
                            exit={{ opacity: 0, display: "flex" }}
                            initial={{ opacity: 0 }}
                            transition={{
                              type: "spring",
                              duration: 0.2,
                              delay: 0.1,
                            }}
                          />
                        }
                      >
                        <X height={21} strokeWidth={2} width={21} />
                      </Dialog.Close>
                    </div>

                    <motion.img
                      alt={item.alt}
                      className={styles.expandedImage}
                      height={600}
                      layoutId={`image-${item.id}`}
                      src={item.imageSrc}
                      style={{ borderRadius: "16px" }}
                      width={600}
                    />

                    <motion.div className={styles.contentExpanded}>
                      <motion.div layoutId={`heading-${item.id}`}>
                        <motion.h3 className={styles.expandedHeading}>
                          {item.cardHeading}
                        </motion.h3>
                      </motion.div>

                      <motion.div
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={styles.paragrahWrapper}
                        exit={{
                          opacity: 0,
                          display: "block",
                          y: -40,
                          scale: 0.95,
                          transition: { delay: 0.05 },
                        }}
                        initial={{ opacity: 0, y: -40, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.content}
                      </motion.div>
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
              className={styles.card}
              layoutId={`card-${item.id}`}
              style={{ borderRadius: "24px" }}
            />
          }
        >
          <motion.img
            alt={item.alt}
            className={styles.image}
            height={300}
            layoutId={`image-${item.id}`}
            src={item.imageSrc}
            style={{ borderRadius: "12px" }}
            width={300}
          />

          <div className={styles.contentContainer}>
            <motion.div layoutId={`heading-${item.id}`}>
              <motion.h3 className={styles.heading}>
                {item.cardHeading}
              </motion.h3>
            </motion.div>

            <motion.div className={styles.expandIcon}>
              <Plus height={21} strokeWidth={2} width={21} />
            </motion.div>
          </div>
        </Dialog.Trigger>
      </Dialog.Root>
    </div>
  );
}

export type { ExpandableCardItem };
