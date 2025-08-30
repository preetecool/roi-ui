"use client";

import { Toast } from "@base-ui-components/react/toast";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./toast.module.css";

const ToastProvider = ({ ...props }: React.ComponentPropsWithoutRef<typeof Toast.Provider>) => (
  <Toast.Provider {...props} />
);

const ToastPortal = ({ ...props }: React.ComponentPropsWithoutRef<typeof Toast.Portal>) => <Toast.Portal {...props} />;

const ToastViewport = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Toast.Viewport>) => (
  <Toast.Viewport className={cn(styles.Viewport, className)} {...props} />
);

const ToastRoot = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Toast.Root>) => (
  <Toast.Root className={cn(styles.root, className)} {...props} />
);

const ToastTitle = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Toast.Title>) => (
  <Toast.Title className={cn(styles.title, className)} {...props} />
);

const ToastDescription = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Toast.Description>) => (
  <Toast.Description className={cn(styles.description, className)} {...props} />
);

const ToastClose = ({
  className,
  render,
  ...props
}: React.ComponentPropsWithoutRef<typeof Toast.Close> & {
  render?: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => React.ReactNode;
}) => <Toast.Close className={cn(styles.close, className)} render={render} {...props} />;

export {
  ToastProvider,
  ToastPortal,
  ToastViewport,
  ToastRoot as Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  X as CloseIcon,
};
