"use client";

import { useState } from "react";
import { Field, FieldDescription, FieldLabel } from "@/registry/brook/tailwind/ui/field";
import { Switch, SwitchThumb } from "@/registry/brook/tailwind/ui/switch";

export default function SwitchWithLabel() {
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

  return (
    <form className="flex max-w-[28rem] flex-col gap-6">
      <Field>
        <FieldLabel>
          <Switch checked={subscribeNewsletter} onCheckedChange={setSubscribeNewsletter}>
            <SwitchThumb />
          </Switch>
          <span className="ml-3">Subscribe to newsletter</span>
        </FieldLabel>
        <FieldDescription>Get the latest updates and announcements delivered to your inbox</FieldDescription>
      </Field>
    </form>
  );
}
