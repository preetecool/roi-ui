"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import type React from "react";
import { cn } from "@/lib/utils";
import styles from "./dialog.module.css";

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
    <Dialog.Backdrop data-slot="dialog-backdrop" className={cn(styles.overlay, className)} {...props} />
  );
}

function DialogPopup({
  className,
  ...props
}: Dialog.Popup.Props) {
  return <Dialog.Popup className={cn(styles.content, className)} {...props} />;
}

function DialogTitle({
  className,
  ...props
}: Dialog.Title.Props) {
  return <Dialog.Title className={cn(styles.title, className)} {...props} />;
}

function DialogDescription({
  className,
  ...props
}: Dialog.Description.Props) {
  return (
    <Dialog.Description
      data-slot="dialog-description"
      className={cn(styles.description, className)}
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
