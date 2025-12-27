"use client";
import data from "@/registry/brook/blocks-shared-files/expandable-card-carousel/data.json";
import { Carousel } from "@/registry/brook/ui/carousel/carousel";
import { ExpandableCard, type ExpandableCardItem } from "@/registry/brook/ui/expandable-card/expandable-card";
import styles from "./expandable-card-block.module.css";

const items: ExpandableCardItem[] = data.cards.map((card) => ({
  id: card.id,
  imageSrc: card.imageSrc,
  cardHeading: card.cardHeading,
  alt: card.alt,
  content: (
    <div className={styles.content}>
      {card.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  ),
}));

export default function Page() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h2 className={styles.heading}>
          Our Three Core
          <br />
          Philosophies
        </h2>
        <p className={styles.description}>
          The principles that guide everything we create, from design decisions to the experiences we craft for our
          users.
        </p>
      </header>
      <Carousel.Bleed className={styles.bleed}>
        <Carousel.Root align="start" className={styles.carouselRoot} gap={24} totalItems={items.length} variant="inset">
          <Carousel.Viewport>
            <Carousel.Content>
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
