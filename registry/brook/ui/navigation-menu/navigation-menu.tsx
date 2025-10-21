"use client";

import { NavigationMenu } from "@base-ui-components/react/navigation-menu";
import { cn } from "@/lib/utils";
import styles from "./navigation-menu.module.css";

function NavigationMenuRoot({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Root>) {
  return (
    <NavigationMenu.Root className={cn(styles.root, className)} {...props} />
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.List>) {
  return (
    <NavigationMenu.List className={cn(styles.list, className)} {...props} />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Item>) {
  return (
    <NavigationMenu.Item className={cn(styles.item, className)} {...props} />
  );
}

function NavigationMenuTrigger({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Trigger>) {
  return (
    <NavigationMenu.Trigger
      className={cn(styles.trigger, className)}
      {...props}
    />
  );
}

const NavigationMenuPortal = NavigationMenu.Portal;

function NavigationMenuIcon({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Icon>) {
  return (
    <NavigationMenu.Icon className={cn(styles.chevron, className)} {...props} />
  );
}

function NavigationMenuArrow({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Arrow>) {
  return (
    <NavigationMenu.Arrow className={cn(styles.arrow, className)} {...props}>
      <svg
        aria-hidden="true"
        fill="none"
        height="8"
        viewBox="0 0 16 8"
        width="16"
      >
        <path className={styles.arrowFill} d="M8 0L16 8H0L8 0Z" />
        <path
          className={styles.arrowOuterStroke}
          d="M8 0L16 8H0L8 0Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    </NavigationMenu.Arrow>
  );
}

function NavigationMenuPositioner({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Positioner>) {
  return (
    <NavigationMenu.Positioner
      className={cn(styles.positioner, className)}
      {...props}
    />
  );
}

function NavigationMenuPopup({
  className,
  children,
  showArrow = true,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Popup> & {
  showArrow?: boolean;
}) {
  return (
    <NavigationMenu.Popup className={cn(styles.popup, className)} {...props}>
      {showArrow && (
        <NavigationMenu.Arrow className={cn(styles.arrow)}>
          <svg
            aria-hidden="true"
            fill="none"
            height="8"
            viewBox="0 0 16 8"
            width="16"
          >
            <path className={styles.arrowFill} d="M8 0L16 8H0L8 0Z" />
            <path
              className={styles.arrowOuterStroke}
              d="M8 0L0 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              className={styles.arrowOuterStroke}
              d="M8 0L16 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </NavigationMenu.Arrow>
      )}
      <NavigationMenu.Viewport className={styles.viewport}>
        {children}
      </NavigationMenu.Viewport>
    </NavigationMenu.Popup>
  );
}

function NavigationMenuViewport({
  className,
  children,
  showArrow = false,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Positioner> & {
  showArrow?: boolean;
}) {
  return (
    <NavigationMenuPortal>
      <NavigationMenuPositioner className={className} {...props}>
        <NavigationMenuPopup showArrow={showArrow}>
          {children}
        </NavigationMenuPopup>
      </NavigationMenuPositioner>
    </NavigationMenuPortal>
  );
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Content>) {
  return (
    <NavigationMenu.Content
      className={cn(styles.content, className)}
      {...props}
    />
  );
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Link>) {
  return (
    <NavigationMenu.Link className={cn(styles.link, className)} {...props} />
  );
}

function NavigationMenuLinkItem({
  className,
  title,
  description,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Link> & {
  title?: string;
  description?: string;
}) {
  return (
    <NavigationMenu.Link className={cn(styles.linkCard, className)} {...props}>
      <div>
        {title && <div className={styles.linkTitle}>{title}</div>}
        {description && (
          <div className={styles.linkDescription}>{description}</div>
        )}
      </div>
      {children}
    </NavigationMenu.Link>
  );
}

export {
  NavigationMenuRoot as NavigationMenu,
  NavigationMenuArrow,
  NavigationMenuContent,
  NavigationMenuIcon,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuLinkItem,
  NavigationMenuList,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuViewport,
};
