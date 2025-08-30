"use client";

import { Accordion } from "@base-ui-components/react/accordion";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const accordionItems = [
  {
    id: "item-1",
    title: "What makes animations smooth?",
    content:
      "Smooth animations are achieved through proper easing curves, appropriate durations, and understanding the physics of motion. Framer Motion provides spring animations that feel natural and responsive to user interactions.",
  },
  {
    id: "item-2",
    title: "How do spring animations work?",
    content:
      "Spring animations simulate real-world physics by using mass, tension, and friction values. This creates more natural movement that feels organic rather than mechanical. The motion has bounce and elasticity that mimics how objects move in the physical world.",
  },
  {
    id: "item-3",
    title: "What about performance?",
    content:
      "Framer Motion is optimized for performance by using hardware acceleration when possible and only animating properties that don't trigger layout recalculations. Transform and opacity changes are handled efficiently by the GPU.",
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
    <div
      style={{
        width: "32rem",
        maxWidth: "calc(100vw - 8rem)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {accordionItems.map((item) => {
        const isOpen = openItems.includes(item.id);

        return (
          <motion.div
            key={item.id}
            transition={{ type: "spring" }}
            style={{
              border: "1px solid var(--border)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <Accordion.Root value={openItems} onValueChange={handleValueChange}>
              <Accordion.Item value={item.id}>
                <motion.div>
                  <Accordion.Header
                    style={{
                      margin: 0,
                      padding: 0,
                      display: "block",
                      width: "100%",
                      fontSize: "1rem",
                    }}
                  >
                    <motion.div
                      whileHover="hover"
                      style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <Accordion.Trigger
                        style={{
                          display: "flex",
                          width: "100%",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "1.5rem 2rem",
                          fontWeight: "400",
                          textAlign: "left",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "var(--title)",
                          boxSizing: "border-box",
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        <div>{item.title}</div>

                        <motion.div
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ type: "spring" }}
                          style={{
                            width: "1.5rem",
                            height: "1.5rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.5rem",
                            fontWeight: "300",
                            color: "var(--foreground)",
                          }}
                        >
                          +
                        </motion.div>
                      </Accordion.Trigger>

                      <motion.div
                        variants={{
                          hover: {
                            width: "100%",
                            height: "100%",
                            borderRadius: "12px",
                            opacity: 1,
                          },
                        }}
                        initial={{
                          width: "50px",
                          height: "75px",
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.2,
                          ease: "linear",
                        }}
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          translateX: "-50%",
                          translateY: "-50%",
                          background: "var(--muted)",
                          zIndex: 0,
                        }}
                      />
                    </motion.div>
                  </Accordion.Header>
                </motion.div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      key="content"
                      layout
                      initial={{ height: 0, opacity: 0.8 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0.8 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        opacity: { duration: 0.2 },
                      }}
                      style={{
                        overflow: "hidden",
                        width: "100%",
                      }}
                    >
                      <motion.div
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        exit={{ y: -10 }}
                        transition={{
                          duration: 0.2,
                          delay: 0.1,
                        }}
                        style={{
                          padding: "0 2rem 2rem 2rem",
                          fontSize: "0.875rem",
                          lineHeight: "1.6",
                          color: "var(--foreground)",
                        }}
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
