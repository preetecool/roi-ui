"use client";

import { Toast } from "@base-ui-components/react/toast";
import { cn } from "@/lib/tw-utils";

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
    <Toast.Viewport
      className={cn(
        "fixed top-auto right-4 bottom-4 left-auto z-[1000] m-auto w-[250px]",
        "sm:right-8 sm:bottom-8 sm:w-[300px]",
        className
      )}
      {...props}
    />
  );
}

function ToastRoot({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Toast.Root>) {
  return (
    <Toast.Root
      className={cn(
        "[--gap:0.75rem]",
        "[--offset-y:calc(var(--toast-offset-y)*-1+(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]",
        "absolute right-0 m-auto box-border bg-[var(--mix-card-33-bg)] text-[var(--muted-foreground)]",
        "w-full border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.9)] p-4",
        "rounded-lg bg-clip-padding shadow-[0_2px_10px_rgba(0,0,0,0.1)]",
        "bottom-0 left-auto mr-0 select-none",
        "transition-[transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s]",
        "z-[calc(1000-var(--toast-index))] cursor-default",
        "translate-x-[var(--toast-swipe-movement-x)] transform",
        "translate-y-[calc(var(--toast-swipe-movement-y)+(min(var(--toast-index),10)*-20%))]",
        "scale-[calc(max(0,1-(var(--toast-index)*0.1)))]",
        "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
        "data-[expanded]:translate-x-[var(--toast-swipe-movement-x)] data-[expanded]:translate-y-[var(--offset-y)]",
        "data-[starting-style]:translate-y-[150%]",
        "data-[ending-style]:translate-y-[150%] data-[ending-style]:opacity-0",
        "data-[ending-style]:data-[swipe-direction=up]:translate-y-[calc(var(--toast-swipe-movement-y)-150%)]",
        "data-[ending-style]:data-[swipe-direction=left]:translate-x-[calc(var(--toast-swipe-movement-x)-150%)] data-[ending-style]:data-[swipe-direction=left]:translate-y-[var(--offset-y)]",
        "data-[ending-style]:data-[swipe-direction=right]:translate-x-[calc(var(--toast-swipe-movement-x)+150%)] data-[ending-style]:data-[swipe-direction=right]:translate-y-[var(--offset-y)]",
        "data-[ending-style]:data-[swipe-direction=down]:translate-y-[calc(var(--toast-swipe-movement-y)+150%)]",
        "data-[limited]:opacity-0",
        "data-[type=success]:border-[#10b981] data-[type=success]:bg-[#ecfdf5]",
        "data-[type=error]:border-[#ef4444] data-[type=error]:bg-[#fef2f2]",
        "data-[type=warning]:border-[#f59e0b] data-[type=warning]:bg-[#fffbeb]",
        "data-[type=info]:border-[#3b82f6] data-[type=info]:bg-[#eff6ff]",
        className
      )}
      {...props}
    />
  );
}

function ToastTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Toast.Title>) {
  return (
    <Toast.Title
      className={cn(
        "m-0 font-medium text-[0.975rem] text-[var(--foreground)] leading-5",
        "[.data-\\[type\\=success\\]_&]:text-[#047857]",
        "[.data-\\[type\\=error\\]_&]:text-[#dc2626]",
        "[.data-\\[type\\=warning\\]_&]:text-[#d97706]",
        "[.data-\\[type\\=info\\]_&]:text-[#2563eb]",
        className
      )}
      {...props}
    />
  );
}

function ToastDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Toast.Description>) {
  return (
    <Toast.Description
      className={cn(
        "m-0 mt-1 text-[0.925rem] text-[var(--foreground,var(--color-gray-700))] leading-5",
        "[.data-\\[type\\=success\\]_&]:text-[#065f46]",
        "[.data-\\[type\\=error\\]_&]:text-[#991b1b]",
        "[.data-\\[type\\=warning\\]_&]:text-[#92400e]",
        "[.data-\\[type\\=info\\]_&]:text-[#1e40af]",
        className
      )}
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
      className={cn(
        "absolute top-2 right-2 h-5 w-5 border-none bg-transparent",
        "flex items-center justify-center rounded text-[var(--foreground,var(--color-gray-700))]",
        "cursor-pointer transition-all duration-150",
        "hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
        "focus:outline-none",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring,var(--color-blue))] focus-visible:outline-offset-2",
        "[&_svg]:h-4 [&_svg]:w-4",
        className
      )}
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
