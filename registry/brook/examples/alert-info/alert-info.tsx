"use client";

import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@/registry/brook/ui/alert/alert";
import { Info } from "lucide-react";
import styles from "./alert-info.module.css";

export default function AlertInfo() {
  return (
    <div className={styles.container}>
      <Alert variant="info" style={{ backgroundColor: 'color-mix(in oklch, var(--card) 33%, var(--background))' }}>
        <AlertIcon>
          <Info size={16} />
        </AlertIcon>
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>New features are available! Check out the latest updates.</AlertDescription>
      </Alert>
    </div>
  );
}
