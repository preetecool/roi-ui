"use client";

import { Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/registry/brook/ui/alert/alert";
import styles from "./alert-info.module.css";

export default function AlertInfo() {
  return (
    <div className={styles.container}>
      <Alert variant="info">
        <Info size={16} />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>New features are available! Check out the latest updates.</AlertDescription>
      </Alert>
    </div>
  );
}
