"use client";

import { Button } from "@/registry/brook/ui/button/button";
import { Card, CardDescription, CardIcon, CardTitle } from "@/registry/brook/ui/card/card";
import { Carousel } from "@/registry/brook/ui/carousel/carousel";
import { BarChart, Cloud, Lock, Palette, RefreshCw, Settings, Shield, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./carousel-demo.module.css";

export default function CarouselDemo() {
  const features = [
    {
      id: "performance",
      icon: <Zap className={styles.icon} />,
      title: "Performance",
      description: "Instant loading and millisecond response times for optimal user experience.",
    },
    {
      id: "security",
      icon: <Shield className={styles.icon} />,
      title: "Security",
      description: "Bank-level encryption keeps your data protected and compliant.",
    },
    {
      id: "customization",
      icon: <Palette className={styles.icon} />,
      title: "Customize",
      description: "Tailor every aspect to match your brand with flexible theming and configuration options.",
    },
    {
      id: "collaboration",
      icon: <Users className={styles.icon} />,
      title: "Collaboration",
      description: "Work together seamlessly with real-time collaboration tools.",
    },
    {
      id: "analytics",
      icon: <BarChart className={styles.icon} />,
      title: "Analytics",
      description: "Gain actionable insights with comprehensive dashboards and reporting.",
    },
    {
      id: "cloud",
      icon: <Cloud className={styles.icon} />,
      title: "Integration",
      description: "Connect with popular cloud services and scale automatically.",
    },
    {
      id: "privacy",
      icon: <Lock className={styles.icon} />,
      title: "Privacy",
      description: "Your data stays yours. Full control over privacy settings and data ownership.",
    },
    {
      id: "sync",
      icon: <RefreshCw className={styles.icon} />,
      title: "Sync",
      description: "Changes sync instantly across all devices in real-time.",
    },
    {
      id: "configuration",
      icon: <Settings className={styles.icon} />,
      title: "Configuration",
      description: "Simple setup and intuitive controls get you running in minutes, not hours.",
    },
  ];

  const carouselItems = features.map((feature) => ({
    id: feature.id,
    content: (
      <Card id={styles.card}>
        <div className={styles.cardContent}>
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
    <Carousel
      items={carouselItems}
      showIndicators={false}
      showNavigation={true}
      itemsPerView={itemsPerView}
      gap={16}
    />
  );
}
