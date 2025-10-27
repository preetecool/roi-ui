"use client";
import { Dialog } from "@base-ui-components/react/dialog";
import { Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/tw-utils";

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
    <div className="relative h-fit w-fit">
      <Dialog.Root onOpenChange={setIsOpen} open={isOpen}>
        {isOpen && (
          <Dialog.Backdrop
            className="pointer-events-auto fixed inset-0 z-[100] bg-[var(--background)]"
            key="overlay"
            render={
              <motion.div
                animate={{
                  opacity: 1,
                }}
                className="pointer-events-auto fixed inset-0 z-[100] bg-[var(--background)]"
                exit={{ opacity: 0, background: "red" }}
                initial={{ opacity: 0 }}
                transition={{
                  delay: 0.035,
                  duration: 0.17,
                  // biome-ignore lint/style/noMagicNumbers: cubic-bezier easing values
                  ease: [0.455, 0.03, 0.515, 0.955],
                }}
              />
            }
          />
        )}

        <Dialog.Portal keepMounted>
          <AnimatePresence mode="popLayout">
            {isOpen && (
              <div
                className="pointer-events-none fixed inset-0 z-[9999] flex max-h-full items-center justify-center overflow-y-auto"
                key="positioner"
              >
                <Dialog.Popup
                  render={
                    <motion.div
                      className={cn(
                        "relative top-[5vh] max-h-[100dvh] w-full max-w-[900px] overflow-hidden",
                        "border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.6)] bg-[var(--mix-card-15-bg)] p-0",
                        "pointer-events-auto flex flex-col items-center gap-4",
                        "transform-none animate-none opacity-100 transition-none",
                        "scrollbar-thin scrollbar-thumb-[var(--border)] scrollbar-track-transparent"
                      )}
                      layoutId={`card-${item.id}`}
                      style={{
                        borderRadius: "32px",
                        overflow: "hidden",
                      }}
                    />
                  }
                >
                  <div
                    className={cn(
                      "relative flex h-full w-full flex-col items-center gap-4 overflow-y-auto px-6 pt-0 pb-[12vh]",
                      "scrollbar-thin scrollbar-thumb-[var(--border)] scrollbar-track-transparent",
                      "mask-image-[linear-gradient(to_bottom,#000_0%,#000_80%,transparent_100%)]",
                      "[-webkit-mask-image:linear-gradient(to_bottom,#000_0%,#000_80%,transparent_100%)]",
                      "md:justify-between md:gap-0 md:px-4",
                      "md:mask-image-[linear-gradient(to_bottom,#000_0%,#000_95%,transparent_100%)]",
                      "md:[-webkit-mask-image:linear-gradient(to_bottom,#000_0%,#000_97%,transparent_100%)]"
                    )}
                    style={{
                      maskImage:
                        "linear-gradient(to bottom, #000 0%, #000 80%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, #000 0%, #000 80%, transparent 100%)",
                    }}
                  >
                    <div className="sticky top-8 z-20 flex h-11 w-11 cursor-pointer items-center justify-center self-end rounded-full">
                      <Dialog.Close
                        aria-label="Close"
                        className={cn(
                          "z-20 h-8 w-8 rounded-full border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.7)]",
                          "flex cursor-pointer items-center justify-center bg-transparent text-[var(--muted-foreground)] transition-[150ms_ease-out]",
                          "hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                        )}
                        render={
                          <motion.button
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
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
                      className="h-auto w-full max-w-[600px] object-contain"
                      height={600}
                      layoutId={`image-${item.id}`}
                      src={item.imageSrc}
                      style={{ borderRadius: "16px" }}
                      width={600}
                    />

                    <motion.div className="mx-auto flex h-auto w-full max-w-[600px] flex-col items-start gap-9 pt-7 pr-0 pb-0 pl-0 text-left">
                      <motion.div layoutId={`heading-${item.id}`}>
                        <motion.h3
                          className={cn(
                            "m-0 w-full self-start font-semibold text-5xl text-[var(--foreground)]",
                            "md:text-[32px]"
                          )}
                        >
                          {item.cardHeading}
                        </motion.h3>
                      </motion.div>

                      <motion.div
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={cn("text-[var(--foreground)]", "md:text-sm")}
                        exit={{
                          opacity: 0,
                          y: -40,
                          scale: 0.95,
                          transition: { delay: 0.05 },
                        }}
                        initial={{ opacity: 0, y: -40, scale: 0.95 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
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
              className={cn(
                "all-[unset] flex w-[320px] cursor-pointer flex-col items-center border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.7)]",
                "focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2",
                "md:max-w-[300px]"
              )}
              layoutId={`card-${item.id}`}
              style={{ borderRadius: "24px" }}
            />
          }
        >
          <motion.img
            alt={item.alt}
            className="h-80 w-full object-cover"
            height={300}
            layoutId={`image-${item.id}`}
            src={item.imageSrc}
            style={{ borderRadius: "12px" }}
            width={300}
          />

          <div className="flex w-full items-center justify-center p-4">
            <motion.div layoutId={`heading-${item.id}`}>
              <motion.h3
                className={cn(
                  "m-0 font-semibold text-2xl text-[var(--secondary-foreground)] transition-[150ms_ease-out]",
                  "[.all-\\[unset\\]:hover_&]:text-[var(--foreground)]"
                )}
              >
                {item.cardHeading}
              </motion.h3>
            </motion.div>

            <motion.div
              className={cn(
                "flex h-9 min-h-9 w-9 min-w-9 items-center justify-center rounded-full text-[var(--muted-foreground)]",
                "ml-auto shrink-0 border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.7)] transition-[150ms_ease-out]",
                "hover:bg-[var(--card)] hover:text-[var(--foreground)]",
                "[.all-\\[unset\\]:hover_&]:bg-[var(--card)] [.all-\\[unset\\]:hover_&]:text-[var(--foreground)]"
              )}
            >
              <Plus height={21} strokeWidth={2} width={21} />
            </motion.div>
          </div>
        </Dialog.Trigger>
      </Dialog.Root>
    </div>
  );
}

export type { ExpandableCardItem };
