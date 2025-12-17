"use client";

import { CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/registry/brook/tailwind/ui/alert";

export default function AlertSuccess() {
  return (
    <div className="flex w-full justify-center">
      <Alert variant="success">
        <CheckCircle size={16} />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your account has been created successfully.</AlertDescription>
      </Alert>
    </div>
  );
}
