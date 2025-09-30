"use client";

import { useState, useEffect } from "react";
import { Carousel } from "@/registry/brook/ui/carousel/carousel";
import { Card, CardTitle, CardDescription, CardIcon } from "@/registry/brook/ui/card/card";
import { Button } from "@/registry/brook/ui/button/button";
import { Waves, Droplets, Mountain, TreePine, Fish, Compass, Map, Anchor, Wind } from "lucide-react";
import styles from "./carousel-demo.module.css";

export default function CarouselDemo() {
  const features = [
    {
      id: "brook",
      icon: <Droplets className={styles.icon} />,
      title: "Brook",
      description: "A small, natural stream of fresh water flowing along a course towards a river, lake, or sea.",
    },
    {
      id: "stream",
      icon: <Waves className={styles.icon} />,
      title: "Stream",
      description: "A small narrow river that flows continuously in one direction, often through valleys and plains.",
    },
    {
      id: "creek",
      icon: <Fish className={styles.icon} />,
      title: "Creek",
      description:
        "A narrow waterway smaller than a river, often found in wooded areas and feeding into larger bodies of water.",
    },
    {
      id: "river",
      icon: <Map className={styles.icon} />,
      title: "River",
      description:
        "A large flowing body of water that usually empties into a sea or ocean, carved by centuries of erosion.",
    },
    {
      id: "lake",
      icon: <Mountain className={styles.icon} />,
      title: "Lake",
      description:
        "A large body of water surrounded by land, formed by glacial activity, volcanic action, or river damming.",
    },
    {
      id: "pond",
      icon: <TreePine className={styles.icon} />,
      title: "Pond",
      description:
        "A small body of still water formed naturally or artificially, often supporting diverse aquatic life.",
    },
    {
      id: "inlet",
      icon: <Compass className={styles.icon} />,
      title: "Inlet",
      description: "A narrow strip of water that extends into land from a larger body of water like a sea or lake.",
    },
    {
      id: "bay",
      icon: <Anchor className={styles.icon} />,
      title: "Bay",
      description:
        "A broad inlet of the sea where the land curves inward, providing shelter for boats and marine life.",
    },
    {
      id: "fjord",
      icon: <Wind className={styles.icon} />,
      title: "Fjord",
      description: "An inlet of the sea between cliffs, typically formed by glacial erosion in mountainous regions.",
    },
  ];

  const carouselItems = features.map((feature) => ({
    id: feature.id,
    content: (
      <Card className={styles.card} style={{ backgroundColor: 'color-mix(in oklch, var(--card) 33%, var(--background))' }}>
        <div>
          <CardIcon>{feature.icon}</CardIcon>

          <CardTitle className={styles.cardTitle}>{feature.title}</CardTitle>
          <CardDescription>{feature.description}</CardDescription>
        </div>
        <div className={styles.buttonContainer}>
          <Button variant="link" showArrow className={styles.button}>
            Learn More
          </Button>
        </div>
      </Card>
    ),
  }));

  const [itemsPerView, setItemsPerView] = useState<number | null>(null);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3.1); // Desktop: more compact
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2.5); // Tablet: medium compact
      } else {
        setItemsPerView(1.2); // Mobile: less compact
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);

    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  if (itemsPerView === null) {
    return <div className={styles.placeholder} />; // Placeholder with expected height
  }

  return (
    <Carousel items={carouselItems} showIndicators={false} showNavigation={true} itemsPerView={itemsPerView} gap={16} />
  );
}
