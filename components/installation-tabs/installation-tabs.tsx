"use client";

import {
  Tabs,
  TabsList as BaseTabsList,
  TabsTrigger as BaseTabsTrigger,
  TabsContent as BaseTabsContent,
} from "@/registry/brook/ui/tabs/tabs";
import styles from "./installation-tabs.module.css";

interface InstallationTabsProps {
  children: React.ReactNode;
}

export function InstallationTabs({ children }: InstallationTabsProps) {
  return <Tabs defaultValue="cli">{children}</Tabs>;
}

export function InstallationTabsList({ children, ...props }: React.ComponentProps<typeof BaseTabsList>) {
  return (
    <BaseTabsList
      style={{ backgroundColor: "transparent", border: "none", padding: 0, gap: "1.5rem", marginBottom: "1.5rem" }}
      {...props}
    >
      {children}
    </BaseTabsList>
  );
}

export function InstallationTabsTrigger({ children, ...props }: React.ComponentProps<typeof BaseTabsTrigger>) {
  return (
    <BaseTabsTrigger
      style={{
        backgroundColor: "transparent",
        border: "none",
        padding: "0 0 0.25rem 0",
        borderBottom: "2px solid transparent",
        borderRadius: 0,
      }}
      className={styles.trigger}
      {...props}
    >
      {children}
    </BaseTabsTrigger>
  );
}

export function InstallationTabsContent({ children, value, ...props }: React.ComponentProps<typeof BaseTabsContent>) {
  const className = value === "manual" ? styles.manual : undefined;
  return (
    <BaseTabsContent
      style={{ margin: 0, border: "none", padding: 0, backgroundColor: "transparent" }}
      className={className}
      value={value}
      data-manual={value === "manual" ? "true" : undefined}
      {...props}
    >
      {children}
    </BaseTabsContent>
  );
}
