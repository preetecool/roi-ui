"use client";

import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@/registry/brook/ui/alert/alert";
import { Ban } from "lucide-react";
import styles from "./alert-destructive.module.css";

export default function AlertDestructive() {
  return (
    <div className={styles.container}>
      <Alert variant="destructive">
        <AlertIcon>
          <Ban size={16} />
        </AlertIcon>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </Alert>
    </div>
  );
}
