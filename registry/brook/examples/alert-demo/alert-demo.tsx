"use client";

import { Mail } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/brook/ui/alert/alert";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./alert-demo.module.css";

export default function AlertDemo() {
  return (
    <div className={styles.container}>
      <Alert>
        <Mail />
        <AlertTitle>New Message</AlertTitle>
        <AlertDescription> You&apos;ve got a new message.</AlertDescription>
        <div className={styles.buttonContainer}>
          <Button size="sm">View Inbox</Button>
        </div>
      </Alert>
    </div>
  );
}
