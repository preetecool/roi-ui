"use client";

import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@/registry/brook/ui/alert/alert";
import { Mail } from "lucide-react";
import styles from "./alert-demo.module.css";

export default function AlertDemo() {
  return (
    <div className={styles.container}>
      <Alert style={{ backgroundColor: 'color-mix(in oklch, var(--card) 33%, var(--background))' }}>
        <AlertIcon>
          <Mail size={16} />
        </AlertIcon>
        <AlertTitle>New Msg</AlertTitle>
        <AlertDescription> You&apos;ve got a new message.</AlertDescription>
      </Alert>
    </div>
  );
}
