"use client";

import type { ComponentProps, ReactNode } from "react";
import { createContext, useContext } from "react";

import { cn } from "@/lib/utils";
import styles from "./badge.module.css";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "success";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps extends ComponentProps<"span"> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
}

interface BadgeIconProps extends ComponentProps<"span"> {
  children: ReactNode;
}

const BadgeContext = createContext<{ variant: BadgeVariant }>({ 
  variant: "default"
});

const Badge = ({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) => {
  const badgeClassName = cn(styles.badge, styles[variant], styles[size], className);

  return (
    <BadgeContext.Provider value={{ variant }}>
      <span data-slot="badge" className={badgeClassName} {...props}>
        {children}
      </span>
    </BadgeContext.Provider>
  );
};

const BadgeIcon = ({ className, children, ...props }: BadgeIconProps) => {
  const { variant } = useContext(BadgeContext);
  const iconClassName = cn(
    styles.iconContainer, 
    styles[`${variant}Icon`],
    className
  );

  return (
    <span className={iconClassName} {...props}>
      {children}
    </span>
  );
};

export { Badge, BadgeIcon, type BadgeProps, type BadgeIconProps };
