"use client";

import { useRender } from "@base-ui-components/react/use-render";
import { useControlled } from "@base-ui-components/utils/useControlled";
import { createContext, useContext, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import styles from "./sidebar.module.css";

type SidebarContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  side: "left" | "right";
};

const SidebarContext = createContext<SidebarContextValue | undefined>(
  undefined
);

/**
 * Hook to access sidebar context
 *
 * @example
 * ```tsx
 * const { open, setOpen, side } = useSidebar();
 * ```
 */
function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("Sidebar components must be used within SidebarProvider");
  }
  return context;
}

// Hook for focus management
function useFocusTrap(
  ref: React.RefObject<HTMLElement | null>,
  isActive: boolean,
  onClose: () => void
) {
  useEffect(() => {
    if (!(isActive && ref.current)) {
      return;
    }

    const element = ref.current;
    const focusableSelector =
      'a[href], button:not([disabled]), textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])';

    const focusableElements = Array.from(
      element.querySelectorAll<HTMLElement>(focusableSelector)
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements.at(-1);

    // Focus first element
    firstFocusable?.focus();

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Tab":
          handleTabKey(e);
          break;

        case "Escape":
          onClose();
          break;

        default:
          break;
      }
    };

    element.addEventListener("keydown", handleKeyDown);

    return () => {
      element.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, isActive, onClose]);
}

// Hook for focus restoration
function useRestoreFocus(isOpen: boolean) {
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;
    } else if (previousFocus.current) {
      previousFocus.current.focus();
    }
  }, [isOpen]);
}

/**
 * SidebarProvider - Handles collapsible state
 *
 * This is the root component that manages the sidebar's state and provides
 * context to all child components.
 *
 * @param open - Controlled open state
 * @param defaultOpen - Default open state for uncontrolled mode
 * @param onOpenChange - Callback when open state changes
 *
 * @example
 * ```tsx
 * <SidebarProvider defaultOpen={false}>
 *   <Sidebar side="left">
 *     <SidebarHeader>...</SidebarHeader>
 *     <SidebarContent>...</SidebarContent>
 *     <SidebarFooter>...</SidebarFooter>
 *   </Sidebar>
 * </SidebarProvider>
 * ```
 */
function SidebarProvider({
  children,
  className,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  ...props
}: React.ComponentProps<"div"> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = useControlled({
    controlled: controlledOpen,
    default: defaultOpen,
    name: "SidebarProvider",
    state: "open",
  });

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  useEffect(() => {
    // Prevent body scroll when sidebar is open
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <SidebarContext.Provider
      value={{ open, setOpen: handleOpenChange, side: "left" }}
    >
      <div
        className={cn(styles.provider, className)}
        data-slot="sidebar-provider"
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

/**
 * Sidebar - The sidebar container
 *
 * This is the main sidebar panel that slides in and out.
 *
 * @param side - Which side the sidebar appears on ("left" or "right")
 * @param modal - Whether the sidebar should act as a modal (with focus trap). Defaults to false for persistent sidebars.
 *
 * @example
 * ```tsx
 * <Sidebar side="left">
 *   <SidebarHeader>...</SidebarHeader>
 *   <SidebarContent>...</SidebarContent>
 * </Sidebar>
 * ```
 */
function Sidebar({
  className,
  children,
  side = "left",
  modal = false,
  ...props
}: React.ComponentProps<"aside"> & {
  side?: "left" | "right";
  modal?: boolean;
}) {
  const { open, setOpen } = useSidebar();
  const sidebarRef = useRef<HTMLElement>(null);

  // Only enable focus trap and restore focus for modal sidebars
  useFocusTrap(sidebarRef, modal && open, () => setOpen(false));
  useRestoreFocus(modal && open);

  const commonProps = {
    className: cn(styles.sidebar, className),
    "data-side": side,
    "data-slot": "sidebar",
    "data-state": open ? "open" : "closed",
    ...props,
  };

  if (modal) {
    return (
      <div
        aria-modal="true"
        role="dialog"
        {...commonProps}
        ref={sidebarRef as React.Ref<HTMLDivElement>}
      >
        {children}
      </div>
    );
  }

  return (
    <aside {...commonProps} ref={sidebarRef as React.Ref<HTMLElement>}>
      {children}
    </aside>
  );
}

/**
 * SidebarTrigger - Trigger for the Sidebar
 *
 * Button to toggle the sidebar open/closed.
 * Supports polymorphism via the `render` prop.
 *
 * @example
 * ```tsx
 * <SidebarTrigger>Open Menu</SidebarTrigger>
 * ```
 */
function SidebarTrigger({
  render,
  className,
  onClick,
  ...props
}: useRender.ComponentProps<"button">) {
  const { open, setOpen } = useSidebar();

  return useRender({
    defaultTagName: "button",
    render,
    props: {
      ...props,
      type: "button",
      "data-slot": "sidebar-trigger",
      "data-state": open ? "open" : "closed",
      className: cn(styles.trigger, className),
      "aria-expanded": open,
      "aria-label": props["aria-label"] || "Toggle sidebar",
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        setOpen(!open);
      },
    },
  });
}

/**
 * SidebarHeader - Sticky header at the top of the sidebar
 *
 * @example
 * ```tsx
 * <SidebarHeader>
 *   <h2>Navigation</h2>
 *   <SidebarClose />
 * </SidebarHeader>
 * ```
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
 *
 * Contains the main sidebar content with automatic overflow handling.
 *
 * @example
 * ```tsx
 * <SidebarContent>
 *   <SidebarGroup>
 *     <nav>...</nav>
 *   </SidebarGroup>
 * </SidebarContent>
 * ```
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
 * SidebarGroup - Section within the SidebarContent
 *
 * Groups related navigation items together.
 *
 * @example
 * ```tsx
 * <SidebarGroup>
 *   <h3>Main Menu</h3>
 *   <nav>...</nav>
 * </SidebarGroup>
 * ```
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
 * SidebarFooter - Sticky footer at the bottom of the sidebar
 *
 * @example
 * ```tsx
 * <SidebarFooter>
 *   <button>Settings</button>
 * </SidebarFooter>
 * ```
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
 * SidebarClose - Close button for the sidebar
 *
 * Supports polymorphism via the `render` prop.
 *
 * @example
 * ```tsx
 * <SidebarClose />
 * ```
 */
function SidebarClose({
  render,
  className,
  onClick,
  children,
  ...props
}: useRender.ComponentProps<"button">) {
  const { setOpen } = useSidebar();

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
        setOpen(false);
      },
      children: children || defaultIcon,
    },
  });
}

/**
 * SidebarMenu - List container for sidebar menu items
 *
 * @example
 * ```tsx
 * <SidebarMenu>
 *   <SidebarMenuItem>
 *     <SidebarMenuButton>Home</SidebarMenuButton>
 *   </SidebarMenuItem>
 * </SidebarMenu>
 * ```
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
 * SidebarMenuItem - Individual menu item container
 *
 * @example
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton>Dashboard</SidebarMenuButton>
 *   <SidebarMenuAction>
 *     <MoreIcon />
 *   </SidebarMenuAction>
 * </SidebarMenuItem>
 * ```
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
 *
 * Supports polymorphism via the `render` prop.
 *
 * @param isActive - Whether this menu item is currently active
 *
 * @example
 * ```tsx
 * <SidebarMenuButton isActive={true}>
 *   <HomeIcon />
 *   <span>Home</span>
 * </SidebarMenuButton>
 *
 * // As a link
 * <SidebarMenuButton render={<a href="/" />}>
 *   <span>Home</span>
 * </SidebarMenuButton>
 * ```
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
 *
 * Typically used for secondary actions like edit, delete, etc.
 * Supports polymorphism via the `render` prop.
 *
 * @example
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton>Projects</SidebarMenuButton>
 *   <SidebarMenuAction>
 *     <MoreVerticalIcon />
 *   </SidebarMenuAction>
 * </SidebarMenuItem>
 * ```
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

export {
  Sidebar,
  SidebarClose,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
};
