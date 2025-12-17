"use client";

import { Ban } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/registry/brook/ui/alert/alert";
import styles from "./alert-destructive.module.css";

export default function AlertDestructive() {
  return (
    <div className={styles.container}>
      <Alert variant="destructive">
        <Ban size={16} />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </Alert>
    </div>
  );
}
