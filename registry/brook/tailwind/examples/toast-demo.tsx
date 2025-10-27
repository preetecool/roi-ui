"use client";

import { Toast } from "@base-ui-components/react/toast";
import { Button } from "@/registry/brook/tailwind/ui/button";
import {
  CloseIcon,
  ToastClose,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  Toast as ToastRoot,
  ToastTitle,
  ToastViewport,
} from "@/registry/brook/tailwind/ui/toast";

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
      <ToastClose>
        <CloseIcon className="h-4 w-4" />
      </ToastClose>
    </ToastRoot>
  ));
}
