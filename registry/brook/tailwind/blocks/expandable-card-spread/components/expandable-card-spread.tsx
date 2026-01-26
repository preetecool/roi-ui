"use client";

import { Dialog } from "@base-ui/react/dialog";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { MobileStack } from "./mobile-stack";

type CardData = {
  id: number;
  title: string;
  color: string;
  textColor?: string;
  description: string;
};

type ExpandableCardSpreadProps = {
  data: {
    cards: CardData[];
  };
};

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}

export function ExpandableCardSpread({ data }: ExpandableCardSpreadProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const isExpanded = expandedId !== null;

  if (isMobile) {
    return <MobileStack cards={data.cards} />;
  }

  return (
    <div className="relative mx-auto flex min-h-[600px] w-full max-w-[900px] flex-col items-center justify-center">
      <div
        className={`flex items-center justify-center gap-0 ${
          isExpanded ? "-translate-x-1/2 fixed bottom-[90px] left-1/2 h-auto flex-row" : ""
        }`}
      >
        {data.cards.map((card, index) => {
          const isOpen = expandedId === card.id;
          return (
            <Dialog.Root
              key={`root-${card.id}`}
              modal={false}
              onOpenChange={(open) => {
                if (!open) {
                  setExpandedId(null);
                }
              }}
              open={isOpen}
            >
              <Dialog.Trigger
                nativeButton={false}
                render={
                  <motion.li
                    aria-label={`Expand ${card.title}`}
                    className={`-ml-[60px] flex cursor-pointer flex-col items-start justify-end border-none p-6 first:ml-0 focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2 ${
                      isExpanded ? "-ml-[120px] h-[210px] w-[170px] p-3 first:ml-0" : "h-[290px] w-[230px]"
                    }`}
                    layoutId={`spread-card-${card.id}`}
                    onClick={() => {
                      setExpandedId(card.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setExpandedId(card.id);
                      }
                    }}
                    style={{
                      backgroundColor: card.color,
                      borderRadius: 20,
                      color: card.textColor || "#ffffff",
                      zIndex: index,
                    }}
                    transition={{
                      layout: {
                        type: "spring",
                        bounce: 0.25,
                      },
                    }}
                  />
                }
              >
                <motion.div
                  className={`rounded-full bg-white/25 ${isExpanded ? "mb-1.5 h-5 w-5" : "mb-3 h-8 w-8"}`}
                  layoutId={`spread-circle-${card.id}`}
                />
                <motion.h3
                  className={`whitespace-pre-line text-left font-medium tracking-[-0.01em] ${
                    isExpanded ? "text-[0.9rem] leading-[1.2]" : "text-[1.4rem] leading-[1.3]"
                  }`}
                  layoutId={`spread-title-${card.id}`}
                >
                  {card.title}
                </motion.h3>
              </Dialog.Trigger>

              <Dialog.Portal keepMounted>
                {isOpen ? (
                  <div
                    className="pointer-events-none fixed inset-0 bottom-10 flex items-center justify-center"
                    key={`positioner-${card.id}`}
                  >
                    <Dialog.Popup
                      hidden={undefined}
                      render={
                        <motion.li
                          className="pointer-events-auto flex min-h-[500px] w-[400px] flex-col items-start justify-end gap-3 p-6"
                          layoutId={`spread-card-${card.id}`}
                          onClick={() => setExpandedId(null)}
                          style={{
                            borderRadius: 20,
                            backgroundColor: card.color,
                            color: card.textColor || "#ffffff",
                            zIndex: index,
                            cursor: "pointer",
                          }}
                          transition={{
                            layout: {
                              type: "spring",
                              bounce: 0.15,
                            },
                          }}
                        />
                      }
                    >
                      <motion.div
                        className="mb-[26px] h-[140px] w-[140px] self-center rounded-full bg-white/25"
                        layoutId={`spread-circle-${card.id}`}
                      />
                      <motion.h2
                        className="m-0 whitespace-pre-line text-left font-medium text-4xl leading-[1.1] tracking-[-0.02em]"
                        layoutId={`spread-title-${card.id}`}
                      >
                        {card.title}
                      </motion.h2>

                      <motion.p
                        animate={{ opacity: 1, y: 0 }}
                        className="m-0 text-base leading-[1.8] opacity-80"
                        exit={{ opacity: 0, y: 8 }}
                        initial={{
                          opacity: prefersReducedMotion ? 1 : 0,
                          y: prefersReducedMotion ? 0 : 16,
                        }}
                        transition={{
                          delay: prefersReducedMotion ? 0 : 0.15,
                          duration: prefersReducedMotion ? 0 : 0.3,
                          type: "spring",
                          bounce: 0,
                        }}
                      >
                        {card.description}
                      </motion.p>
                    </Dialog.Popup>
                  </div>
                ) : null}
              </Dialog.Portal>
            </Dialog.Root>
          );
        })}
      </div>
    </div>
  );
}
