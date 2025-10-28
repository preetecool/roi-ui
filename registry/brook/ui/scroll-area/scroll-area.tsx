"use client";

import { ScrollArea } from "@base-ui-components/react/scroll-area";
import { cn } from "@/lib/utils";
import styles from "./scroll-area.module.css";

function ScrollAreaRoot({
  className,
  ...props
}: ScrollArea.Root.Props) {
  return <ScrollArea.Root className={cn(styles.root, className)} {...props} />;
}

function ScrollAreaViewport({
  className,
  ...props
}: ScrollArea.Viewport.Props) {
  return (
    <ScrollArea.Viewport
      className={cn(styles.viewport, className)}
      {...props}
    />
  );
}

function ScrollAreaContent({
  className,
  ...props
}: ScrollArea.Content.Props) {
  return (
    <ScrollArea.Content className={cn(styles.content, className)} {...props} />
  );
}

function ScrollAreaScrollbar({
  className,
  orientation = "vertical",
  ...props
}: ScrollArea.Scrollbar.Props) {
  return (
    <ScrollArea.Scrollbar
      className={cn(
        styles.scrollbar,
        orientation === "horizontal" && styles.horizontal,
        className
      )}
      orientation={orientation}
      {...props}
    />
  );
}

function ScrollAreaThumb({
  className,
  ...props
}: ScrollArea.Thumb.Props) {
  return (
    <ScrollArea.Thumb className={cn(styles.thumb, className)} {...props} />
  );
}

function ScrollAreaCorner({
  className,
  ...props
}: ScrollArea.Corner.Props) {
  return (
    <ScrollArea.Corner className={cn(styles.corner, className)} {...props} />
  );
}

export {
  ScrollAreaRoot as ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
};
