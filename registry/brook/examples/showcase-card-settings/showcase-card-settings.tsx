"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/registry/brook/ui/card/card";
import { Switch, SwitchThumb } from "@/registry/brook/ui/switch/switch";
import { Field, FieldLabel, FieldDescription } from "@/registry/brook/ui/field/field";

export function PlaceholderCardBottom() {
  const [notifications, setNotifications] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(true);

  return (
    <Card
      style={{
        height: "100%",
        justifyContent: "space-evenly",
        backgroundColor: "color-mix(in oklch, var(--card) 33%, var(--background))",
      }}
    >
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Configure your preferences and privacy settings</CardDescription>
      </CardHeader>
      <CardContent style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Field>
          <FieldLabel>
            <Switch checked={notifications} onCheckedChange={setNotifications}>
              <SwitchThumb />
            </Switch>
            <span style={{ marginLeft: "0.75rem" }}>Push Notifications</span>
          </FieldLabel>
          <FieldDescription>Receive notifications about important updates</FieldDescription>
        </Field>

        <Field>
          <FieldLabel>
            <Switch checked={analytics} onCheckedChange={setAnalytics}>
              <SwitchThumb />
            </Switch>
            <span style={{ marginLeft: "0.75rem" }}>Analytics & Performance</span>
          </FieldLabel>
          <FieldDescription>Help us improve the product with usage analytics</FieldDescription>
        </Field>

        <Field>
          <FieldLabel>
            <Switch checked={marketing} onCheckedChange={setMarketing}>
              <SwitchThumb />
            </Switch>
            <span style={{ marginLeft: "0.75rem" }}>Marketing Communications</span>
          </FieldLabel>
          <FieldDescription>Receive updates about new features and promotions</FieldDescription>
        </Field>
      </CardContent>
    </Card>
  );
}
