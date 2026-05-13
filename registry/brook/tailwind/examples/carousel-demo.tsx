"use client";

import { Palette, Plus, Shield, Users, Zap } from "lucide-react";
import { Button } from "@/registry/brook/tailwind/ui/button";
import { Card, CardDescription, CardIcon, CardTitle } from "@/registry/brook/tailwind/ui/card";
import { Carousel } from "@/registry/brook/tailwind/ui/carousel";

export default function CarouselDemo() {
  const features = [
    {
      id: "performance",
      icon: <Zap strokeWidth={1.5} />,
      title: "Performance",
      description: "Instant loading and millisecond response times for optimal user experience.",
    },
    {
      id: "security",
      icon: <Shield strokeWidth={1.5} />,
      title: "Security",
      description: "Bank-level encryption keeps your data protected and compliant.",
    },
    {
      id: "customization",
      icon: <Palette strokeWidth={1.5} />,
      title: "Customize",
      description: "Tailor every aspect to match your brand with flexible theming and configuration options.",
    },
    {
      id: "collaboration",
      icon: <Users strokeWidth={1.5} />,
      title: "Collaboration",
      description: "Work together seamlessly with real-time collaboration tools.",
    },
  ];

  return (
    <Carousel.Root align="start" gap={8} totalItems={features.length} variant="inset">
      <Carousel.Viewport>
        <Carousel.Content>
          {features.map((feature, index) => (
            <Carousel.Item index={index} key={feature.id}>
              <Card className="relative flex h-[300px] w-[330px] flex-col [background:linear-gradient(135deg,var(--mix-card-66-bg)_0%,var(--background)_50%)] !p-4 max-sm:h-[340px] max-sm:max-w-[280px] max-md:max-w-[230px]">
                <div className="flex flex-1 items-start justify-start">
                  <CardIcon className="border-[color:var(--border)] !bg-[color:var(--mix-card-66-bg)] text-[color:var(--muted-foreground)]">
                    {feature.icon}
                  </CardIcon>
                </div>
                <div className="-m-[1rem] mt-0 grid h-1/2 grid-cols-[1fr_auto] gap-4 border-[color:oklch(from_var(--border)_l_c_h_/_0.5)] border-t-[0.5px] p-4">
                  <div className="flex flex-col gap-2 max-sm:gap-1.5">
                    <CardTitle className="m-0 !text-lg leading-none max-sm:!text-[1.0625rem]">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </div>
                  <Button
                    className="hit-area-extend relative h-9 w-9 flex-shrink-0 self-end rounded-full p-1 text-[color:var(--muted-foreground)] shadow-[0_0_0_0.5px_oklch(from_var(--border)_l_c_h_/_0.5)] dark:shadow-[0_0_0_0.5px_oklch(from_var(--border)_l_c_h_/_0.5)] hover:text-[color:var(--foreground)]"
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
  );
}
