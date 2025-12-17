"use client";

import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useRef, useState } from "react";

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    filter: "blur(4px)",
    transformOrigin: "right center",
  },
  visible: {
    opacity: 1,
    transformOrigin: "right center",
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.36,
      delay: 0.15,
      type: "spring",
      bounce: 0,
      ease: "anticipate",
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(4px)",
    scale: 0.97,
    transition: {
      duration: 0.5,
      type: "spring",
    },
  },
};

const closeButtonVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(4px)",
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    rotate: 0,
    originX: -12,
    transition: {
      duration: 0.36,
      delay: 0.15,
      type: "spring",
      bounce: 0,
      ease: "anticipate",
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(4px)",
    scale: 0.97,
    transition: {
      duration: 0.5,
      type: "spring",
    },
  },
};

export default function DialogFramerMotion() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <div className="relative">
        <motion.div
          className="absolute inset-0 z-0 border border-border bg-card"
          layoutId="wrapper"
          style={{ borderRadius: 8 }}
        />
        <Dialog.Trigger
          className="relative z-10 cursor-pointer border-none px-3 py-2 text-foreground"
          render={<motion.button layoutId="button" />}
        >
          Upgrade
        </Dialog.Trigger>
      </div>

      <AnimatePresence>
        {open && (
          <Dialog.Backdrop
            className="fixed inset-0 z-[100] min-h-dvh bg-[oklch(from_var(--background)_l_c_h_/_0.8)]"
            hidden={undefined}
            key="overlay"
            render={
              <motion.div
                animate={{
                  opacity: 1,
                }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
              />
            }
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <Dialog.Portal container={containerRef} keepMounted>
            <div className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2">
              <motion.div
                className="absolute inset-0 z-0 border border-border bg-card shadow-lg"
                layoutId="wrapper"
                style={{ borderRadius: 12 }}
              />
              <Dialog.Popup
                className="relative z-10 h-48 w-[364px] rounded-xl bg-transparent p-4 outline-none"
                hidden={undefined}
              >
                <div className="flex h-full flex-col">
                  <Dialog.Title
                    className="m-0 mb-2 border-b-0 p-0 text-lg"
                    render={<motion.span animate="visible" exit="exit" initial="hidden" variants={contentVariants} />}
                  >
                    Plan Plus
                  </Dialog.Title>
                  <Dialog.Description
                    className="m-0 flex-1"
                    render={<motion.p animate="visible" exit="exit" initial="hidden" variants={contentVariants} />}
                  >
                    Upgrade your plan for full access.
                  </Dialog.Description>

                  <div className="mt-auto flex justify-end gap-3">
                    <Dialog.Close
                      className="cursor-pointer rounded-md border border-border bg-card px-3 py-2 text-foreground transition-colors hover:bg-accent"
                      render={
                        <motion.button
                          animate="visible"
                          exit="exit"
                          initial="hidden"
                          style={{ originX: -20, originY: -20 }}
                          variants={closeButtonVariants}
                        />
                      }
                    >
                      Close
                    </Dialog.Close>
                    <motion.button
                      className="cursor-pointer rounded-md border border-border bg-card px-3 py-2 text-foreground transition-colors hover:bg-accent"
                      layoutId="button"
                    >
                      Upgrade
                    </motion.button>
                  </div>
                </div>
              </Dialog.Popup>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
