import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComponentCanvas } from "@/components/canvas/component-canvas";

export const metadata: Metadata = {
  title: "Canvas",
  robots: { index: false },
};

export default function CanvasPage() {
  // Dev-only tool: production builds serve a 404 here.
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }
  return <ComponentCanvas />;
}
