"use client";

import { ScrollArea } from "@base-ui-components/react/scroll-area";
import { cn } from "@/lib/tw-utils";

function ScrollAreaRoot({
  className,
  ...props
}: React.ComponentProps<typeof ScrollArea.Root>) {
  return (
    <ScrollArea.Root
      className={cn(
        "box-border h-[8.5rem] w-96 max-w-[calc(100vw-8rem)]",
        className
      )}
      {...props}
    />
  );
}

function ScrollAreaViewport({
  className,
  ...props
}: React.ComponentProps<typeof ScrollArea.Viewport>) {
  return (
    <ScrollArea.Viewport
      className={cn(
        "-outline-offset-1 scrollbar-none h-full overflow-scroll overscroll-contain rounded-md [-ms-overflow-style:none]",
        "[&::-webkit-scrollbar]:hidden",
        "focus-visible:outline-2 focus-visible:outline-[var(--ring)]",
        className
      )}
      {...props}
    />
  );
}

function ScrollAreaContent({
  className,
  ...props
}: React.ComponentProps<typeof ScrollArea.Content>) {
  return (
    <ScrollArea.Content
      className={cn("flex flex-col gap-4 py-3 pr-6 pl-4", className)}
      {...props}
    />
  );
}

function ScrollAreaScrollbar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollArea.Scrollbar>) {
  return (
    <ScrollArea.Scrollbar
      className={cn(
        "m-2 flex w-1 touch-none select-none justify-center rounded-md bg-[var(--border)] opacity-0 transition-opacity delay-300 duration-150",
        "data-[scrolling]:opacity-100 data-[scrolling]:delay-0 data-[scrolling]:duration-75",
        "data-[hovering]:data-[scrolling]:opacity-0",
        "before:absolute before:h-full before:w-5 before:content-['']",
        "max-sm:m-2.5 max-sm:w-1.5 max-sm:before:w-6",
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
}: React.ComponentProps<typeof ScrollArea.Thumb>) {
  return (
    <ScrollArea.Thumb
      className={cn(
        "w-full rounded-[inherit] bg-[var(--muted-foreground)]",
        className
      )}
      {...props}
    />
  );
}

function ScrollAreaCorner({
  className,
  ...props
}: React.ComponentProps<typeof ScrollArea.Corner>) {
  return <ScrollArea.Corner className={cn("hidden", className)} {...props} />;
}

export {
  ScrollAreaRoot as ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
};
