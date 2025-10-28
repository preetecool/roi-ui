"use client";

import { AlertDialog } from "@base-ui-components/react/alert-dialog";
import type React from "react";
import { cn } from "@/lib/tw-utils";

function AlertDialogRoot({
  ...props
}: React.ComponentProps<typeof AlertDialog.Root>) {
  return <AlertDialog.Root {...props} />;
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialog.Trigger>) {
  return <AlertDialog.Trigger {...props} />;
}

const AlertDialogPortal = AlertDialog.Portal;

function AlertDialogBackdrop({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialog.Backdrop>) {
  return (
    <AlertDialog.Backdrop
      className={cn(
        "fixed inset-0 z-[var(--dialog-z)] bg-[var(--dialog-overlay)] transition-opacity duration-150",
        "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogPopup({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialog.Popup>) {
  return (
    <AlertDialogPortal>
      <AlertDialogBackdrop />
      <AlertDialog.Popup
        className={cn(
          "fixed top-1/2 left-1/2 z-[101] grid max-h-[85vh] w-full max-w-[32rem] overflow-y-auto",
          "gap-4 rounded-[var(--radius)] border-[0.5px] border-border/60 p-6",
          "-translate-x-1/2 -translate-y-1/2 bg-background",
          "transition-all duration-150",
          "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
          "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
          "max-sm:-translate-y-1/2 max-sm:top-1/2 max-sm:right-4 max-sm:left-4 max-sm:w-[calc(100vw-2rem)] max-sm:max-w-none max-sm:translate-x-0",
          "max-sm:data-[starting-style]:translate-y-[-50%] max-sm:data-[starting-style]:scale-90",
          "max-sm:data-[ending-style]:translate-y-[-50%] max-sm:data-[ending-style]:scale-90",
          className
        )}
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
}: React.ComponentPropsWithoutRef<typeof AlertDialog.Title>) {
  return (
    <AlertDialog.Title
      className={cn(
        "m-0 font-semibold text-foreground text-lg leading-none tracking-tight",
        className
      )}
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
      className={cn(
        "m-0 text-secondary-foreground text-sm leading-[1.5]",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogClose({
  ...props
}: React.ComponentProps<typeof AlertDialog.Close>) {
  return <AlertDialog.Close {...props} />;
}

const AlertDialogOverlay = AlertDialogBackdrop;

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 text-left [&_h2]:m-0 [&_p]:m-0",
        className
      )}
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
      className={cn(
        "flex flex-col-reverse gap-2",
        "sm:flex-row sm:justify-end",
        className
      )}
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
