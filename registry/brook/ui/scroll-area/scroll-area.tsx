"use client";

import { ScrollArea } from "@base-ui-components/react/scroll-area";
import { cn } from "@/lib/utils";
import styles from "./scroll-area.module.css";

const ScrollAreaRoot = ({
  className,
  ...props
}: React.ComponentProps<typeof ScrollArea.Root>) => (
  <ScrollArea.Root className={cn(styles.root, className)} {...props} />
);

const ScrollAreaViewport = ({
  className,
  ...props
}: React.ComponentProps<typeof ScrollArea.Viewport>) => (
  <ScrollArea.Viewport className={cn(styles.viewport, className)} {...props} />
);

const ScrollAreaContent = ({
  className,
  ...props
}: React.ComponentProps<typeof ScrollArea.Content>) => (
  <ScrollArea.Content className={cn(styles.content, className)} {...props} />
);

const ScrollAreaScrollbar = ({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollArea.Scrollbar>) => (
  <ScrollArea.Scrollbar 
    className={cn(styles.scrollbar, orientation === "horizontal" && styles.horizontal, className)} 
    orientation={orientation}
    {...props} 
  />
);

const ScrollAreaThumb = ({
  className,
  ...props
}: React.ComponentProps<typeof ScrollArea.Thumb>) => (
  <ScrollArea.Thumb className={cn(styles.thumb, className)} {...props} />
);

const ScrollAreaCorner = ({
  className,
  ...props
}: React.ComponentProps<typeof ScrollArea.Corner>) => (
  <ScrollArea.Corner className={cn(styles.corner, className)} {...props} />
);

export {
  ScrollAreaRoot as ScrollArea,
  ScrollAreaViewport,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
};