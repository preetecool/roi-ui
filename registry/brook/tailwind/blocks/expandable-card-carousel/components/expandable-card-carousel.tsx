"use client";
import { ExpandableCard, type ExpandableCardItem } from "@/registry/brook/tailwind/ui/expandable-card";
import { Carousel } from "@/registry/brook/tailwind/ui/carousel";

type CardData = {
  id: number;
  imageSrc: string;
  cardHeading: string;
  alt: string;
  paragraphs: string[];
};

type ExpandableCardCarouselProps = {
  data: {
    cards: CardData[];
  };
};

export function ExpandableCardCarousel({ data }: ExpandableCardCarouselProps) {
  const items: ExpandableCardItem[] = data.cards.map((card) => ({
    id: card.id,
    imageSrc: card.imageSrc,
    cardHeading: card.cardHeading,
    alt: card.alt,
    content: (
      <div className="[&_p]:mb-4 [&_p:last-child]:mb-0">
        {card.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    ),
  }));

  return (
    <div className="w-full max-w-full py-6">
      <header className="mb-8 flex flex-col items-start gap-6 px-4 md:flex-row md:items-baseline md:justify-between min-[1100px]:mx-auto min-[1100px]:max-w-[1008px] min-[1100px]:px-0">
        <h2 className="m-0 text-[clamp(1.875rem,5vw,2.75rem)] font-medium leading-[1.3] tracking-[-0.02em] text-[var(--foreground)] md:text-[clamp(2rem,5vw,3rem)]">
          Our Three Core
          <br />
          Philosophies
        </h2>
        <p className="m-0 max-w-[360px] text-left text-base text-[var(--muted-foreground)]">
          The principles that guide everything we create, from design decisions to the experiences we craft for our users.
        </p>
      </header>
      <Carousel.Bleed className="min-[1100px]:!static min-[1100px]:!mx-0 min-[1100px]:!w-auto min-[1100px]:flex min-[1100px]:justify-center">
        <Carousel.Root align="start" className="min-[1100px]:w-auto" gap={24} totalItems={items.length} variant="inset">
          <Carousel.Viewport>
            <Carousel.Content className="h-[50vh] items-center justify-center">
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
