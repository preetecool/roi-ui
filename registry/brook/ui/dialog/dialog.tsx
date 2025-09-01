"use client";

import React from "react";
import { Dialog } from "@base-ui-components/react/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./dialog.module.css";

const DialogRoot = ({ ...props }: React.ComponentProps<typeof Dialog.Root>) => {
  return <Dialog.Root {...props} />;
};

const DialogTrigger = ({ ...props }: React.ComponentProps<typeof Dialog.Trigger>) => {
  return <Dialog.Trigger {...props} />;
};

const DialogPortal = Dialog.Portal;

const DialogOverlay = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Dialog.Backdrop>) => (
  <Dialog.Backdrop className={cn(styles.overlay, className)} {...props} />
);

const DialogPopup = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Dialog.Popup>) => (
  <Dialog.Popup className={cn(styles.content, className)} {...props} />
);

const DialogTitle = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Dialog.Title>) => (
  <Dialog.Title className={cn(styles.title, className)} {...props} />
);

const DialogDescription = ({ className, ...props }: React.ComponentProps<typeof Dialog.Description>) => (
  <Dialog.Description className={cn(styles.description, className)} {...props} />
);

const DialogClose = ({ ...props }: React.ComponentProps<typeof Dialog.Close>) => {
  return <Dialog.Close {...props} />;
};

const DialogHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn(styles.header, className)} {...props} />
);

const DialogFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn(styles.footer, className)} {...props} />
);

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
