"use client";

import { ScrollArea } from "@base-ui-components/react/scroll-area";
import { cn } from "@/lib/utils";
import styles from "./scroll-area.module.css";

function ScrollAreaRoot({
  className,
  ...props
}: React.ComponentProps<typeof ScrollArea.Root>) {
  return <ScrollArea.Root className={cn(styles.root, className)} {...props} />;
}

function ScrollAreaViewport({
  className,
  ...props
}: React.ComponentProps<typeof ScrollArea.Viewport>) {
  return <ScrollArea.Viewport className={cn(styles.viewport, className)} {...props} />;
}

function ScrollAreaContent({
  className,
  ...props
}: React.ComponentProps<typeof ScrollArea.Content>) {
  return <ScrollArea.Content className={cn(styles.content, className)} {...props} />;
}

function ScrollAreaScrollbar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollArea.Scrollbar>) {
  return (
    <ScrollArea.Scrollbar
      className={cn(styles.scrollbar, orientation === "horizontal" && styles.horizontal, className)}
      orientation={orientation}
      {...props}
    />
  );
}

function ScrollAreaThumb({
  className,
  ...props
}: React.ComponentProps<typeof ScrollArea.Thumb>) {
  return <ScrollArea.Thumb className={cn(styles.thumb, className)} {...props} />;
}

function ScrollAreaCorner({
  className,
  ...props
}: React.ComponentProps<typeof ScrollArea.Corner>) {
  return <ScrollArea.Corner className={cn(styles.corner, className)} {...props} />;
}

export {
  ScrollAreaRoot as ScrollArea,
  ScrollAreaViewport,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
};