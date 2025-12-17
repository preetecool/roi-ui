"use client";

import { Ban } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/registry/brook/tailwind/ui/alert";

export default function AlertDestructive() {
  return (
    <div className="flex w-full justify-center">
      <Alert variant="destructive">
        <Ban size={16} />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </Alert>
    </div>
  );
}
