"use client";

import { Kbd } from "@/registry/brook/tailwind/ui/kbd";

export default function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div className="flex items-center gap-2">
        <Kbd size="sm">K</Kbd>
        <Kbd size="md">K</Kbd>
        <Kbd size="lg">K</Kbd>
      </div>
      <div className="flex items-center gap-2">
        <Kbd>⌘</Kbd>
        <span className="text-sm text-[var(--muted-foreground)]">+</span>
        <Kbd>K</Kbd>
      </div>
    </div>
  );
}
