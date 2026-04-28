"use client";

import { Ban } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/registry/brook/tailwind/ui/alert";

export default function AlertDestructive() {
  return (
    <div className="flex w-full justify-center">
      <Alert icon={<Ban />} variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </Alert>
    </div>
  );
}
