"use client";

import { AlertDialog } from "@base-ui-components/react/alert-dialog";
import type React from "react";
import { cn } from "@/lib/utils";
import styles from "./alert-dialog.module.css";

function AlertDialogRoot({
  ...props
}: AlertDialog.Root.Props) {
  return <AlertDialog.Root {...props} />;
}

function AlertDialogTrigger({
  ...props
}: AlertDialog.Trigger.Props) {
  return <AlertDialog.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

const AlertDialogPortal = AlertDialog.Portal;

function AlertDialogBackdrop({
  className,
  ...props
}: AlertDialog.Backdrop.Props) {
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
}: AlertDialog.Popup.Props) {
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
}: AlertDialog.Title.Props) {
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
}: AlertDialog.Description.Props) {
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
}: AlertDialog.Close.Props) {
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
