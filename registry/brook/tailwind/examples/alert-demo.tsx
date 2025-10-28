"use client";

import { Mail } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/brook/tailwind/ui/alert";
import { Button } from "@/registry/brook/ui/button/button";

export default function AlertDemo() {
  return (
    <div className="flex w-full justify-center">
      <Alert>
        <Mail size={14} stroke="var(--muted-foreground)" />
        <AlertTitle>New Message</AlertTitle>
        <AlertDescription> You&apos;ve got a new message.</AlertDescription>
        <div className="col-start-3 row-[1/span_2] flex h-full items-center justify-center max-sm:col-span-full max-sm:row-auto max-sm:mt-2 max-sm:justify-stretch max-sm:[&>*]:w-full">
          <Button size="sm" variant="secondary">
            View Inbox
          </Button>
        </div>
      </Alert>
    </div>
  );
}
