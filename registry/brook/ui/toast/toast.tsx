"use client";

import { Toast } from "@base-ui-components/react/toast";
import { X } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./toast.module.css";

const toastManager = Toast.createToastManager();

function ToastProvider({ children, ...props }: Toast.Provider.Props) {
  return (
    <Toast.Provider toastManager={toastManager} {...props}>
      {children}
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </Toast.Provider>
  );
}

function ToastPortal({ ...props }: Toast.Portal.Props) {
  return <Toast.Portal {...props} />;
}

function ToastViewport({ className, ...props }: Toast.Viewport.Props) {
  return (
    <Toast.Viewport
      className={cn(styles.viewport, className)}
      data-slot="toast-viewport"
      {...props}
    />
  );
}

function ToastRoot({ className, ...props }: Toast.Root.Props) {
  return <Toast.Root className={cn(styles.root, className)} {...props} />;
}

function ToastContent({ className, ...props }: Toast.Content.Props) {
  return <Toast.Content className={cn(styles.content, className)} {...props} />;
}

function ToastTitle({ className, ...props }: Toast.Title.Props) {
  return <Toast.Title className={cn(styles.title, className)} {...props} />;
}

function ToastDescription({ className, ...props }: Toast.Description.Props) {
  return (
    <Toast.Description
      className={cn(styles.description, className)}
      data-slot="toast-description"
      {...props}
    />
  );
}

function ToastAction({ className, ...props }: Toast.Action.Props) {
  return (
    <Toast.Action
      className={cn(styles.action, className)}
      data-slot="toast-action"
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
      className={cn(styles.close, className)}
      data-slot="toast-close"
      render={render}
      {...props}
    />
  );
}

function ToastList() {
  const { toasts } = Toast.useToastManager();
  return toasts.map((toast) => (
    <ToastRoot key={toast.id} toast={toast}>
      <ToastContent>
        <div
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <ToastTitle />
              {toast.type && (
                <span className={styles.statusPill} data-type={toast.type} />
              )}
            </div>
            <ToastDescription />
            {toast.actionProps && (
              <ToastAction className={styles.actionButton}>
                {toast.actionProps.children}
              </ToastAction>
            )}
          </div>
        </div>
        {toast.data?.showCloseButton === true && (
          <ToastClose
            render={(props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
              <button {...props} aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            )}
          />
        )}
      </ToastContent>
    </ToastRoot>
  ));
}

// biome-ignore lint/performance/noBarrelFile: Re-exporting icon as part of component API
export { X as CloseIcon } from "lucide-react";

export { ToastProvider, toastManager };
