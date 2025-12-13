"use client";

import { Avatar } from "@base-ui/react/avatar";
import { cn } from "@/lib/utils-tailwind";

function AvatarRoot({ className, ...props }: Avatar.Root.Props) {
  return (
    <Avatar.Root
      className={cn(
        "relative inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full bg-muted align-middle",
        className
      )}
      data-slot="avatar-root"
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: Avatar.Image.Props) {
  return (
    <Avatar.Image
      className={cn("h-full w-full rounded-[inherit] object-cover", className)}
      data-slot="avatar-image"
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: Avatar.Fallback.Props) {
  return (
    <Avatar.Fallback
      className={cn(
        "flex h-full w-full items-center justify-center rounded-[inherit] bg-muted font-medium text-muted-foreground text-sm uppercase",
        className
      )}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}

export { AvatarRoot as Avatar, AvatarFallback, AvatarImage };
