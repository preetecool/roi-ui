"use client";

import { Mail } from "lucide-react";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/registry/brook/tailwind/ui/alert";
import { Button } from "@/registry/brook/tailwind/ui/button";

export default function AlertDemo() {
  return (
    <div className="flex w-full justify-center">
      <Alert>
        <Mail size={14} stroke="var(--muted-foreground)" />
        <AlertTitle>New Message</AlertTitle>
        <AlertDescription> You&apos;ve got a new message.</AlertDescription>
        <AlertAction>
          <Button size="sm" variant="secondary">
            View Inbox
          </Button>
        </AlertAction>
      </Alert>
    </div>
  );
}
