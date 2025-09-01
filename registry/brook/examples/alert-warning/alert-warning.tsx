"use client";

import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@/registry/brook/ui/alert/alert";
import { AlertTriangle } from "lucide-react";
import styles from "./alert-warning.module.css";

export default function AlertWarning() {
  return (
    <div className={styles.container}>
      <Alert variant="warning">
        <AlertIcon>
          <AlertTriangle size={16} />
        </AlertIcon>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>
    </div>
  );
}
