"use client";

import { Avatar } from "@base-ui-components/react/avatar";
import { cn } from "@/lib/utils";
import styles from "./avatar.module.css";

const AvatarRoot = ({ className, ...props }: React.ComponentProps<typeof Avatar.Root>) => (
  <Avatar.Root className={cn(styles.root, className)} {...props} />
);

const AvatarImage = ({ className, ...props }: React.ComponentProps<typeof Avatar.Image>) => (
  <Avatar.Image className={cn(styles.image, className)} {...props} />
);

const AvatarFallback = ({ className, ...props }: React.ComponentProps<typeof Avatar.Fallback>) => (
  <Avatar.Fallback className={cn(styles.fallback, className)} {...props} />
);

export { AvatarRoot as Avatar, AvatarImage, AvatarFallback };
