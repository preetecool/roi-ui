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

const NavigationMenuFooter = ({
  className,
  children,
  title,
  buttonText,
  buttonHref,
  onButtonClick,
  horizontal = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  horizontal?: boolean;
}) => {
  if (horizontal && title && buttonText) {
    return (
      <div className={cn(styles.footer, styles.horizontalFooter, className)} {...props}>
        <div className={styles.footerTitle}>{title}</div>
        <NavigationMenuLink
          href={buttonHref}
          onClick={onButtonClick}
          className={styles.footerButton}
        >
          {buttonText}
          <NavigationMenuIcon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </NavigationMenuIcon>
        </NavigationMenuLink>
      </div>
    );
  }

  return (
    <div className={cn(styles.footer, className)} {...props}>
      {children}
    </div>
  );
};

export {
  NavigationMenuRoot as NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuViewport,
  NavigationMenuLink,
  NavigationMenuLinkItem,
  NavigationMenuFooter,
  NavigationMenuIcon,
  NavigationMenuArrow,
  NavigationMenuPositioner,
  NavigationMenuPortal,
};
