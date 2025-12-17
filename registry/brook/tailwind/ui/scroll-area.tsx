"use client";

import { ScrollArea } from "@base-ui/react/scroll-area";
import { cn } from "@/lib/utils-tailwind";

function ScrollAreaRoot({ className, ...props }: ScrollArea.Root.Props) {
  return (
    <ScrollArea.Root
      className={cn("box-border h-[8.5rem] w-96 max-w-[calc(100vw-8rem)]", className)}
      data-slot="scrollarea-root"
      {...props}
    />
  );
}

function ScrollAreaViewport({ className, ...props }: ScrollArea.Viewport.Props) {
  return (
    <ScrollArea.Viewport
      className={cn(
        "-outline-offset-1 scrollbar-none h-full overflow-scroll overscroll-contain rounded-md [-ms-overflow-style:none]",
        "[&::-webkit-scrollbar]:hidden",
        "focus-visible:outline-2 focus-visible:outline-[var(--ring)]",
        className
      )}
      data-slot="scrollarea-viewport"
      {...props}
    />
  );
}

function ScrollAreaContent({ className, ...props }: ScrollArea.Content.Props) {
  return (
    <ScrollArea.Content
      className={cn("flex flex-col gap-4 py-3 pr-6 pl-4", className)}
      data-slot="scrollarea-content"
      {...props}
    />
  );
}

function ScrollAreaScrollbar({ className, orientation = "vertical", ...props }: ScrollArea.Scrollbar.Props) {
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
      data-slot="scrollarea-scrollbar"
      orientation={orientation}
      {...props}
    />
  );
}

function ScrollAreaThumb({ className, ...props }: ScrollArea.Thumb.Props) {
  return (
    <ScrollArea.Thumb
      className={cn("w-full rounded-[inherit] bg-[var(--muted-foreground)]", className)}
      data-slot="scrollarea-thumb"
      {...props}
    />
  );
}

function ScrollAreaCorner({ className, ...props }: ScrollArea.Corner.Props) {
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
