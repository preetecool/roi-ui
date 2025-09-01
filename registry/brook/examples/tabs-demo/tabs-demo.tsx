"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/brook/ui/tabs/tabs";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./tabs-demo.module.css";

const tabs = [
  { id: "account", label: "Account" },
  { id: "password", label: "Password" },
  { id: "team", label: "Team" },
];

export default function TabsBasic() {
  return (
    <div className={styles.container}>
      <Tabs defaultValue="account">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="account">
          <div className={styles.tabContent}>
            <div>
              <h3 className={styles.heading}>
                Account Settings
              </h3>
              <p className={styles.description}>
                Make changes to your account here. Click save when you&apos;re done.
              </p>
            </div>
            <div className={styles.buttonGroup}>
              <Button size="sm">Save Changes</Button>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="password">
          <div className={styles.tabContent}>
            <div>
              <h3 className={styles.heading}>
                Password
              </h3>
              <p className={styles.description}>
                Change your password here. After saving, you&apos;ll be logged out.
              </p>
            </div>
            <div className={styles.buttonGroup}>
              <Button size="sm">Update Password</Button>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="team">
          <div className={styles.tabContent}>
            <div>
              <h3 className={styles.heading}>
                Team Management
              </h3>
              <p className={styles.description}>
                Invite and manage your team members here.
              </p>
            </div>
            <div className={styles.buttonGroup}>
              <Button size="sm">Invite Member</Button>
              <Button variant="outline" size="sm">
                Manage Roles
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
