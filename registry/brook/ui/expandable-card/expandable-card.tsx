"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus } from "lucide-react";
import styles from "./expandable-card.module.css";
import Image from "next/image";
import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
} from "../scroll-area/scroll-area";

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

      <motion.div className={styles.modal} layoutId={`card-${item.id}`}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          <X width={16} height={16} strokeWidth={2.5} />
        </button>
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
                  />
                </motion.div>

                <motion.div
                  className={styles.contentContainerOpen}
                  style={{
                    maxWidth: 600,
                    margin: "0 auto",
                    paddingTop: 28,
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingBottom: 0,
                    width: "100%",
                  }}
                >
                  <motion.div layoutId={`heading-container-${item.id}`} className={styles.headingContainer}>
                    <motion.h3 className={styles.cardHeadingLarge}>{item.cardHeading}</motion.h3>
                  </motion.div>

                  <motion.div
                    className={styles.contentInner}
                    initial={{ opacity: 0.8 }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <motion.div>{item.content}</motion.div>
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
              <motion.div className={styles.card} layoutId={`card-${item.id}`} initial={false}>
                <motion.div layoutId={`image-${item.id}`} className={styles.imageContainer} initial={false}>
                  <Image src={item.src} className={styles.image} alt={item.alt} width={600} height={600} />
                </motion.div>

                <motion.div className={styles.contentContainer} style={{ width: "100%" }} initial={false}>
                  <motion.div
                    layoutId={`heading-container-${item.id}`}
                    className={styles.headingContainer}
                    initial={false}
                  >
                    <motion.h3 className={styles.cardHeadingSmall} initial={false}>
                      {item.cardHeading}
                    </motion.h3>
                  </motion.div>
                  <div className={styles.expandIcon}>
                    <Plus width={21} height={21} strokeWidth={2.5} />
                  </div>
                </motion.div>
              </motion.div>
            </button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedItem && <ExpandableCardModal key="modal" item={selectedItem} onClose={() => setSelectedId(null)} />}
      </AnimatePresence>
    </div>
  );
}

export type { ExpandableCardItem };
