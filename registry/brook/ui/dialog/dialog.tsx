"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { X } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils";
import styles from "./dialog.module.css";

function DialogRoot({ ...props }: React.ComponentProps<typeof Dialog.Root>) {
  return <Dialog.Root {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof Dialog.Trigger>) {
  return <Dialog.Trigger {...props} />;
}

const DialogPortal = Dialog.Portal;

function DialogOverlay({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Backdrop>) {
  return (
    <Dialog.Backdrop className={cn(styles.overlay, className)} {...props} />
  );
}

function DialogPopup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Popup>) {
  return <Dialog.Popup className={cn(styles.content, className)} {...props} />;
}

function DialogTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Title>) {
  return <Dialog.Title className={cn(styles.title, className)} {...props} />;
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Description>) {
  return (
    <Dialog.Description
      className={cn(styles.description, className)}
      {...props}
    />
  );
}

function DialogClose({ ...props }: React.ComponentProps<typeof Dialog.Close>) {
  return <Dialog.Close {...props} />;
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.header, className)} {...props} />;
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.footer, className)} {...props} />;
}

export {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogPopup,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogOverlay,
  X as CloseIcon,
};
