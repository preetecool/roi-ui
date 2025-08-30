"use client";

import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@/registry/brook/ui/alert/alert";
import { Info } from "lucide-react";

export default function AlertInfo() {
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Alert variant="info">
        <AlertIcon>
          <Info size={16} />
        </AlertIcon>
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>New features are available! Check out the latest updates.</AlertDescription>
      </Alert>
    </div>
  );
}
