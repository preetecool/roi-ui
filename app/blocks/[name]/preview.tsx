"use client";

import dynamic from "next/dynamic";

type BlockPreviewProps = {
  name: string;
};

const blocks: Record<string, React.ComponentType> = {
  "ai-chat": dynamic(() => import("@/registry/brook/blocks/ai-chat/page")),
  "card-image-section": dynamic(() => import("@/registry/brook/blocks/card-image-section/page")),
  "card-login": dynamic(() => import("@/registry/brook/blocks/card-login/page")),
  "card-progress": dynamic(() => import("@/registry/brook/blocks/card-progress/page")),
  "card-task": dynamic(() => import("@/registry/brook/blocks/card-task/page")),
  "card-traffic": dynamic(() => import("@/registry/brook/blocks/card-traffic/page")),
  "expandable-card-carousel": dynamic(() => import("@/registry/brook/blocks/expandable-card-carousel/page")),
  "expandable-card-spread": dynamic(() => import("@/registry/brook/blocks/expandable-card-spread/page")),
  "kanban-board": dynamic(() => import("@/registry/brook/blocks/kanban-board/page")),
  "pricing-section": dynamic(() => import("@/registry/brook/blocks/pricing-section/page")),
};

export function BlockPreview({ name }: BlockPreviewProps) {
  const Component = blocks[name];

  if (!Component) {
    return <div>Component not found</div>;
  }

  return <Component />;
}
