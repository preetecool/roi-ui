"use client";

import { AlertDialog } from "@base-ui-components/react/alert-dialog";
import type React from "react";
import { cn } from "@/lib/utils";
import styles from "./alert-dialog.module.css";

function AlertDialogRoot({
  ...props
}: React.ComponentProps<typeof AlertDialog.Root>) {
  return <AlertDialog.Root {...props} />;
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialog.Trigger>) {
  return <AlertDialog.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

const AlertDialogPortal = AlertDialog.Portal;

function AlertDialogBackdrop({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialog.Backdrop>) {
  return (
    <AlertDialog.Backdrop
      data-slot="alert-dialog-backdrop"
      className={cn(styles.overlay, className)}
      {...props}
    />
  );
}

function AlertDialogPopup({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AlertDialog.Popup>) {
  return (
    <AlertDialogPortal>
      <AlertDialogBackdrop />
      <AlertDialog.Popup
        data-slot="alert-dialog-popup"
        className={cn(styles.content, className)}
        {...props}
      >
        {children}
      </AlertDialog.Popup>
    </AlertDialogPortal>
  );
}

const AlertDialogContent = AlertDialogPopup;

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialog.Title>) {
  return (
    <AlertDialog.Title
      data-slot="alert-dialog-title"
      className={cn(styles.title, className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialog.Description>) {
  return (
    <AlertDialog.Description
      data-slot="alert-dialog-description"
      className={cn(styles.description, className)}
      {...props}
    />
  );
}

function AlertDialogClose({
  ...props
}: React.ComponentProps<typeof AlertDialog.Close>) {
  return <AlertDialog.Close data-slot="alert-dialog-close" {...props} />;
}

const AlertDialogOverlay = AlertDialogBackdrop;

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(styles.header, className)}
      {...props}
    />
  );
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(styles.footer, className)}
      {...props}
    />
  );
}

export {
  AlertDialogRoot as AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
};
