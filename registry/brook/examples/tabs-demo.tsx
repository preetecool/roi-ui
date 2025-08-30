"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/brook/ui/tabs/tabs";
import { Button } from "@/registry/brook/ui/button/button";

const tabs = [
  { id: "account", label: "Account" },
  { id: "password", label: "Password" },
  { id: "team", label: "Team" },
];

export default function TabsBasic() {
  return (
    <div style={{ width: "100%", maxWidth: "32rem", margin: "0 auto" }}>
      <Tabs defaultValue="account">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="account">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  lineHeight: "1.75rem",
                }}
              >
                Account Settings
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  color: "var(--muted-foreground)",
                }}
              >
                Make changes to your account here. Click save when you&apos;re done.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button size="sm">Save Changes</Button>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="password">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  lineHeight: "1.75rem",
                }}
              >
                Password
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  color: "var(--muted-foreground)",
                }}
              >
                Change your password here. After saving, you&apos;ll be logged out.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button size="sm">Update Password</Button>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="team">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  lineHeight: "1.75rem",
                }}
              >
                Team Management
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  color: "var(--muted-foreground)",
                }}
              >
                Invite and manage your team members here.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
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
