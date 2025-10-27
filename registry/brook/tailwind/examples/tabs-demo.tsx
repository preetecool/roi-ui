"use client";

import { Button } from "@/registry/brook/tailwind/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/brook/tailwind/ui/tabs";

const tabs = [
  { id: "account", label: "Account" },
  { id: "password", label: "Password" },
  { id: "team", label: "Team" },
];

export default function TabsBasic() {
  return (
    <div className="mx-auto w-full max-w-[32rem]">
      <Tabs defaultValue="account">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="account">
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-semibold text-lg leading-7">
                Account Settings
              </h3>
              <p className="text-muted-foreground text-sm leading-5">
                Make changes to your account here. Click save when you&apos;re
                done.
              </p>
            </div>
            <div className="flex gap-2 max-[640px]:flex-col">
              <Button size="sm">Save Changes</Button>
              <Button size="sm" variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="password">
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-semibold text-lg leading-7">Password</h3>
              <p className="text-muted-foreground text-sm leading-5">
                Change your password here. After saving, you&apos;ll be logged
                out.
              </p>
            </div>
            <div className="flex gap-2 max-[640px]:flex-col">
              <Button size="sm">Update Password</Button>
              <Button size="sm" variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="team">
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-semibold text-lg leading-7">
                Team Management
              </h3>
              <p className="text-muted-foreground text-sm leading-5">
                Invite and manage your team members here.
              </p>
            </div>
            <div className="flex gap-2 max-[640px]:flex-col">
              <Button size="sm">Invite Member</Button>
              <Button size="sm" variant="outline">
                Manage Roles
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
