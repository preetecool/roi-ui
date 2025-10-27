"use client";

import {
  BarChart,
  Cloud,
  Lock,
  Palette,
  Plus,
  RefreshCw,
  Settings,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/registry/brook/tailwind/ui/button";
import {
  Card,
  CardDescription,
  CardIcon,
  CardTitle,
} from "@/registry/brook/tailwind/ui/card";
import { Carousel } from "@/registry/brook/tailwind/ui/carousel";

export default function CarouselDemo() {
  const features = [
    {
      id: "performance",
      icon: <Zap strokeWidth={1.5} />,
      title: "Performance",
      description:
        "Instant loading and millisecond response times for optimal user experience.",
    },
    {
      id: "security",
      icon: <Shield strokeWidth={1.5} />,
      title: "Security",
      description:
        "Bank-level encryption keeps your data protected and compliant.",
    },
    {
      id: "customization",
      icon: <Palette strokeWidth={1.5} />,
      title: "Customize",
      description:
        "Tailor every aspect to match your brand with flexible theming and configuration options.",
    },
    {
      id: "collaboration",
      icon: <Users strokeWidth={1.5} />,
      title: "Collaboration",
      description:
        "Work together seamlessly with real-time collaboration tools.",
    },
    {
      id: "analytics",
      icon: <BarChart strokeWidth={1.5} />,
      title: "Analytics",
      description:
        "Gain actionable insights with comprehensive dashboards and reporting.",
    },
    {
      id: "cloud",
      icon: <Cloud strokeWidth={1.5} />,
      title: "Integration",
      description:
        "Connect with popular cloud services and scale automatically.",
    },
    {
      id: "privacy",
      icon: <Lock strokeWidth={1.5} />,
      title: "Privacy",
      description:
        "Your data stays yours. Full control over privacy settings and data ownership.",
    },
    {
      id: "sync",
      icon: <RefreshCw strokeWidth={1.5} />,
      title: "Sync",
      description: "Changes sync instantly across all devices in real-time.",
    },
    {
      id: "configuration",
      icon: <Settings strokeWidth={1.5} />,
      title: "Configuration",
      description:
        "Simple setup and intuitive controls get you running in minutes, not hours.",
    },
  ];

  return (
    <Carousel.Bleed>
      <Carousel.Root
        align="start"
        gap={8}
        totalItems={features.length}
        variant="inset"
      >
        <Carousel.Viewport>
          <Carousel.Content>
            {features.map((feature, index) => (
              <Carousel.Item index={index} key={feature.id}>
                <Card
                  className="h-[300px] w-[330px] relative p-4 border-[0.5px] border-[color:oklch(from_var(--color-border)_l_c_h_/_0.5)] flex flex-col
                    bg-gradient-to-br from-[color:var(--mix-card-66-bg)] via-[color:var(--color-background)] to-[color:var(--color-background)]
                    max-md:max-w-[230px] max-sm:h-[340px] max-sm:max-w-[280px] max-sm:p-4"
                >
                  <div className="flex-1 flex items-start justify-start">
                    <CardIcon className="bg-[color:var(--mix-card-66-bg)] border-[color:var(--color-border)] text-[color:var(--color-muted-foreground)]">
                      {feature.icon}
                    </CardIcon>
                  </div>
                  <div className="h-1/2 grid grid-cols-[1fr_auto] p-4 -m-[1rem] mt-0 gap-4 border-t-[0.5px] border-[color:oklch(from_var(--color-border)_l_c_h_/_0.5)] max-sm:p-4">
                    <div className="flex flex-col gap-2 max-sm:gap-1.5">
                      <CardTitle className="m-0 text-lg max-sm:text-[1.0625rem]">
                        {feature.title}
                      </CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </div>
                    <Button
                      className="relative w-9 h-9 rounded-full flex-shrink-0 p-1 self-end text-[color:var(--color-muted-foreground)]
                        border-[0.5px] border-[color:oklch(from_var(--color-border)_l_c_h_/_0.5)]
                        hover:text-[color:var(--color-foreground)] hit-area-extend"
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
          <Carousel.Previous
            className="relative w-10 h-10 rounded-full border-[0.5px] border-[color:oklch(from_var(--color-border)_l_c_h_/_0.8)]
              bg-[color:var(--color-card)] text-[color:var(--color-foreground)] cursor-pointer flex items-center justify-center
              shadow-[var(--shadow-md)] transition-all duration-200 ease-[var(--ease-out-quad)] opacity-90
              hover:opacity-100 hover:bg-[color:var(--color-muted)] hover:scale-105
              focus-visible:outline-2 focus-visible:outline-[color:var(--color-ring)] focus-visible:outline-offset-2
              active:scale-95
              disabled:opacity-30 disabled:cursor-default disabled:bg-[color:var(--color-muted)] disabled:text-[color:var(--color-muted-foreground)] disabled:pointer-events-none
              disabled:hover:opacity-30 disabled:hover:scale-100 disabled:hover:bg-[color:var(--color-muted)]
              motion-reduce:transition-none [&_svg]:w-4 [&_svg]:h-4"
          />
          <Carousel.Next
            className="relative w-10 h-10 rounded-full border-[0.5px] border-[color:oklch(from_var(--color-border)_l_c_h_/_0.8)]
              bg-[color:var(--color-card)] text-[color:var(--color-foreground)] cursor-pointer flex items-center justify-center
              shadow-[var(--shadow-md)] transition-all duration-200 ease-[var(--ease-out-quad)] opacity-90
              hover:opacity-100 hover:bg-[color:var(--color-muted)] hover:scale-105
              focus-visible:outline-2 focus-visible:outline-[color:var(--color-ring)] focus-visible:outline-offset-2
              active:scale-95
              disabled:opacity-30 disabled:cursor-default disabled:bg-[color:var(--color-muted)] disabled:text-[color:var(--color-muted-foreground)] disabled:pointer-events-none
              disabled:hover:opacity-30 disabled:hover:scale-100 disabled:hover:bg-[color:var(--color-muted)]
              motion-reduce:transition-none [&_svg]:w-4 [&_svg]:h-4"
          />
        </Carousel.Navigation>
      </Carousel.Root>
    </Carousel.Bleed>
  );
}
