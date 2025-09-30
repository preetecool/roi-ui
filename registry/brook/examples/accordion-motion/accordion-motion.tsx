"use client";

import { Accordion } from "@base-ui-components/react/accordion";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import styles from "./accordion-motion.module.css";

const accordionItemVariants = {
  default: {},
  spring: {},
};

const accordionItemTransition = { type: "spring" as const };

const iconVariants = {
  closed: { rotate: 0 },
  open: { rotate: 45 },
};

const iconTransition = { type: "spring" as const };

const hoverVariants = {
  default: {
    width: "50px",
    height: "75px",
    opacity: 0,
  },
  hover: {
    width: "100%",
    height: "100%",
    borderRadius: "12px",
    opacity: 1,
  },
};

const hoverTransition = {
  duration: 0.2,
  ease: "linear" as const,
};

const contentVariants = {
  closed: { height: 0, opacity: 0.8 },
  open: { height: "auto", opacity: 1 },
};

const contentTransition = {
  duration: 0.2,
  ease: "easeInOut" as const,
  opacity: { duration: 0.2 },
};

const contentInnerVariants = {
  closed: { y: -10 },
  open: { y: 0 },
};

const contentInnerTransition = {
  duration: 0.2,
  delay: 0.1,
};

const accordionItems = [
  {
    id: "item-1",
    title: "What is a brook?",
    content:
      "A small, natural stream of fresh water flowing along a course towards a river, lake, or sea.",
  },
  {
    id: "item-2",
    title: "What is a stream?",
    content:
      "A small narrow river that flows continuously in one direction, often through valleys and plains.",
  },
  {
    id: "item-3",
    title: "What is a creek?",
    content:
      "A narrow waterway smaller than a river, often found in wooded areas and feeding into larger bodies of water.",
  },
];

export default function AccordionFramerMotion() {
  const [openItems, setOpenItems] = useState<string[]>(["item-1"]);

  const handleValueChange = (newValues: string[]) => {
    if (newValues.length > 0 && (openItems.length === 0 || !openItems.includes(newValues[newValues.length - 1]))) {
      setOpenItems([newValues[newValues.length - 1]]);
    } else {
      setOpenItems(newValues);
    }
  };

  return (
    <div className={styles.container}>
      {accordionItems.map((item) => {
        const isOpen = openItems.includes(item.id);

        return (
          <motion.div key={item.id} variants={accordionItemVariants} animate="spring" transition={accordionItemTransition} className={styles.accordionItem}>
            <Accordion.Root value={openItems} onValueChange={handleValueChange}>
              <Accordion.Item value={item.id}>
                <motion.div>
                  <Accordion.Header className={styles.header}>
                    <motion.div whileHover="hover" className={styles.triggerContainer}>
                      <Accordion.Trigger className={styles.trigger}>
                        <div>{item.title}</div>

                        <motion.div
                          variants={iconVariants}
                          animate={isOpen ? "open" : "closed"}
                          transition={iconTransition}
                          className={styles.icon}
                        >
                          +
                        </motion.div>
                      </Accordion.Trigger>

                      <motion.div
                        variants={hoverVariants}
                        initial="default"
                        transition={hoverTransition}
                        className={styles.hoverBackground}
                      />
                    </motion.div>
                  </Accordion.Header>
                </motion.div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      key="content"
                      layout
                      variants={contentVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      transition={contentTransition}
                      className={styles.content}
                    >
                      <motion.div
                        variants={contentInnerVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={contentInnerTransition}
                        className={styles.contentInner}
                      >
                        {item.content}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Accordion.Item>
            </Accordion.Root>
          </motion.div>
        );
      })}
    </div>
  );
}
