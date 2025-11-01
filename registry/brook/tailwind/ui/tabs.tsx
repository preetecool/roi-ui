import { Tabs } from "@base-ui-components/react/tabs";
import { cn } from "@/lib/tw-utils";

function TabsRoot({ className, ...props }: Tabs.Root.Props) {
  return (
    <Tabs.Root
      className={cn(
        "flex flex-col gap-0 data-[orientation=vertical]:flex-row data-[orientation=vertical]:gap-4",
        className
      )}
      data-slot="tabs-root"
      {...props}
    />
  );
}

function TabsList({ className, ...props }: Tabs.List.Props) {
  return (
    <Tabs.List
      className={cn(
        "flex items-center justify-start rounded-[var(--radius)] bg-[var(--mix-card-33-bg)]",
        "rounded-br-none rounded-bl-none border-[0.5px] border-[oklch(from_var(--color-border)_l_c_h_/_0.8)]",
        "scrollbar-none gap-1 overflow-x-auto p-1 [-ms-overflow-style:none]",
        "[&::-webkit-scrollbar]:hidden",
        "data-[orientation=vertical]:w-[200px] data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
        className
      )}
      data-slot="tabs-list"
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: Tabs.Tab.Props) {
  return (
    <Tabs.Tab
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius)]",
        "bg-transparent px-3 py-1.5 font-[450] text-[var(--color-muted-foreground)] text-sm leading-[1.375]",
        "relative mr-1 flex-shrink-0 cursor-pointer border-[0.5px] border-transparent",
        "max-sm:text-[0.8125rem]",
        "hover:text-[var(--color-foreground)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-ring)]",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[selected]:border data-[selected]:border-[var(--color-border)] data-[selected]:bg-[var(--color-muted)] data-[selected]:text-[var(--color-foreground)]",
        "data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start",
        className
      )}
      data-slot="tabs-tab"
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: Tabs.Panel.Props) {
  return (
    <Tabs.Panel
      className={cn(
        "mt-0 rounded-[0_0_var(--radius)_var(--radius)] border-[0.5px] border-[oklch(from_var(--color-border)_l_c_h_/_0.8)]",
        "border-t-0 bg-[var(--mix-card-33-bg)] p-6",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-ring)]",
        "data-[orientation=vertical]:mt-0 data-[orientation=vertical]:flex-1",
        "data-[state=inactive]:hidden",
        "data-[state=active]:block",
        "[&_p]:m-0",
        className
      )}
      data-slot="tabs-panel"
      {...props}
    />
  );
}

function TabsIndicator({ className, ...props }: Tabs.Indicator.Props) {
  return (
    <Tabs.Indicator
      className={cn(
        "absolute rounded-[var(--radius)] bg-primary transition-all duration-150 ease-in-out",
        "top-[calc(var(--active-tab-top)+var(--active-tab-height)-3px)] left-[var(--active-tab-left)]",
        "h-[3px] w-[var(--active-tab-width)]",
        className
      )}
      data-slot="tabs-indicator"
      {...props}
    />
  );
}

export { TabsRoot as Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger };
