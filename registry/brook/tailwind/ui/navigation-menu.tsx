"use client";
import { NavigationMenu } from "@base-ui-components/react/navigation-menu";
import { cn } from "@/lib/tw-utils";

function NavigationMenuRoot({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Root>) {
  return (
    <NavigationMenu.Root
      className={cn("relative z-[100] flex w-full justify-center", className)}
      {...props}
    />
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.List>) {
  return (
    <NavigationMenu.List
      className={cn(
        "m-0 flex list-none justify-center rounded-lg p-1",
        className
      )}
      {...props}
    />
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
      className={cn(
        "flex cursor-pointer select-none items-center justify-between gap-0.5 rounded-md px-3 py-2 font-normal text-sm leading-none outline-none transition-colors duration-200",
        "hover:bg-[var(--mix-card-33-bg)]",
        "data-[popup-open]:bg-[var(--mix-card-33-bg)]",
        "focus-visible:-outline-offset-1 focus-visible:relative focus-visible:outline-2 focus-visible:outline-[var(--ring)]",
        className
      )}
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
      className={cn(
        "box-border rounded-md bg-gradient-to-b from-[oklch(from_var(--accent)_l_c_h_/_0.1)] to-[oklch(from_var(--accent)_l_c_h_/_0.2)]",
        "h-full w-full",
        "duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]",
        "data-[starting-style][data-activation-direction=left]:animate-[contentEnterFromLeft_150ms]",
        "data-[starting-style][data-activation-direction=right]:animate-[contentEnterFromRight_150ms]",
        "data-[ending-style][data-activation-direction=left]:animate-[contentExitToLeft_150ms]",
        "data-[ending-style][data-activation-direction=right]:animate-[contentExitToRight_150ms]",
        className
      )}
      {...props}
    />
  );
}

function NavigationMenuIcon({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Icon>) {
  return (
    <NavigationMenu.Icon
      className={cn(
        "transition-transform duration-200 ease-out",
        "data-[popup-open]:rotate-180",
        className
      )}
      {...props}
    />
  );
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Link>) {
  return <NavigationMenu.Link className={cn(className)} {...props} />;
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
  return <NavigationMenu.Backdrop className={cn(className)} {...props} />;
}

function NavigationMenuPositioner({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Positioner>) {
  return (
    <NavigationMenu.Positioner
      className={cn(
        "box-border transition-[top,left,right,bottom] duration-[0.25s] ease-[var(--ease-out-expo)]",
        "h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)]",
        "before:absolute before:content-['']",
        "data-[side=top]:before:right-0 data-[side=top]:before:bottom-[-10px] data-[side=top]:before:left-0 data-[side=top]:before:h-[10px]",
        "data-[side=bottom]:before:top-[-10px] data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0 data-[side=bottom]:before:h-[10px]",
        "data-[side=left]:before:top-0 data-[side=left]:before:right-[-10px] data-[side=left]:before:bottom-0 data-[side=left]:before:w-[10px]",
        "data-[side=right]:before:top-0 data-[side=right]:before:bottom-0 data-[side=right]:before:left-[-10px] data-[side=right]:before:w-[10px]",
        "data-[instant]:transition-none",
        className
      )}
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
    <NavigationMenu.Popup
      className={cn(
        "relative box-border overflow-visible rounded-xl bg-[var(--background)] p-2",
        "h-[var(--popup-height)] w-[var(--popup-width)] origin-top-center",
        "shadow-[0_0_0_1px_oklch(from_var(--muted)_l_c_h_/_0.3),0px_1px_1px_oklch(from_var(--muted)_l_c_h_/_0.15),0px_4px_8px_oklch(from_var(--muted)_l_c_h_/_0.15)]",
        "transition-[width_250ms_cubic-bezier(0.22,1,0.36,1),height_250ms_cubic-bezier(0.22,1,0.36,1),opacity_200ms_cubic-bezier(0.22,1,0.36,1),transform_200ms_cubic-bezier(0.22,1,0.36,1)]",
        "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
        "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
        "data-[starting-style][data-activation-direction=left]:animate-[enterFromLeft_150ms_ease]",
        "data-[starting-style][data-activation-direction=right]:animate-[enterFromRight_150ms_ease]",
        "data-[ending-style][data-activation-direction=left]:animate-[exitToLeft_150ms_ease]",
        "data-[ending-style][data-activation-direction=right]:animate-[exitToRight_150ms_ease]",
        className
      )}
      {...props}
    >
      {children}
    </NavigationMenu.Popup>
  );
}

function NavigationMenuArrow({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Arrow>) {
  return (
    <NavigationMenu.Arrow
      className={cn(
        "flex transition-[left] duration-[0.25s] ease-[var(--easing)]",
        "data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
        "data-[side=bottom]:top-[-8px] data-[side=bottom]:rotate-0",
        "data-[side=left]:right-[-13px] data-[side=left]:rotate-90",
        "data-[side=right]:-rotate-90 data-[side=right]:left-[-13px]",
        className
      )}
      {...props}
    >
      <svg
        aria-hidden="true"
        fill="none"
        height="8"
        viewBox="0 0 16 8"
        width="16"
      >
        <path className="fill-[var(--background)]" d="M8 0L16 8H0L8 0Z" />
        <path
          className="stroke-[oklch(from_var(--muted)_l_c_h_/_0.3)]"
          d="M8 0L0 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          className="stroke-[oklch(from_var(--muted)_l_c_h_/_0.3)]"
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
      className={cn("relative h-full w-full overflow-hidden", className)}
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
