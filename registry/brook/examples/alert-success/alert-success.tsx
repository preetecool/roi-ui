"use client";

import { Alert, AlertDescription, AlertTitle } from "@/registry/brook/ui/alert/alert";
import { CheckCircle } from "lucide-react";
import styles from "./alert-success.module.css";

export default function AlertSuccess() {
  return (
    <div className={styles.container}>
      <Alert variant="success">
        <CheckCircle />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your account has been created successfully.</AlertDescription>
      </Alert>
    </div>
  );
}
