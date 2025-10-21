import { Tabs } from "@base-ui-components/react/tabs";
import { cn } from "@/lib/utils";
import styles from "./tabs.module.css";

function TabsRoot({
  className,
  ...props
}: React.ComponentProps<typeof Tabs.Root>) {
  return <Tabs.Root className={cn(styles.root, className)} {...props} />;
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof Tabs.List>) {
  return <Tabs.List className={cn(styles.list, className)} {...props} />;
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof Tabs.Tab>) {
  return <Tabs.Tab className={cn(styles.trigger, className)} {...props} />;
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof Tabs.Panel>) {
  return <Tabs.Panel className={cn(styles.content, className)} {...props} />;
}

function TabsIndicator({
  className,
  ...props
}: React.ComponentProps<typeof Tabs.Indicator>) {
  return (
    <Tabs.Indicator className={cn(styles.indicator, className)} {...props} />
  );
}

export { TabsRoot as Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger };
