"use client";

import { useStyle } from "@/components/providers/style-provider";
import { BlockLoaders } from "@/registry/__block-loaders__";

type BlockPreviewProps = {
  name: string;
};

export function BlockPreview({ name }: BlockPreviewProps) {
  const { style } = useStyle();
  const Component = BlockLoaders[`${name}${style === "tailwind" ? "-tailwind" : ""}`];

  if (!Component) {
    return <div>Component not found</div>;
  }

  return <Component />;
}
