"use client";
import { Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "../scroll-area/scroll-area";
import styles from "./expandable-card.module.css";

interface ExpandableCardItem {
  id: string | number;
  src: string;
  alt: string;
  cardHeading: string;
  content?: React.ReactNode;
}

interface ExpandableCardModalProps {
  item: ExpandableCardItem;
  onClose: () => void;
}

function ExpandableCardModal({ item, onClose }: ExpandableCardModalProps) {
  return (
    <>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div className={styles.modal} layoutId={`card-${item.id}`} style={{ borderRadius: "32px" }}>
        <motion.button
          initial={{ opacity: 0, scale: 0.9, x: -40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: -40 }}
          transition={{
            duration: 0.25,
          }}
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <X width={16} height={16} strokeWidth={2} />
        </motion.button>
        <ScrollArea className={styles.modalScrollArea}>
          <ScrollAreaViewport className={styles.modalScrollViewport}>
            <ScrollAreaContent className={styles.modalScrollContent}>
              <div className={styles.modalContent}>
                <motion.div layoutId={`image-${item.id}`} className="imageContainer">
                  <Image
                    src={item.src}
                    className={styles.image}
                    alt={`Character ${item.id}`}
                    width={600}
                    height={600}
                    style={{ borderRadius: "16px" }}
                  />
                </motion.div>

                <motion.div className={`${styles.contentContainerOpen} ${styles.contentContainerModal}`}>
                  <motion.div layoutId={`heading-container-${item.id}`} className={styles.headingContainer}>
                    <motion.h3 className={styles.cardHeadingLarge}>{item.cardHeading}</motion.h3>
                  </motion.div>

                  <motion.div
                    className={styles.contentInner}
                    initial={{ opacity: 0, y: 100, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <motion.div layout>{item.content}</motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </ScrollAreaContent>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar orientation="vertical">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
        </ScrollArea>
      </motion.div>
    </>
  );
}

interface ExpandableCardProps {
  items: ExpandableCardItem[];
}

export default function ExpandableCard({ items }: ExpandableCardProps) {
  const [selectedId, setSelectedId] = useState<string | number | null>(null);

  const selectedItem = selectedId ? items.find((item) => item.id === selectedId) : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedId) {
        setSelectedId(null);
      }
      if (selectedId && items.length > 1) {
        const currentIndex = items.findIndex((item) => item.id === selectedId);
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          const nextIndex = currentIndex + 1 >= items.length ? 0 : currentIndex + 1;
          setSelectedId(items[nextIndex].id);
        }
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          const prevIndex = currentIndex - 1 < 0 ? items.length - 1 : currentIndex - 1;
          setSelectedId(items[prevIndex].id);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, items]);

  useEffect(() => {
    if (selectedId) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const preventDefault = (e: TouchEvent) => {
        const target = e.target as Element;
        const scrollableArea =
          target.closest("[data-scroll-area-viewport]") ||
          target.closest(`.${styles.modalScrollViewport}`) ||
          target.closest(`.${styles.modalScrollArea}`);
        if (!scrollableArea) {
          e.preventDefault();
        }
      };

      document.addEventListener("touchmove", preventDefault, {
        passive: false,
      });

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.removeEventListener("touchmove", preventDefault);
      };
    }
  }, [selectedId]);

  return (
    <div>
      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.id}>
            <button
              className={styles.cardButton}
              aria-label={`View details for ${item.cardHeading}`}
              onClick={() => setSelectedId(item.id)}
            >
              <motion.div
                className={styles.card}
                layoutId={`card-${item.id}`}
                initial={false}
                style={{ borderRadius: "24px" }}
              >
                <motion.div layoutId={`image-${item.id}`} className={styles.imageContainer}>
                  <Image
                    src={item.src}
                    className={styles.image}
                    alt={item.alt}
                    width={600}
                    height={600}
                    style={{ borderRadius: "12px" }}
                  />
                </motion.div>

                <motion.div className={styles.contentContainer} initial={false}>
                  <motion.div
                    layoutId={`heading-container-${item.id}`}
                    className={styles.headingContainer}
                    initial={false}
                  >
                    <motion.h3 className={styles.cardHeadingSmall} initial={false}>
                      {item.cardHeading}
                    </motion.h3>
                  </motion.div>
                  <motion.div layout className={styles.expandIcon}>
                    <Plus width={21} height={21} strokeWidth={2} />
                  </motion.div>
                </motion.div>
              </motion.div>
            </button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <ExpandableCardModal key="modal" item={selectedItem} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export type { ExpandableCardItem };
