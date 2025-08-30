"use client";

import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@/registry/brook/ui/alert/alert";
import { CheckCircle } from "lucide-react";

export default function AlertSuccess() {
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Alert variant="success">
        <AlertIcon>
          <CheckCircle size={16} />
        </AlertIcon>
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your account has been created successfully.</AlertDescription>
      </Alert>
    </div>
  );
}
