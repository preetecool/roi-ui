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
  return <NavigationMenu.Item className={cn(className)} {...props} />;
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

function NavigationMenuIcon({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Icon>) {
  return (
    <NavigationMenu.Icon className={cn(styles.chevron, className)} {...props} />
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

function NavigationMenuPortal({
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Portal>) {
  return <NavigationMenu.Portal {...props}>{children}</NavigationMenu.Portal>;
}

function NavigationMenuBackdrop({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Backdrop>) {
  return (
    <NavigationMenu.Backdrop
      className={cn(styles.backdrop, className)}
      {...props}
    />
  );
}

function NavigationMenuPositioner({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Positioner>) {
  return (
    <NavigationMenu.Positioner
      className={cn(styles.positioner, className)}
      {...props}
    >
      {children}
    </NavigationMenu.Positioner>
  );
}

function NavigationMenuPopup({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Popup>) {
  return (
    <NavigationMenu.Popup className={cn(styles.popup, className)} {...props}>
      {children}
    </NavigationMenu.Popup>
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
  );
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Viewport>) {
  return (
    <NavigationMenu.Viewport
      className={cn(styles.viewport, className)}
      {...props}
    />
  );
}

export {
  NavigationMenuRoot as NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuIcon,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuPortal,
  NavigationMenuBackdrop,
  NavigationMenuPositioner,
  NavigationMenuPopup,
  NavigationMenuArrow,
  NavigationMenuViewport,
};
