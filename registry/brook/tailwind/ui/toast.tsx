"use client";

import { Toast } from "@base-ui-components/react/toast";
import { cn } from "@/lib/tw-utils";

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
    <Toast.Viewport
      data-slot="toast-viewport"
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
  children,
  ...props
}: Toast.Root.Props) {
  return (
    <Toast.Root
      data-slot="toast-root"
      className={cn(
        "[--gap:0.75rem]",
        "[--peek:0.75rem]",
        "[--scale:calc(max(0,1-(var(--toast-index)*0.1)))]",
        "[--shrink:calc(1-var(--scale))]",
        "[--height:var(--toast-frontmost-height,var(--toast-height))]",
        "[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]",
        "absolute right-0 bottom-0 left-auto z-[calc(1000-var(--toast-index))] mr-0 w-full origin-bottom",
        "rounded-[0.5rem] border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.9)] bg-[var(--mix-card-33-bg)] bg-clip-padding p-4 shadow-[0_2px_10px_rgba(0,0,0,0.1)] select-none",
        "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]",
        "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
        "data-[ending-style]:opacity-0",
        "data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))]",
        "data-[limited]:opacity-0",
        "data-[starting-style]:[transform:translateY(150%)]",
        "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
        "data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
        "data-[expanded]:data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
        "data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
        "data-[expanded]:data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
        "data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
        "data-[expanded]:data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
        "data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
        "data-[expanded]:data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
        "h-[var(--height)]",
        "data-[expanded]:h-[var(--toast-height)]",
        "[transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s]",
        "data-[type=success]:border-[#10b981] data-[type=success]:bg-[#ecfdf5]",
        "data-[type=error]:border-[#ef4444] data-[type=error]:bg-[#fef2f2]",
        "data-[type=warning]:border-[#f59e0b] data-[type=warning]:bg-[#fffbeb]",
        "data-[type=info]:border-[#3b82f6] data-[type=info]:bg-[#eff6ff]",
        className
      )}
      {...props}
    >
      <Toast.Content className="overflow-hidden transition-opacity [transition-duration:250ms] data-[behind]:pointer-events-none data-[behind]:opacity-0 data-[expanded]:pointer-events-auto data-[expanded]:opacity-100">
        {children}
      </Toast.Content>
    </Toast.Root>
  );
}

function ToastTitle({
  className,
  ...props
}: Toast.Title.Props) {
  return (
    <Toast.Title
      data-slot="toast-title"
      className={cn(
        "m-0 font-medium text-[0.975rem] text-[var(--foreground)] leading-5",
        "[[data-type=success]_&]:text-[#047857]",
        "[[data-type=error]_&]:text-[#dc2626]",
        "[[data-type=warning]_&]:text-[#d97706]",
        "[[data-type=info]_&]:text-[#2563eb]",
        className
      )}
      {...props}
    />
  );
}

function ToastDescription({
  className,
  ...props
}: Toast.Description.Props) {
  return (
    <Toast.Description
      data-slot="toast-description"
      className={cn(
        "m-0 mt-1 text-[0.925rem] text-[var(--foreground)] leading-5",
        "[[data-type=success]_&]:text-[#065f46]",
        "[[data-type=error]_&]:text-[#991b1b]",
        "[[data-type=warning]_&]:text-[#92400e]",
        "[[data-type=info]_&]:text-[#1e40af]",
        className
      )}
      {...props}
    />
  );
}

function ToastClose({
  className,
  children,
  ...props
}: Toast.Close.Props) {
  return (
    <Toast.Close
      data-slot="toast-close"
      className={cn(
        "absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-sm border-none bg-transparent",
        "text-[var(--foreground)] transition-all duration-150",
        "hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
        "focus:outline-none",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </Toast.Close>
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
