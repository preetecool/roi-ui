"use client";

import { Button } from "@/registry/brook/ui/button/button";
import { ToastProvider, toastManager } from "@/registry/brook/ui/toast/toast";

export default function ToastDemo() {
  return (
    <ToastProvider>
      <ToastButton />
    </ToastProvider>
  );
}

function ToastButton() {
  function createToast() {
    toastManager.add({
      title: "Success!",
      description: "Your changes have been saved successfully.",
      type: "success",
    });
  }

  return <Button onClick={createToast}>Show Toast</Button>;
}
