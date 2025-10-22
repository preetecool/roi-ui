"use client";

import { useRender } from "@base-ui-components/react/use-render";
import { useControlled } from "@base-ui-components/utils/useControlled";
import type { CSSProperties } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import styles from "./sidebar.module.css";

const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextValue = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextValue | undefined>(
  undefined
);

/**
 * Hook to access sidebar context
 */
function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("Sidebar components must be used within SidebarProvider");
  }
  return context;
}

/**
 * SidebarProvider - Manages sidebar state for both mobile and desktop
 */
function SidebarProvider({
  children,
  className,
  style,
  open: controlledOpen,
  defaultOpen = true,
  onOpenChange,
  ...props
}: React.ComponentProps<"div"> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);

  const [open, setOpen] = useControlled({
    controlled: controlledOpen,
    default: defaultOpen,
    name: "SidebarProvider",
    state: "open",
  });

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen);
      onOpenChange?.(newOpen);
    },
    [setOpen, onOpenChange]
  );

  const toggleSidebar = useCallback(
    () =>
      isMobile ? setOpenMobile((isOpen) => !isOpen) : handleOpenChange(!open),
    [isMobile, handleOpenChange, open]
  );

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // Prevent body scroll on mobile when sidebar is open
  useEffect(() => {
    if (isMobile && openMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, openMobile]);

  const state = open ? "expanded" : "collapsed";

  const contextValue = useMemo<SidebarContextValue>(
    () => ({
      state,
      open,
      setOpen: handleOpenChange,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, handleOpenChange, isMobile, openMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        className={cn(styles.wrapper, className)}
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

/**
 * Sidebar - Main sidebar component
 */
function Sidebar({
  className,
  children,
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  ...props
}: React.ComponentProps<"aside"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}) {
  const { isMobile, state, openMobile, setOpenMobile, toggleSidebar } =
    useSidebar();
  const [isHovering, setIsHovering] = useState(false);

  // Reset hover state when sidebar expands
  useEffect(() => {
    if (state === "expanded") {
      setIsHovering(false);
    }
  }, [state]);

  if (isMobile) {
    return (
      <div
        aria-modal="true"
        className={cn(styles.mobile, className)}
        data-mobile="true"
        data-slot="sidebar"
        data-state={openMobile ? "open" : "closed"}
        role="dialog"
        {...props}
      >
        {children}
      </div>
    );
  }

  if (collapsible === "none") {
    return (
      <aside
        className={cn(styles.sidebar, className)}
        data-collapsible="none"
        data-slot="sidebar"
        {...props}
      >
        {children}
      </aside>
    );
  }

  return (
    <div
      className={cn(styles.desktop, className)}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-hover={state === "collapsed" && isHovering ? "true" : "false"}
      data-side={side}
      data-slot="sidebar-desktop"
      data-state={state}
      data-variant={variant}
    >
      {/* Sidebar gap - takes up space in the layout */}
      <div className={styles.gap} data-slot="sidebar-gap" />

      {/* Hover trigger area when collapsed */}
      {state === "collapsed" && collapsible === "offcanvas" && (
        <div
          aria-hidden="true"
          className={styles.hoverTrigger}
          data-slot="sidebar-hover-trigger"
          onMouseEnter={() => setIsHovering(true)}
        />
      )}

      {/* Fixed sidebar container */}
      <div
        className={styles.container}
        data-slot="sidebar-container"
        onMouseLeave={() => setIsHovering(false)}
        role="none"
      >
        <aside
          className={cn(styles.sidebar, className)}
          data-slot="sidebar"
          {...props}
        >
          {children}
        </aside>
      </div>

      {/* Rail for hover trigger */}
      {collapsible === "offcanvas" && (
        <button
          aria-label="Toggle Sidebar"
          className={styles.rail}
          data-slot="sidebar-rail"
          onClick={toggleSidebar}
          tabIndex={-1}
          type="button"
        />
      )}
    </div>
  );
}

/**
 * SidebarTrigger - Button to toggle sidebar
 */
function SidebarTrigger({
  render,
  className,
  onClick,
  ...props
}: useRender.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar();

  return useRender({
    defaultTagName: "button",
    render,
    props: {
      ...props,
      type: "button",
      "data-slot": "sidebar-trigger",
      className: cn(styles.trigger, className),
      "aria-label": props["aria-label"] || "Toggle sidebar",
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        toggleSidebar();
      },
    },
  });
}

/**
 * SidebarRail - Hover trigger at the edge of collapsed sidebar
 */
function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      aria-label="Toggle Sidebar"
      className={cn(styles.rail, className)}
      data-slot="sidebar-rail"
      onClick={toggleSidebar}
      tabIndex={-1}
      type="button"
      {...props}
    />
  );
}

/**
 * SidebarHeader - Sticky header at the top
 */
function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(styles.header, className)}
      data-slot="sidebar-header"
      {...props}
    />
  );
}

/**
 * SidebarContent - Scrollable content area
 */
function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(styles.content, className)}
      data-slot="sidebar-content"
      {...props}
    />
  );
}

/**
 * SidebarGroup - Section within content
 */
function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(styles.group, className)}
      data-slot="sidebar-group"
      {...props}
    />
  );
}

/**
 * SidebarGroupLabel - Label for a group
 */
function SidebarGroupLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(styles.groupLabel, className)}
      data-slot="sidebar-group-label"
      {...props}
    />
  );
}

/**
 * SidebarGroupContent - Content wrapper for a group
 */
function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(styles.groupContent, className)}
      data-slot="sidebar-group-content"
      {...props}
    />
  );
}

/**
 * SidebarFooter - Sticky footer at the bottom
 */
function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(styles.footer, className)}
      data-slot="sidebar-footer"
      {...props}
    />
  );
}

/**
 * SidebarClose - Close button
 */
function SidebarClose({
  render,
  className,
  onClick,
  children,
  ...props
}: useRender.ComponentProps<"button">) {
  const { setOpen, setOpenMobile, isMobile } = useSidebar();

  const defaultIcon = (
    <svg
      aria-hidden="true"
      fill="none"
      height="16"
      viewBox="0 0 24 24"
      width="16"
    >
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );

  return useRender({
    defaultTagName: "button",
    render,
    props: {
      ...props,
      type: "button",
      "data-slot": "sidebar-close",
      className: cn(styles.close, className),
      "aria-label": props["aria-label"] || "Close sidebar",
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (isMobile) {
          setOpenMobile(false);
        } else {
          setOpen(false);
        }
      },
      children: children || defaultIcon,
    },
  });
}

/**
 * SidebarMenu - List container for menu items
 */
function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn(styles.menu, className)}
      data-slot="sidebar-menu"
      {...props}
    />
  );
}

/**
 * SidebarMenuItem - Individual menu item
 */
function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      className={cn(styles.menuItem, className)}
      data-slot="sidebar-menu-item"
      {...props}
    />
  );
}

/**
 * SidebarMenuButton - Button for menu items
 */
function SidebarMenuButton({
  render,
  className,
  isActive = false,
  ...props
}: useRender.ComponentProps<"button"> & {
  isActive?: boolean;
}) {
  return useRender({
    defaultTagName: "button",
    render,
    props: {
      ...props,
      type: "button",
      "data-slot": "sidebar-menu-button",
      "data-active": isActive ? "" : undefined,
      className: cn(
        styles.menuButton,
        isActive && styles.menuButtonActive,
        className
      ),
    },
  });
}

/**
 * SidebarMenuAction - Action button for menu items
 */
function SidebarMenuAction({
  render,
  className,
  ...props
}: useRender.ComponentProps<"button">) {
  return useRender({
    defaultTagName: "button",
    render,
    props: {
      ...props,
      type: "button",
      "data-slot": "sidebar-menu-action",
      className: cn(styles.menuAction, className),
    },
  });
}

/**
 * SidebarMenuSub - Submenu container
 */
function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn(styles.menuSub, className)}
      data-slot="sidebar-menu-sub"
      {...props}
    />
  );
}

/**
 * SidebarMenuSubItem - Submenu item
 */
function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      className={cn(styles.menuSubItem, className)}
      data-slot="sidebar-menu-sub-item"
      {...props}
    />
  );
}

/**
 * SidebarMenuSubButton - Button for submenu items
 */
function SidebarMenuSubButton({
  render,
  className,
  isActive = false,
  ...props
}: useRender.ComponentProps<"a"> & {
  isActive?: boolean;
}) {
  return useRender({
    defaultTagName: "a",
    render,
    props: {
      ...props,
      "data-slot": "sidebar-menu-sub-button",
      "data-active": isActive ? "" : undefined,
      className: cn(
        styles.menuSubButton,
        isActive && styles.menuSubButtonActive,
        className
      ),
    },
  });
}

export {
  Sidebar,
  SidebarClose,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
};
