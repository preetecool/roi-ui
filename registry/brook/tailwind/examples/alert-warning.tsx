"use client";

import { AlertTriangle } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/brook/tailwind/ui/alert";

export default function AlertWarning() {
  return (
    <div className="flex w-full justify-center">
      <Alert variant="warning">
        <AlertTriangle size={16} />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>
    </div>
  );
}
