"use client";

import { Button } from "@/registry/brook/ui/button/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/brook/ui/tabs/tabs";

export default function TabsVertical() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Tabs defaultValue="account" orientation="vertical">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Account Settings</h3>
            <p className="text-muted-foreground text-sm">
              Make changes to your account here. Click save when you&apos;re
              done.
            </p>
            <div className="flex gap-2">
              <Button size="sm">Save Changes</Button>
              <Button size="sm" variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="password">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Password</h3>
            <p className="text-muted-foreground text-sm">
              Change your password here. After saving, you&apos;ll be logged
              out.
            </p>
            <div className="flex gap-2">
              <Button size="sm">Update Password</Button>
              <Button size="sm" variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="team">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Team Management</h3>
            <p className="text-muted-foreground text-sm">
              Invite and manage your team members here.
            </p>
            <div className="flex gap-2">
              <Button size="sm">Invite Member</Button>
              <Button size="sm" variant="outline">
                Manage Roles
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="billing">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Billing & Usage</h3>
            <p className="text-muted-foreground text-sm">
              View your billing information and payment methods.
            </p>
            <div className="flex gap-2">
              <Button size="sm">Upgrade Plan</Button>
              <Button size="sm" variant="outline">
                Download Invoice
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
