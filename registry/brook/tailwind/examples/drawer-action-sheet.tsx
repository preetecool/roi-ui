"use client";

import * as React from "react";
import { cn } from "@/lib/utils-tailwind";
import { Button } from "@/registry/brook/tailwind/ui/button";
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from "@/registry/brook/tailwind/ui/drawer";

const ACTIONS = ["Share", "Duplicate", "Move to Folder", "Pin to Top", "Print"];

export default function DrawerActionSheet() {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger render={<Button>More Actions</Button>} />
      <DrawerPortal>
        <DrawerBackdrop className="[--backdrop-opacity:0.4]" />
        <DrawerViewport>
          <DrawerPopup
            className={cn(
              "!w-full !max-w-[28rem] !max-h-none flex flex-col gap-3",
              "!p-0 !px-4 !pb-[calc(1rem+env(safe-area-inset-bottom,0px))]",
              "!mb-0 !rounded-none !bg-transparent !shadow-none",
              "pointer-events-none",
              "[transform:translateY(var(--drawer-swipe-movement-y))]",
              "transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
              "data-[swiping]:select-none",
              "data-[starting-style]:[transform:translateY(calc(100%+1rem))]",
              "data-[ending-style]:[transform:translateY(calc(100%+1rem))]",
              "data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
            )}
          >
            <DrawerContent
              className={cn(
                "pointer-events-auto max-w-none",
                "rounded-[var(--radius)] bg-[var(--mix-card-5-bg)] text-foreground overflow-hidden",
                "shadow-[0_0_0_1px_oklch(from_var(--border)_l_c_h/0.5),var(--shadow-border-stack)]",
              )}
            >
              <DrawerTitle className="sr-only">File actions</DrawerTitle>
              <DrawerDescription className="sr-only">
                Choose an action for this file.
              </DrawerDescription>

              <ul className="m-0 list-none p-0" aria-label="File actions">
                {ACTIONS.map((action, index) => (
                  <li key={action} className="[&:not(:first-child)]:border-t [&:not(:first-child)]:border-border">
                    {index === 0 && (
                      <DrawerClose className="sr-only">
                        Close file actions
                      </DrawerClose>
                    )}
                    <button
                      type="button"
                      className="box-border w-full cursor-pointer select-none border-0 bg-transparent p-4 px-5 text-center font-[inherit] text-sm leading-6 text-inherit hover:bg-accent focus-visible:bg-accent focus-visible:outline-0"
                      onClick={() => setOpen(false)}
                    >
                      {action}
                    </button>
                  </li>
                ))}
              </ul>
            </DrawerContent>
            <div
              className={cn(
                "pointer-events-auto",
                "rounded-[var(--radius)] bg-[var(--mix-card-5-bg)] overflow-hidden",
                "shadow-[0_0_0_1px_oklch(from_var(--border)_l_c_h/0.5),var(--shadow-border-stack)]",
              )}
            >
              <button
                type="button"
                className="box-border w-full cursor-pointer select-none border-0 bg-transparent p-4 px-5 text-center font-[inherit] text-sm leading-6 text-destructive hover:bg-accent focus-visible:bg-accent focus-visible:outline-0"
                onClick={() => setOpen(false)}
              >
                Delete
              </button>
            </div>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  );
}
