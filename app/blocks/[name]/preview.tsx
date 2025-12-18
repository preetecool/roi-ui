"use client";

import { ComponentLoaders } from "@/registry/__loaders__";

type BlockPreviewProps = {
  name: string;
};

export function BlockPreview({ name }: BlockPreviewProps) {
  const Component = ComponentLoaders[name];

  if (!Component) {
    return <div>Component not found</div>;
  }

  return <Component />;
}
