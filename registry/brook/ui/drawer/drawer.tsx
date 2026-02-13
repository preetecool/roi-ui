"use client";

import { DrawerPreview as DrawerPrimitive } from "@base-ui/react/drawer";
import type React from "react";
import { cn } from "@/lib/utils";
import styles from "./drawer.module.css";

function DrawerRoot({ ...props }: DrawerPrimitive.Root.Props) {
  return <DrawerPrimitive.Root {...props} />;
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger {...props} />;
}

const DrawerPortal = DrawerPrimitive.Portal;

function DrawerBackdrop({ className, ...props }: DrawerPrimitive.Backdrop.Props) {
  return <DrawerPrimitive.Backdrop className={cn(styles.backdrop, className)} data-slot="drawer-backdrop" {...props} />;
}

function DrawerViewport({ className, ...props }: DrawerPrimitive.Viewport.Props) {
  return <DrawerPrimitive.Viewport className={cn(styles.viewport, className)} data-slot="drawer-viewport" {...props} />;
}

function DrawerPopup({ className, ...props }: DrawerPrimitive.Popup.Props) {
  return <DrawerPrimitive.Popup className={cn(styles.popup, className)} data-slot="drawer-popup" {...props} />;
}

function DrawerContent({ className, ...props }: DrawerPrimitive.Content.Props) {
  return <DrawerPrimitive.Content className={cn(styles.content, className)} data-slot="drawer-content" {...props} />;
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return <DrawerPrimitive.Title className={cn(styles.title, className)} data-slot="drawer-title" {...props} />;
}

function DrawerDescription({ className, ...props }: DrawerPrimitive.Description.Props) {
  return <DrawerPrimitive.Description className={cn(styles.description, className)} data-slot="drawer-description" {...props} />;
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close {...props} />;
}

function DrawerHandle({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.handle, className)} {...props} />;
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
