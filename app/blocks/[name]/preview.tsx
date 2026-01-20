"use client";

import AiChat from "@/registry/brook/blocks/ai-chat/page";
import CardImageSection from "@/registry/brook/blocks/card-image-section/page";
import CardLogin from "@/registry/brook/blocks/card-login/page";
import CardTask from "@/registry/brook/blocks/card-task/page";
import CardTraffic from "@/registry/brook/blocks/card-traffic/page";
import ExpandableCardCarousel from "@/registry/brook/blocks/expandable-card-carousel/page";
import KanbanBoard from "@/registry/brook/blocks/kanban-board/page";
import PricingSection from "@/registry/brook/blocks/pricing-section/page";

type BlockPreviewProps = {
  name: string;
};

const blocks: Record<string, React.ComponentType> = {
  "ai-chat": AiChat,
  "card-image-section": CardImageSection,
  "card-login": CardLogin,
  "card-task": CardTask,
  "card-traffic": CardTraffic,
  "expandable-card-carousel": ExpandableCardCarousel,
  "kanban-board": KanbanBoard,
  "pricing-section": PricingSection,
};

export function BlockPreview({ name }: BlockPreviewProps) {
  const Component = blocks[name];

  if (!Component) {
    return <div>Component not found</div>;
  }

  return <Component />;
}
