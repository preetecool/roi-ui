"use client";
import { NavigationMenu } from "@base-ui-components/react/navigation-menu";
import { cn } from "@/lib/utils";
import styles from "./navigation-menu.module.css";

function NavigationMenuRoot({
  className,
  ...props
}: NavigationMenu.Root.Props) {
  return (
    <NavigationMenu.Root data-slot="navigationmenu-root" className={cn(styles.root, className)} {...props} />
  );
}

function NavigationMenuList({
  className,
  ...props
}: NavigationMenu.List.Props) {
  return (
    <NavigationMenu.List data-slot="navigationmenu-list" className={cn(styles.list, className)} {...props} />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: NavigationMenu.Item.Props) {
  return <NavigationMenu.Item className={cn(className)} {...props} />;
}

function NavigationMenuTrigger({
  className,
  ...props
}: NavigationMenu.Trigger.Props) {
  return (
    <NavigationMenu.Trigger
      data-slot="navigationmenu-trigger"
      className={cn(styles.trigger, className)}
      {...props}
    />
  );
}

function NavigationMenuContent({
  className,
  ...props
}: NavigationMenu.Content.Props) {
  return (
    <NavigationMenu.Content
      data-slot="navigationmenu-content"
      className={cn(styles.content, className)}
      {...props}
    />
  );
}

function NavigationMenuIcon({
  className,
  ...props
}: NavigationMenu.Icon.Props) {
  return (
    <NavigationMenu.Icon data-slot="navigationmenu-icon" className={cn(styles.chevron, className)} {...props} />
  );
}

function NavigationMenuLink({
  className,
  ...props
}: NavigationMenu.Link.Props) {
  return (
    <NavigationMenu.Link data-slot="navigationmenu-link" className={cn(styles.link, className)} {...props} />
  );
}

function NavigationMenuPortal({
  children,
  ...props
}: NavigationMenu.Portal.Props) {
  return <NavigationMenu.Portal {...props}>{children}</NavigationMenu.Portal>;
}

function NavigationMenuBackdrop({
  className,
  ...props
}: NavigationMenu.Backdrop.Props) {
  return (
    <NavigationMenu.Backdrop
      data-slot="navigationmenu-backdrop"
      className={cn(styles.backdrop, className)}
      {...props}
    />
  );
}

function NavigationMenuPositioner({
  className,
  children,
  ...props
}: NavigationMenu.Positioner.Props) {
  return (
    <NavigationMenu.Positioner
      data-slot="navigationmenu-positioner"
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
}: NavigationMenu.Popup.Props) {
  return (
    <NavigationMenu.Popup className={cn(styles.popup, className)} {...props}>
      {children}
    </NavigationMenu.Popup>
  );
}

function NavigationMenuArrow({
  className,
  ...props
}: NavigationMenu.Arrow.Props) {
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
}: NavigationMenu.Viewport.Props) {
  return (
    <NavigationMenu.Viewport
      data-slot="navigationmenu-viewport"
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
