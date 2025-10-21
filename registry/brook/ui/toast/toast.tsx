"use client";

import { Toast } from "@base-ui-components/react/toast";
import { cn } from "@/lib/utils";
import styles from "./toast.module.css";

function ToastProvider({
  ...props
}: React.ComponentPropsWithoutRef<typeof Toast.Provider>) {
  return <Toast.Provider {...props} />;
}

function ToastPortal({
  ...props
}: React.ComponentPropsWithoutRef<typeof Toast.Portal>) {
  return <Toast.Portal {...props} />;
}

function ToastViewport({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Toast.Viewport>) {
  return (
    <Toast.Viewport className={cn(styles.Viewport, className)} {...props} />
  );
}

function ToastRoot({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Toast.Root>) {
  return <Toast.Root className={cn(styles.root, className)} {...props} />;
}

function ToastTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Toast.Title>) {
  return <Toast.Title className={cn(styles.title, className)} {...props} />;
}

function ToastDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Toast.Description>) {
  return (
    <Toast.Description
      className={cn(styles.description, className)}
      {...props}
    />
  );
}

function ToastClose({
  className,
  render,
  ...props
}: React.ComponentPropsWithoutRef<typeof Toast.Close> & {
  render?: (
    props: React.ButtonHTMLAttributes<HTMLButtonElement>
  ) => React.ReactNode;
}) {
  return (
    <Toast.Close
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
