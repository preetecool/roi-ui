"use client";

import { NavigationMenu } from "@base-ui-components/react/navigation-menu";
import { cn } from "@/lib/utils";
import styles from "./navigation-menu.module.css";

const NavigationMenuRoot = ({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Root>) => (
  <NavigationMenu.Root className={cn(styles.root, className)} {...props} />
);

const NavigationMenuList = ({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.List>) => (
  <NavigationMenu.List className={cn(styles.list, className)} {...props} />
);

const NavigationMenuItem = ({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Item>) => (
  <NavigationMenu.Item className={cn(styles.item, className)} {...props} />
);

const NavigationMenuTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Trigger>) => {
  return <NavigationMenu.Trigger className={cn(styles.trigger, className)} {...props} />;
};

const NavigationMenuPortal = NavigationMenu.Portal;

const NavigationMenuIcon = ({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Icon>) => (
  <NavigationMenu.Icon className={cn(styles.chevron, className)} {...props} />
);

const NavigationMenuArrow = ({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Arrow>) => (
  <NavigationMenu.Arrow className={cn(styles.arrow, className)} {...props}>
    <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
      <path
        d="M8 0L16 8H0L8 0Z"
        className={styles.arrowFill}
      />
      <path
        d="M8 0L16 8H0L8 0Z"
        className={styles.arrowOuterStroke}
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  </NavigationMenu.Arrow>
);

const NavigationMenuPositioner = ({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Positioner>) => (
  <NavigationMenu.Positioner className={cn(styles.positioner, className)} {...props} />
);

const NavigationMenuPopup = ({
  className,
  children,
  showArrow = true,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Popup> & {
  showArrow?: boolean;
}) => (
  <NavigationMenu.Popup className={cn(styles.popup, className)} {...props}>
    {showArrow && (
      <NavigationMenu.Arrow className={cn(styles.arrow)}>
        <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
          <path
            d="M8 0L16 8H0L8 0Z"
            className={styles.arrowFill}
          />
          <path
            d="M8 0L0 8"
            className={styles.arrowOuterStroke}
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M8 0L16 8"
            className={styles.arrowOuterStroke}
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </NavigationMenu.Arrow>
    )}
    <NavigationMenu.Viewport className={styles.viewport}>{children}</NavigationMenu.Viewport>
  </NavigationMenu.Popup>
);

const NavigationMenuViewport = ({
  className,
  children,
  showArrow = true,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Positioner> & {
  showArrow?: boolean;
}) => (
  <NavigationMenuPortal>
    <NavigationMenuPositioner className={className} {...props}>
      <NavigationMenuPopup showArrow={showArrow}>{children}</NavigationMenuPopup>
    </NavigationMenuPositioner>
  </NavigationMenuPortal>
);

const NavigationMenuContent = ({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Content>) => (
  <NavigationMenu.Content className={cn(styles.content, className)} {...props} />
);

const NavigationMenuLink = ({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Link>) => (
  <NavigationMenu.Link className={cn(styles.link, className)} {...props} />
);

const NavigationMenuLinkItem = ({
  className,
  title,
  description,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Link> & {
  title?: string;
  description?: string;
}) => (
  <NavigationMenu.Link className={cn(styles.linkCard, className)} {...props}>
    <div>
      {title && <div className={styles.linkTitle}>{title}</div>}
      {description && <div className={styles.linkDescription}>{description}</div>}
    </div>
    {children}
  </NavigationMenu.Link>
);

export {
  NavigationMenuRoot as NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuViewport,
  NavigationMenuLink,
  NavigationMenuLinkItem,
  NavigationMenuIcon,
  NavigationMenuArrow,
  NavigationMenuPositioner,
  NavigationMenuPortal,
};
