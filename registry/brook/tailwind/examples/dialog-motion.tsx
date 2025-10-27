"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/tw-utils";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/registry/brook/tailwind/ui/dialog";
import { Button } from "@/registry/brook/ui/button/button";

export default function DialogFramerMotion() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      {!open && (
        <DialogTrigger
          render={
            <Button
              render={
                <motion.button
                  className="relative inline-flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-[var(--radius)] border border-transparent bg-primary px-4 font-normal text-[0.925rem] text-primary-foreground outline-none focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 active:scale-[0.97]"
                  key="button-inner"
                  layoutId="button"
                />
              }
              style={{ transition: "none" }}
            >
              Toggle Dialog
            </Button>
          }
        />
      )}
      <AnimatePresence>
        <AnimatePresence>
          {open && <DialogOverlay key="overlay" />}
        </AnimatePresence>

        <DialogPortal keepMounted key="portal">
          {open && (
            <DialogPopup
              className={cn(
                "max-w-[400px] rounded-[var(--radius-lg)] border border-border p-6"
              )}
              render={
                <motion.div
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0.9999 }}
                  transition={{ type: "spring", duration: 0.4 }}
                />
              }
            >
              <DialogTitle className="m-0 border-b-0 p-0 text-lg">
                Premium Plan
              </DialogTitle>
              <DialogDescription className="m-0">
                Unlimited projects, priority support, and team collaboration
                tools for growing businesses.
              </DialogDescription>
              <div className="flex justify-end gap-4">
                <DialogClose
                  render={<Button variant="outline">Close</Button>}
                />
                <AnimatePresence>
                  <Button
                    render={
                      <motion.button
                        className="relative inline-flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-[var(--radius)] border border-transparent bg-primary px-4 font-normal text-[0.925rem] text-primary-foreground outline-none focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 active:scale-[0.97]"
                        key="button-inner"
                        layoutId="button"
                      />
                    }
                    style={{ transition: "none" }}
                  >
                    Toggle Dialog
                  </Button>
                </AnimatePresence>
              </div>
            </DialogPopup>
          )}
        </DialogPortal>
      </AnimatePresence>
    </Dialog>
  );
}
