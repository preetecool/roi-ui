"use client";

import {
  BarChart,
  Cloud,
  Lock,
  Palette,
  RefreshCw,
  Settings,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/registry/brook/ui/button/button";
import {
  Card,
  CardDescription,
  CardIcon,
  CardTitle,
} from "@/registry/brook/ui/card/card";
import { Carousel } from "@/registry/brook/ui/carousel/carousel";
import styles from "./carousel-demo.module.css";

const DESKTOP_BREAKPOINT = 1024;
const TABLET_BREAKPOINT = 768;
const DESKTOP_ITEMS_PER_VIEW = 3.1;
const TABLET_ITEMS_PER_VIEW = 2.5;
const MOBILE_ITEMS_PER_VIEW = 1.2;

export default function CarouselDemo() {
  const features = [
    {
      id: "performance",
      icon: <Zap className={styles.icon} />,
      title: "Performance",
      description:
        "Instant loading and millisecond response times for optimal user experience.",
    },
    {
      id: "security",
      icon: <Shield className={styles.icon} />,
      title: "Security",
      description:
        "Bank-level encryption keeps your data protected and compliant.",
    },
    {
      id: "customization",
      icon: <Palette className={styles.icon} />,
      title: "Customize",
      description:
        "Tailor every aspect to match your brand with flexible theming and configuration options.",
    },
    {
      id: "collaboration",
      icon: <Users className={styles.icon} />,
      title: "Collaboration",
      description:
        "Work together seamlessly with real-time collaboration tools.",
    },
    {
      id: "analytics",
      icon: <BarChart className={styles.icon} />,
      title: "Analytics",
      description:
        "Gain actionable insights with comprehensive dashboards and reporting.",
    },
    {
      id: "cloud",
      icon: <Cloud className={styles.icon} />,
      title: "Integration",
      description:
        "Connect with popular cloud services and scale automatically.",
    },
    {
      id: "privacy",
      icon: <Lock className={styles.icon} />,
      title: "Privacy",
      description:
        "Your data stays yours. Full control over privacy settings and data ownership.",
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
      description:
        "Simple setup and intuitive controls get you running in minutes, not hours.",
    },
  ];

  const [itemsPerView, setItemsPerView] = useState<number | null>(null);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        setItemsPerView(DESKTOP_ITEMS_PER_VIEW);
      } else if (window.innerWidth >= TABLET_BREAKPOINT) {
        setItemsPerView(TABLET_ITEMS_PER_VIEW);
      } else {
        setItemsPerView(MOBILE_ITEMS_PER_VIEW);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);

    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  if (itemsPerView === null) {
    return <div className={styles.placeholder} />;
  }

  return (
    <Carousel gap={16} itemsPerView={itemsPerView}>
      <Carousel.Viewport>
        <Carousel.Content>
          {features.map((feature, index) => (
            <Carousel.Item index={index} key={feature.id}>
              <Card id={styles.card}>
                <div className={styles.cardContent}>
                  <CardIcon>{feature.icon}</CardIcon>
                  <CardTitle className={styles.cardTitle}>
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </div>
                <div className={styles.buttonContainer}>
                  <Button className={styles.button} showArrow variant="link">
                    Learn More
                  </Button>
                </div>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel.Content>
      </Carousel.Viewport>
      <Carousel.Navigation />
      <Carousel.SRInfo />
      <Carousel.KeyboardHandler />
    </Carousel>
  );
}
