"use client";

import { Button, Spinner } from "@/registry/brook/tailwind/ui/button";

export default function ButtonLoading() {
  return (
    <div className="flex items-center gap-4">
      <Button disabled>
        <Spinner />
        Always Loading
      </Button>
    </div>
  );
}
