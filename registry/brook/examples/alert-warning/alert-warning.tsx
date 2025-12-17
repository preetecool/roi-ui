"use client";

import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/registry/brook/ui/alert/alert";
import styles from "./alert-warning.module.css";

export default function AlertWarning() {
  return (
    <div className={styles.container}>
      <Alert variant="warning">
        <AlertTriangle size={16} />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>
    </div>
  );
}
