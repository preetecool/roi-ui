"use client";

import { DrawerPreview as DrawerPrimitive } from "@base-ui/react/drawer";
import type React from "react";
import { cn } from "@/lib/utils-tailwind";

function DrawerRoot({ ...props }: DrawerPrimitive.Root.Props) {
  return <DrawerPrimitive.Root {...props} />;
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger {...props} />;
}

const DrawerPortal = DrawerPrimitive.Portal;

function DrawerBackdrop({ className, ...props }: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-[var(--dialog-z)] min-h-dvh bg-[var(--dialog-overlay)]",
        "opacity-[calc(1*(1-var(--drawer-swipe-progress)))]",
        "transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
        "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        "data-[swiping]:duration-0",
        "data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
        "supports-[-webkit-touch-callout:none]:absolute",
        className,
      )}
      data-slot="drawer-backdrop"
      {...props}
    />
  );
}

function DrawerViewport({ className, ...props }: DrawerPrimitive.Viewport.Props) {
  return (
    <DrawerPrimitive.Viewport
      className={cn(
        "fixed inset-0 z-[var(--dialog-z)] flex items-end justify-center",
        className,
      )}
      data-slot="drawer-viewport"
      {...props}
    />
  );
}

function DrawerPopup({ className, ...props }: DrawerPrimitive.Popup.Props) {
  return (
    <DrawerPrimitive.Popup
      className={cn(
        "[--bleed:3rem] box-border w-full max-h-[calc(80vh+var(--bleed))]",
        "-mb-[var(--bleed)] p-[1rem_1.5rem_1.5rem] pb-[calc(1.5rem+env(safe-area-inset-bottom,0px)+var(--bleed))]",
        "rounded-t-[var(--radius)] bg-[var(--mix-card-5-bg)] text-foreground",
        "shadow-[0_0_0_1px_oklch(from_var(--border)_l_c_h_/_0.5),var(--shadow-border-stack)]",
        "overflow-y-auto overscroll-contain touch-auto",
        "transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
        "will-change-transform [transform:translateY(var(--drawer-swipe-movement-y))]",
        "data-[swiping]:select-none",
        "data-[starting-style]:[transform:translateY(calc(100%-var(--bleed)))]",
        "data-[ending-style]:[transform:translateY(calc(100%-var(--bleed)))]",
        "data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
        className,
      )}
      data-slot="drawer-popup"
      {...props}
    />
  );
}

function DrawerContent({ className, ...props }: DrawerPrimitive.Content.Props) {
  return (
    <DrawerPrimitive.Content
      className={cn("mx-auto w-full max-w-[32rem]", className)}
      data-slot="drawer-content"
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      className={cn("mt-0 mb-1 text-lg leading-7 font-semibold tracking-[-0.008em] text-foreground", className)}
      data-slot="drawer-title"
      {...props}
    />
  );
}

function DrawerDescription({ className, ...props }: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      className={cn("m-0 mb-6 text-sm leading-normal text-muted-foreground", className)}
      data-slot="drawer-description"
      {...props}
    />
  );
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close {...props} />;
}

function DrawerHandle({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto mb-4 h-1 w-12 rounded-full bg-border", className)} {...props} />;
}

const DrawerProvider = DrawerPrimitive.Provider;
const DrawerIndent = DrawerPrimitive.Indent;
const DrawerIndentBackground = DrawerPrimitive.IndentBackground;

export {
  DrawerRoot as Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHandle,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPopup,
  DrawerPortal,
  DrawerProvider,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
};
