"use client";

import { Avatar } from "@base-ui-components/react/avatar";
import { cn } from "@/lib/utils-tailwind";

function AvatarRoot({ className, ...props }: Avatar.Root.Props) {
  return (
    <Avatar.Root
      className={cn(
        "relative inline-flex select-none items-center justify-center overflow-hidden align-middle",
        "h-10 w-10 rounded-full bg-muted",
        "data-[size=sm]:h-8 data-[size=sm]:w-8 data-[size=sm]:[&_.avatar-fallback]:text-xs",
        "data-[size=lg]:h-12 data-[size=lg]:w-12 data-[size=lg]:[&_.avatar-fallback]:text-base",
        "data-[size=xl]:h-16 data-[size=xl]:w-16 data-[size=xl]:[&_.avatar-fallback]:text-xl",
        "data-[shape=circle]:rounded-full",
        "data-[shape=square]:rounded-none",
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
        "avatar-fallback flex h-full w-full items-center justify-center",
        "rounded-[inherit] bg-muted font-medium text-muted-foreground text-sm uppercase",
        className
      )}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}

export { AvatarRoot as Avatar, AvatarFallback, AvatarImage };
