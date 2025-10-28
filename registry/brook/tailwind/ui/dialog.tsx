"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import type React from "react";
import { cn } from "@/lib/tw-utils";

function DialogRoot({ ...props }: Dialog.Root.Props) {
  return <Dialog.Root {...props} />;
}

function DialogTrigger({
  ...props
}: Dialog.Trigger.Props) {
  return <Dialog.Trigger {...props} />;
}

const DialogPortal = Dialog.Portal;

function DialogOverlay({
  className,
  ...props
}: Dialog.Backdrop.Props) {
  return (
    <Dialog.Backdrop
      data-slot="dialog-backdrop"
      className={cn(
        "fixed inset-0 z-[var(--dialog-z)] bg-[var(--dialog-overlay)] transition-opacity duration-150",
        "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
        className
      )}
      {...props}
    />
  );
}

function DialogPopup({
  className,
  ...props
}: Dialog.Popup.Props) {
  return (
    <Dialog.Popup
      data-slot="dialog-popup"
      className={cn(
        "-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 z-[101] grid w-full gap-4 overflow-y-auto",
        "rounded-[var(--radius)] border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.6)] bg-background p-6",
        "shadow-[0_8px_11px_-2px_oklch(from_var(--foreground)_l_c_h_/_0.01),0_4px_6px_-2px_oklch(from_var(--foreground)_l_c_h_/_0.01),inset_0_0_0_1px_oklch(from_var(--background)_l_c_h_/_0.01)]",
        "transition-all duration-150",
        "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
        "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
        "max-sm:w-[calc(100vw-2rem)]",
        className
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: Dialog.Title.Props) {
  return (
    <Dialog.Title
      data-slot="dialog-title"
      className={cn(
        "m-0 font-semibold text-foreground text-lg leading-none tracking-[-0.008em]",
        className
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: Dialog.Description.Props) {
  return (
    <Dialog.Description
      data-slot="dialog-description"
      className={cn(
        "m-0 text-muted-foreground text-sm leading-normal",
        className
      )}
      {...props}
    />
  );
}

function DialogClose({ ...props }: Dialog.Close.Props) {
  return <Dialog.Close {...props} />;
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2",
        "sm:flex-row sm:justify-end",
        "[&>:last-child]:mt-2 sm:[&>:last-child]:mt-0",
        className
      )}
      {...props}
    />
  );
}

export {
  DialogRoot as Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPopup,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
};
