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
        <AnimatePresence>
          {isOpen && (
            <Dialog.Backdrop
              hidden={undefined}
              key="overlay"
              render={
                <motion.div
                  animate={{
                    opacity: 1,
                  }}
                  className="fixed inset-0 z-[100] min-h-dvh bg-black opacity-100 transition-[300ms_cubic-bezier(0.45,1.005,0,1.005)] data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 supports-[(-webkit-touch-callout:none)]:absolute dark:opacity-95"
                  exit={{ opacity: 0, display: "block" }}
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
        </AnimatePresence>
        <Dialog.Portal keepMounted>
          <AnimatePresence>
            {isOpen && (
              <div
                className="pointer-events-none fixed inset-0 z-[9999] flex max-h-full items-center justify-center overflow-y-auto"
                key="positioner"
              >
                <Dialog.Popup
                  hidden={undefined}
                  render={
                    <motion.div
                      className={cn(
                        "fixed top-[5vh] max-h-dvh w-full max-w-[960px] overflow-hidden",
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
                      "scrollbar-thin scrollbar-thumb-[var(--border)] scrollbar-track-transparent"
                    )}
                    style={{
                      maskImage:
                        "linear-gradient(to bottom, var(--background) calc(100% - 10vh), oklch(from var(--background) l c h / 0.33) calc(100% - calc(8vh / 2)), transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, var(--background) calc(100% - 10vh), oklch(from var(--background) l c h / 0.33) calc(100% - calc(8vh / 2)), transparent 100%)",
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
                      className="h-auto w-full max-w-[700px] object-contain"
                      height={600}
                      layoutId={`image-${item.id}`}
                      src={item.imageSrc}
                      style={{ borderRadius: "16px" }}
                      width={600}
                    />

                    <motion.div className="mx-auto flex h-auto w-full max-w-[700px] flex-col items-start gap-9 pt-7 pr-0 pb-0 pl-0 text-left leading-[2]">
                      <motion.div layoutId={`heading-${item.id}`}>
                        <motion.h3 className="m-0 w-full self-start font-semibold text-[48px] text-[var(--foreground)]">
                          {item.cardHeading}
                        </motion.h3>
                      </motion.div>

                      <motion.div
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="text-[oklch(from_var(--secondary-foreground)_l_c_h_/_0.8)]"
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
              className="flex w-[320px] cursor-pointer flex-col items-center border-[0.5px] border-solid border-[oklch(from_var(--border)_l_c_h_/_0.7)] bg-transparent p-0 font-[inherit] text-[inherit] focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2"
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
              <motion.h3 className="m-0 font-semibold text-2xl text-[var(--secondary-foreground)] transition-[150ms_ease-out]">
                {item.cardHeading}
              </motion.h3>
            </motion.div>

            <motion.div className="ml-auto flex h-9 min-h-9 w-9 min-w-9 shrink-0 items-center justify-center rounded-full border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.7)] text-[var(--muted-foreground)] transition-[150ms_ease-out] hover:bg-[var(--card)] hover:text-[var(--foreground)]">
              <Plus height={21} strokeWidth={2} width={21} />
            </motion.div>
          </div>
        </Dialog.Trigger>
      </Dialog.Root>
    </div>
  );
}

export type { ExpandableCardItem };
