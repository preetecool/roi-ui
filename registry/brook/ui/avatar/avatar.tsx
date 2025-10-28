"use client";

import { Avatar } from "@base-ui-components/react/avatar";
import { cn } from "@/lib/utils";
import styles from "./avatar.module.css";

function AvatarRoot({
  className,
  ...props
}: Avatar.Root.Props) {
  return <Avatar.Root className={cn(styles.root, className)} {...props} />;
}

function AvatarImage({
  className,
  ...props
}: Avatar.Image.Props) {
  return <Avatar.Image className={cn(styles.image, className)} {...props} />;
}

function AvatarFallback({
  className,
  ...props
}: Avatar.Fallback.Props) {
  return (
    <Avatar.Fallback className={cn(styles.fallback, className)} {...props} />
  );
}

export { AvatarRoot as Avatar, AvatarFallback, AvatarImage };
