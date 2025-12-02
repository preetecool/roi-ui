"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils-tailwind";
import { Button } from "@/registry/brook/tailwind/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/registry/brook/tailwind/ui/dialog";

type Side = "left" | "right";

export default function DialogSheet() {
  const [side, setSide] = useState<Side>("right");

  return (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger
          render={
            <Button variant="outline" onClick={() => setSide("left")}>
              Open Left
            </Button>
          }
        />
        <DialogTrigger
          render={
            <Button variant="outline" onClick={() => setSide("right")}>
              Open Right
            </Button>
          }
        />
        <DialogPortal>
          <DialogOverlay />
          <DialogPopup
            className={cn(
              "!fixed !top-2 !bottom-2 !translate-x-0 !translate-y-0 h-[calc(100dvh-1rem)] w-[400px] max-w-[calc(90vw-1rem)] flex flex-col gap-4 !rounded-2xl p-6",
              "![transition:all_400ms_cubic-bezier(0.32,0.72,0,1)]",
              "data-[starting-style]:!scale-100 data-[ending-style]:!scale-100",
              side === "left" &&
                "!left-2 !right-auto data-[starting-style]:!-translate-x-[calc(100%+0.5rem)] data-[ending-style]:!-translate-x-[calc(100%+0.5rem)]",
              side === "right" &&
                "!right-2 !left-auto data-[starting-style]:!translate-x-[calc(100%+0.5rem)] data-[ending-style]:!translate-x-[calc(100%+0.5rem)]"
            )}
          >
            <DialogClose
              className="absolute top-4 right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border-none bg-transparent text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              render={<button type="button" />}
            >
              <X size={16} />
            </DialogClose>
            <DialogHeader className="flex flex-col gap-1.5">
              <DialogTitle>Sheet Panel</DialogTitle>
              <DialogDescription>
                This dialog slides in from the {side} side of the screen.
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto">
              <p>
                Sheet dialogs are useful for navigation menus, settings panels,
                or any content that benefits from a slide-in interaction.
              </p>
            </div>
            <div className="mt-auto flex gap-3 [&>*]:flex-1">
              <DialogClose render={<Button variant="outline">Close</Button>} />
              <Button>Save</Button>
            </div>
          </DialogPopup>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
