import { Tabs } from "@base-ui-components/react/tabs";
import { cn } from "@/lib/utils";
import styles from "./tabs.module.css";

function TabsRoot({ className, ...props }: Tabs.Root.Props) {
  return (
    <Tabs.Root
      className={cn(styles.root, className)}
      {...props}
      data-slot="tabs-root"
    />
  );
}

function TabsList({ className, ...props }: Tabs.List.Props) {
  return (
    <Tabs.List
      className={cn(styles.list, className)}
      {...props}
      data-slot="tabs-list"
    />
  );
}

function TabsTrigger({ className, ...props }: Tabs.Tab.Props) {
  return (
    <Tabs.Tab
      className={cn(styles.trigger, className)}
      {...props}
      data-slot="tabs-trigger"
    />
  );
}

function TabsContent({ className, ...props }: Tabs.Panel.Props) {
  return (
    <Tabs.Panel
      className={cn(styles.content, className)}
      {...props}
      data-slot="tabs-content"
    />
  );
}

function TabsIndicator({ className, ...props }: Tabs.Indicator.Props) {
  return (
    <Tabs.Indicator
      className={cn(styles.indicator, className)}
      data-slot="tabs-indicator"
      {...props}
    />
  );
}

export { TabsRoot as Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger };
