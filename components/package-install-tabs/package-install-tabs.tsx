"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/brook/ui/tabs/tabs";
import styles from "./package-install-tabs.module.css";

interface PackageInstallTabsProps {
  packageName: string;
  children?: React.ReactNode;
}

export function PackageInstallTabs({ packageName }: PackageInstallTabsProps) {
  const packageManagers = [
    {
      name: "npm",
      label: "npm",
      command: `npm install ${packageName}`,
    },
    {
      name: "pnpm",
      label: "pnpm",
      command: `pnpm add ${packageName}`,
    },
  ];

  return (
    <Tabs defaultValue="npm" className={styles.tabs}>
      <TabsList>
        {packageManagers.map((pm) => (
          <TabsTrigger key={pm.name} value={pm.name}>
            {pm.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {packageManagers.map((pm) => (
        <TabsContent key={pm.name} value={pm.name}>
          <pre className={styles.codeBlock}>
            <code className={styles.code}>
              {pm.command}
            </code>
          </pre>
        </TabsContent>
      ))}
    </Tabs>
  );
}