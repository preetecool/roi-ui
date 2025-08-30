"use client";

import { useState } from "react";
import { Switch, SwitchThumb } from "@/registry/brook/ui/switch/switch";
import { Field, FieldLabel, FieldDescription } from "@/registry/brook/ui/field/field";

export default function SwitchWithLabel() {
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

  return (
    <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "28rem" }}>
      <Field>
        <FieldLabel>
          <Switch checked={subscribeNewsletter} onCheckedChange={setSubscribeNewsletter}>
            <SwitchThumb />
          </Switch>
          <span style={{ marginLeft: "0.75rem" }}>Subscribe to newsletter</span>
        </FieldLabel>
        <FieldDescription>Get the latest updates and announcements delivered to your inbox</FieldDescription>
      </Field>
    </form>
  );
}
