"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/brook/ui/tabs/tabs";
import { Button } from "@/registry/brook/ui/button/button";

export default function TabsVertical() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Tabs defaultValue="account" orientation="vertical">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Account Settings</h3>
            <p className="text-sm text-muted-foreground">
              Make changes to your account here. Click save when you&apos;re done.
            </p>
            <div className="flex gap-2">
              <Button size="sm">Save Changes</Button>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="password">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Password</h3>
            <p className="text-sm text-muted-foreground">
              Change your password here. After saving, you&apos;ll be logged out.
            </p>
            <div className="flex gap-2">
              <Button size="sm">Update Password</Button>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="team">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Team Management</h3>
            <p className="text-sm text-muted-foreground">Invite and manage your team members here.</p>
            <div className="flex gap-2">
              <Button size="sm">Invite Member</Button>
              <Button variant="outline" size="sm">
                Manage Roles
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="billing">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Billing & Usage</h3>
            <p className="text-sm text-muted-foreground">View your billing information and payment methods.</p>
            <div className="flex gap-2">
              <Button size="sm">Upgrade Plan</Button>
              <Button variant="outline" size="sm">
                Download Invoice
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
