import { Tabs } from "@base-ui-components/react/tabs";
import { cn } from "@/lib/utils";
import styles from "./tabs.module.css";

function TabsRoot({
  className,
  ...props
}: Tabs.Root.Props) {
  return <Tabs.Root className={cn(styles.root, className)} {...props} />;
}

function TabsList({
  className,
  ...props
}: Tabs.List.Props) {
  return <Tabs.List className={cn(styles.list, className)} {...props} />;
}

function TabsTrigger({
  className,
  ...props
}: Tabs.Tab.Props) {
  return <Tabs.Tab className={cn(styles.trigger, className)} {...props} />;
}

function TabsContent({
  className,
  ...props
}: Tabs.Panel.Props) {
  return <Tabs.Panel className={cn(styles.content, className)} {...props} />;
}

function TabsIndicator({
  className,
  ...props
}: Tabs.Indicator.Props) {
  return (
    <Tabs.Indicator data-slot="tabs-indicator" className={cn(styles.indicator, className)} {...props} />
  );
}

export { TabsRoot as Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger };
