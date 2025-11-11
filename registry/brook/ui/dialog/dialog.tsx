"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import type React from "react";
import { cn } from "@/lib/utils";
import styles from "./dialog.module.css";

function DialogRoot({ ...props }: Dialog.Root.Props) {
  return <Dialog.Root {...props} />;
}

function DialogTrigger({ ...props }: Dialog.Trigger.Props) {
  return <Dialog.Trigger {...props} />;
}

const DialogPortal = Dialog.Portal;

function DialogOverlay({ className, ...props }: Dialog.Backdrop.Props) {
  return (
    <Dialog.Backdrop
      className={cn(styles.overlay, className)}
      data-slot="dialog-backdrop"
      {...props}
    />
  );
}

function DialogPopup({ className, ...props }: Dialog.Popup.Props) {
  return (
    <Dialog.Popup
      className={cn(styles.content, className)}
      data-slot="dialog-popup"
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: Dialog.Title.Props) {
  return <Dialog.Title className={cn(styles.title, className)} {...props} />;
}

function DialogDescription({ className, ...props }: Dialog.Description.Props) {
  return (
    <Dialog.Description
      className={cn(styles.description, className)}
      data-slot="dialog-description"
      {...props}
    />
  );
}

function DialogClose({ ...props }: Dialog.Close.Props) {
  return <Dialog.Close {...props} />;
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.header, className)} {...props} />;
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.footer, className)} {...props} />;
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
