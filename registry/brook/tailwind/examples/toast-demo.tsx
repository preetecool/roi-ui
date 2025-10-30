"use client";

import { Button } from "@/registry/brook/tailwind/ui/button";
import {
  ToastProvider,
  toastManager,
} from "@/registry/brook/tailwind/ui/toast";

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
