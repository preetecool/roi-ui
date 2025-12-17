"use client";

import { Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/registry/brook/tailwind/ui/alert";

export default function AlertInfo() {
  return (
    <div className="flex w-full justify-center">
      <Alert variant="info">
        <Info size={16} />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>New features are available! Check out the latest updates.</AlertDescription>
      </Alert>
    </div>
  );
}
