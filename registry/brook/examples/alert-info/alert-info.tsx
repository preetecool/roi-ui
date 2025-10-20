"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/brook/ui/alert/alert";
import { Info } from "lucide-react";
import styles from "./alert-info.module.css";

export default function AlertInfo() {
  return (
    <div className={styles.container}>
      <Alert variant="info">
        <Info />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>
          New features are available! Check out the latest updates.
        </AlertDescription>
      </Alert>
    </div>
  );
}
