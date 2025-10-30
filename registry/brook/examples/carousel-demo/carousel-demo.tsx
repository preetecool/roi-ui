"use client";

import { Palette, Plus, Shield, Users, Zap } from "lucide-react";
import { Button } from "@/registry/brook/ui/button/button";
import {
  Card,
  CardDescription,
  CardIcon,
  CardTitle,
} from "@/registry/brook/ui/card/card";
import { Carousel } from "@/registry/brook/ui/carousel/carousel";
import styles from "./carousel-demo.module.css";

export default function CarouselDemo() {
  const features = [
    {
      id: "performance",
      icon: <Zap className={styles.icon} strokeWidth={1.5} />,
      title: "Performance",
      description:
        "Instant loading and millisecond response times for optimal user experience.",
    },
    {
      id: "security",
      icon: <Shield className={styles.icon} strokeWidth={1.5} />,
      title: "Security",
      description:
        "Bank-level encryption keeps your data protected and compliant.",
    },
    {
      id: "customization",
      icon: <Palette className={styles.icon} strokeWidth={1.5} />,
      title: "Customize",
      description:
        "Tailor every aspect to match your brand with flexible theming and configuration options.",
    },
    {
      id: "collaboration",
      icon: <Users className={styles.icon} strokeWidth={1.5} />,
      title: "Collaboration",
      description:
        "Work together seamlessly with real-time collaboration tools.",
    },
  ];

  return (
    <Carousel.Bleed>
      <Carousel.Root
        align="start"
        className={styles.carouselRoot}
        gap={8}
        totalItems={features.length}
        variant="inset"
      >
        <Carousel.Viewport>
          <Carousel.Content>
            {features.map((feature, index) => (
              <Carousel.Item index={index} key={feature.id}>
                <Card id={styles.card}>
                  <div className={styles.iconSection}>
                    <CardIcon id={styles.icon}>{feature.icon}</CardIcon>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.contentText}>
                      <CardTitle className={styles.cardTitle}>
                        {feature.title}
                      </CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </div>
                    <Button
                      className={`${styles.button} hit-area-extend`}
                      size="icon"
                      variant="outline"
                    >
                      <Plus strokeWidth={1.5} />
                    </Button>
                  </div>
                </Card>
              </Carousel.Item>
            ))}
          </Carousel.Content>
        </Carousel.Viewport>
        <Carousel.Navigation>
          <Carousel.Previous />
          <Carousel.Next />
        </Carousel.Navigation>
      </Carousel.Root>
    </Carousel.Bleed>
  );
}
