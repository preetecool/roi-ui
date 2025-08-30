"use client";

import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@/registry/brook/ui/alert/alert";
import { AlertTriangle } from "lucide-react";

export default function AlertWarning() {
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
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
