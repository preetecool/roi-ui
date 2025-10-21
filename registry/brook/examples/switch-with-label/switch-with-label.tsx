"use client";

import { useState } from "react";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/brook/ui/field/field";
import { Switch, SwitchThumb } from "@/registry/brook/ui/switch/switch";
import styles from "./switch-with-label.module.css";

export default function SwitchWithLabel() {
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

  return (
    <form className={styles.form}>
      <Field>
        <FieldLabel>
          <Switch
            checked={subscribeNewsletter}
            onCheckedChange={setSubscribeNewsletter}
          >
            <SwitchThumb />
          </Switch>
          <span className={styles.labelText}>Subscribe to newsletter</span>
        </FieldLabel>
        <FieldDescription>
          Get the latest updates and announcements delivered to your inbox
        </FieldDescription>
      </Field>
    </form>
  );
}
