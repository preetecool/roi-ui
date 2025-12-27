"use client";
import { ExpandableCard, type ExpandableCardItem } from "@/registry/brook/tailwind/ui/expandable-card";
import { Carousel } from "@/registry/brook/tailwind/ui/carousel";
import data from "@/registry/brook/blocks-shared-files/expandable-card-carousel/data.json";

const items: ExpandableCardItem[] = data.cards.map((card) => ({
  id: card.id,
  imageSrc: card.imageSrc,
  cardHeading: card.cardHeading,
  alt: card.alt,
  content: (
    <div className="[&_p]:mb-4 [&_p:last-child]:mb-0">
      {card.paragraphs.map((paragraph, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: paragraphs are static
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  ),
}));

export default function Page() {
  return (
    <div className="w-full max-w-full py-6">
      <header className="mx-auto mb-8 flex w-full max-w-[1008px] items-baseline justify-between gap-6">
        <h2 className="m-0 font-medium text-5xl leading-[1.3] text-[var(--foreground)] tracking-[-0.02em]">
          Our Three Core
          <br />
          Philosophies
        </h2>
        <p className="m-0 max-w-[360px] text-left text-sm text-[var(--muted-foreground)]">
          The principles that guide everything we create, from design decisions to the experiences we craft for our users.
        </p>
      </header>
      <Carousel.Bleed>
        <Carousel.Root align="center" gap={24} totalItems={items.length} variant="inset">
          <Carousel.Viewport>
            <Carousel.Content className="justify-center">
              {items.map((item, index) => (
                <Carousel.Item index={index} key={item.id}>
                  <ExpandableCard item={item} />
                </Carousel.Item>
              ))}
            </Carousel.Content>
          </Carousel.Viewport>
        </Carousel.Root>
      </Carousel.Bleed>
    </div>
  );
}
