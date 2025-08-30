import { Tabs } from "@base-ui-components/react/tabs";
import { cn } from "@/lib/utils";
import styles from "./tabs.module.css";

const TabsRoot = ({ className, ...props }: React.ComponentProps<typeof Tabs.Root>) => (
  <Tabs.Root className={cn(styles.root, className)} {...props}></Tabs.Root>
);

const TabsList = ({ className, ...props }: React.ComponentProps<typeof Tabs.List>) => (
  <Tabs.List className={cn(styles.list, className)} {...props} />
);

const TabsTrigger = ({ className, ...props }: React.ComponentProps<typeof Tabs.Tab>) => (
  <Tabs.Tab className={cn(styles.trigger, className)} {...props} />
);

const TabsContent = ({ className, ...props }: React.ComponentProps<typeof Tabs.Panel>) => (
  <Tabs.Panel className={cn(styles.content, className)} {...props} />
);

const TabsIndicator = ({ className, ...props }: React.ComponentProps<typeof Tabs.Indicator>) => (
  <Tabs.Indicator className={cn(styles.indicator, className)} {...props} />
);

export { TabsRoot as Tabs, TabsList, TabsTrigger, TabsContent, TabsIndicator };
