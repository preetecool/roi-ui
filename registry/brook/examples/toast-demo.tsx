"use client";

import { Button } from "@/registry/brook/ui/button/button";
import {
  CloseIcon,
  ToastClose,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  Toast as ToastRoot,
  ToastTitle,
  ToastViewport,
} from "@/registry/brook/ui/toast/toast";
import { Toast } from "@base-ui-components/react/toast";

export default function ToastDemo() {
  return (
    <ToastProvider>
      <ToastButton />
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  );
}

function ToastButton() {
  const toastManager = Toast.useToastManager();

  function createToast() {
    toastManager.add({
      title: "Success!",
      description: "Your changes have been saved successfully.",
    });
  }

  return <Button onClick={createToast}>Show Toast</Button>;
}

function ToastList() {
  const { toasts } = Toast.useToastManager();
  return toasts.map((toast) => (
    <ToastRoot key={toast.id} toast={toast}>
      <ToastTitle />
      <ToastDescription />
      <ToastClose
        render={(props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
          <button {...props} aria-label="Close">
            <CloseIcon />
          </button>
        )}
      />
    </ToastRoot>
  ));
}
