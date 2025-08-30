"use client";

import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@/registry/brook/ui/alert/alert";
import { Mail } from "lucide-react";

export default function AlertDemo() {
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Alert>
        <AlertIcon>
          <Mail size={16} />
        </AlertIcon>
        <AlertTitle>New Msg</AlertTitle>
        <AlertDescription> You&apos;ve got a new message.</AlertDescription>
      </Alert>
    </div>
  );
}
