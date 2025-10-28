"use client";

import { Toast } from "@base-ui-components/react/toast";
import { cn } from "@/lib/utils";
import styles from "./toast.module.css";

function ToastProvider({
  ...props
}: Toast.Provider.Props) {
  return <Toast.Provider {...props} />;
}

function ToastPortal({
  ...props
}: Toast.Portal.Props) {
  return <Toast.Portal {...props} />;
}

function ToastViewport({
  className,
  ...props
}: Toast.Viewport.Props) {
  return (
    <Toast.Viewport data-slot="toast-viewport" className={cn(styles.viewport, className)} {...props} />
  );
}

function ToastRoot({
  className,
  ...props
}: Toast.Root.Props) {
  return <Toast.Root className={cn(styles.root, className)} {...props} />;
}

function ToastTitle({
  className,
  ...props
}: Toast.Title.Props) {
  return <Toast.Title className={cn(styles.title, className)} {...props} />;
}

function ToastDescription({
  className,
  ...props
}: Toast.Description.Props) {
  return (
    <Toast.Description
      data-slot="toast-description"
      className={cn(styles.description, className)}
      {...props}
    />
  );
}

function ToastClose({
  className,
  render,
  ...props
}: Toast.Close.Props & {
  render?: (
    props: React.ButtonHTMLAttributes<HTMLButtonElement>
  ) => React.ReactNode;
}) {
  return (
    <Toast.Close
      data-slot="toast-close"
      className={cn(styles.close, className)}
      render={render}
      {...props}
    />
  );
}

// biome-ignore lint/performance/noBarrelFile: Re-exporting icon as part of component API
export { X as CloseIcon } from "lucide-react";

export {
  ToastRoot as Toast,
  ToastClose,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
};
