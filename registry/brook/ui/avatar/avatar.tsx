"use client";

import { Avatar } from "@base-ui/react/avatar";
import { cn } from "@/lib/utils";
import styles from "./avatar.module.css";

function AvatarRoot({ className, ...props }: Avatar.Root.Props) {
  return (
    <Avatar.Root
      className={cn(styles.root, className)}
      data-slot="avatar-root"
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: Avatar.Image.Props) {
  return (
    <Avatar.Image
      className={cn(styles.image, className)}
      data-slot="avatar-image"
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: Avatar.Fallback.Props) {
  return (
    <Avatar.Fallback
      className={cn(styles.fallback, className)}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}

export { AvatarRoot as Avatar, AvatarFallback, AvatarImage };
