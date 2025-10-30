"use client";

import { Toast } from "@base-ui-components/react/toast";
import { X } from "lucide-react";
import { cn } from "@/lib/tw-utils";

const toastManager = Toast.createToastManager();

function ToastProvider({ children, ...props }: Toast.Provider.Props) {
  return (
    <Toast.Provider toastManager={toastManager} {...props}>
      {children}
      <Toast.Portal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function ToastViewport({ className, ...props }: Toast.Viewport.Props) {
  return (
    <Toast.Viewport
      className={cn(
        "fixed top-auto right-4 bottom-4 left-auto z-[1000] m-auto w-[250px]",
        "sm:right-8 sm:bottom-8 sm:w-[340px]",
        className
      )}
      data-slot="toast-viewport"
      {...props}
    />
  );
}

function ToastRoot({ className, ...props }: Toast.Root.Props) {
  return (
    <Toast.Root
      className={cn(
        "[--gap:0.75rem]",
        "[--peek:0.75rem]",
        "[--scale:calc(max(0,1-(var(--toast-index)*0.1)))]",
        "[--shrink:calc(1-var(--scale))]",
        "[--height:var(--toast-frontmost-height,var(--toast-height))]",
        "[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]",
        "absolute right-0 bottom-0 left-auto z-[calc(1000-var(--toast-index))] mr-0 w-full origin-bottom",
        "select-none rounded-[0.5rem] border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.5)] bg-[var(--mix-card-5-bg)] bg-clip-padding p-4",
        "shadow-[oklch(from_var(--border)_l_c_h_/_0.2)_0px_1px_1px,oklch(from_var(--border)_l_c_h_/_0.2)_0px_1px_1px,oklch(from_var(--border)_l_c_h_/_0.2)_0px_1px_1px]",
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
        "[transition:transform_0.6s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.17s_var(--ease-out-expo)]",
        className
      )}
      data-slot="toast-root"
      {...props}
    />
  );
}

function ToastContent({ className, ...props }: Toast.Content.Props) {
  return (
    <Toast.Content
      className={cn(
        "overflow-hidden transition-opacity [transition-duration:350ms]",
        "data-[behind]:pointer-events-none data-[behind]:opacity-0",
        "data-[expanded]:pointer-events-auto data-[expanded]:opacity-100",
        className
      )}
      data-slot="toast-content"
      {...props}
    />
  );
}

function ToastTitle({ className, ...props }: Toast.Title.Props) {
  return (
    <Toast.Title
      className={cn(
        "m-0 font-[450] text-[0.975rem] text-[var(--foreground)] leading-5 tracking-[-0.02em]",
        className
      )}
      data-slot="toast-title"
      {...props}
    />
  );
}

function ToastDescription({ className, ...props }: Toast.Description.Props) {
  return (
    <Toast.Description
      className={cn(
        "m-0 mt-1 text-[0.875rem] text-[var(--secondary-foreground)] leading-5 tracking-[-0.02em]",
        className
      )}
      data-slot="toast-description"
      {...props}
    />
  );
}

function ToastAction({ className, ...props }: Toast.Action.Props) {
  return (
    <Toast.Action
      className={cn(
        "inline-flex h-8 items-center justify-center rounded px-3",
        "font-medium text-sm leading-5",
        "mt-2 cursor-pointer border-none",
        "bg-[var(--primary)] text-[var(--primary-foreground)]",
        "transition-all duration-150",
        "hover:opacity-90",
        "focus:outline-none",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2",
        className
      )}
      data-slot="toast-action"
      {...props}
    />
  );
}

function ToastClose({ className, children, ...props }: Toast.Close.Props) {
  return (
    <Toast.Close
      className={cn(
        "absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-sm border-none bg-transparent",
        "text-[oklch(from_var(--foreground)_l_c_h_/_0.3)] transition-all duration-150",
        "hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
        "focus:outline-none",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2",
        className
      )}
      data-slot="toast-close"
      {...props}
    >
      {children}
    </Toast.Close>
  );
}

function ToastList() {
  const { toasts } = Toast.useToastManager();
  return toasts.map((toast) => (
    <ToastRoot key={toast.id} toast={toast}>
      <ToastContent>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <ToastTitle />
              {toast.type && (
                <span
                  className={cn(
                    "inline-block h-[5px] w-[10px] rounded-[var(--radius)]",
                    toast.type === "success" && "bg-[var(--success)]",
                    toast.type === "error" && "bg-[var(--destructive)]",
                    toast.type === "warning" && "bg-[var(--warning)]",
                    toast.type === "info" && "bg-[var(--info)]"
                  )}
                />
              )}
            </div>
            <ToastDescription />
            {toast.actionProps && (
              <ToastAction className="mt-2">
                {toast.actionProps.children}
              </ToastAction>
            )}
          </div>
        </div>
        {toast.data?.showCloseButton === true && (
          <ToastClose>
            <X className="h-4 w-4" />
          </ToastClose>
        )}
      </ToastContent>
    </ToastRoot>
  ));
}

// biome-ignore lint/performance/noBarrelFile: Re-exporting icon as part of component API
export { X as CloseIcon } from "lucide-react";

export { ToastProvider, toastManager };
