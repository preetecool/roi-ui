"use client";

import { Mail } from "lucide-react";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/registry/brook/ui/alert/alert";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./alert-demo.module.css";

export default function AlertDemo() {
  return (
    <div className={styles.container}>
      <Alert>
        <Mail size={14} stroke="var(--muted-foreground)" />
        <AlertTitle>New Message</AlertTitle>
        <AlertDescription> You&apos;ve got a new message.</AlertDescription>
        <AlertAction>
          <Button size="sm" variant="secondary">
            View Inbox
          </Button>
        </AlertAction>
      </Alert>
    </div>
  );
}
