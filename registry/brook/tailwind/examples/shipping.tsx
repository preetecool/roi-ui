"use client";

import { MessageCircle, Phone, Truck } from "lucide-react";
import { cn } from "@/lib/tw-utils";
import { Badge, BadgeIcon } from "@/registry/brook/tailwind/ui/badge";
import { Button } from "@/registry/brook/tailwind/ui/button";
import { Card } from "@/registry/brook/tailwind/ui/card";

function getTimelineStatus(item: {
  completed?: boolean;
  current?: boolean;
}): string {
  if (item.completed) {
    return "bg-foreground border-foreground";
  }
  if (item.current) {
    return "bg-primary border-primary shadow-[0_0_0_2px_oklch(var(--primary)/0.2)]";
  }
  return "bg-background border-border";
}

export function Shipping() {
  const shipmentData = {
    id: "SHP-1312023",
    driver: "John Doe",
    status: "En Route",
    estimatedTime: "2 Hrs 15 Min",
    timeline: [
      {
        company: "Harris Transportation",
        time: "Aug, 20, 11:00 EST",
        completed: true,
      },
      {
        company: "Main Paper Company",
        time: "Aug, 20, 16:00 EST",
        current: false,
      },
    ],
  };

  return (
    <div className="relative max-h-[250px] w-full max-[640px]:max-h-none">
      <Card
        className="flex h-full flex-col gap-4 border border-border p-4"
        style={{ backgroundColor: "var(--mix-card-33-bg)" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-foreground text-sm">
              {shipmentData.id}
            </div>
            <div className="text-muted-foreground text-xs">
              {shipmentData.driver}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="success">
              <BadgeIcon>
                <Truck size={12} />
              </BadgeIcon>
              {shipmentData.status}
            </Badge>
            <div className="text-muted-foreground text-xs">
              {shipmentData.estimatedTime}
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          {shipmentData.timeline.map((item, index) => (
            <div
              className="flex items-start gap-3"
              key={`${item.company}-${item.time}`}
            >
              <div className="relative flex flex-col items-center">
                <div
                  className={cn(
                    "z-[1] h-3 w-3 rounded-full border-2",
                    getTimelineStatus(item)
                  )}
                />
                {index < shipmentData.timeline.length - 1 && (
                  <div className="mt-0.5 h-12 w-px bg-border" />
                )}
              </div>
              <div className="flex flex-col pt-0.5">
                <div className="font-medium text-foreground text-sm">
                  {item.company}
                </div>
                <div className="text-muted-foreground text-xs">{item.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="-mx-4 h-px bg-border" />

        <div className="flex items-center gap-2">
          <Button
            className="flex h-auto items-center gap-1.5 px-3 py-1.5 text-xs"
            size="sm"
            variant="outline"
          >
            <Phone size={16} />
            Call
          </Button>
          <Button
            className="flex h-auto items-center gap-1.5 px-3 py-1.5 text-xs"
            size="sm"
            variant="outline"
          >
            <MessageCircle size={16} />
            Message
          </Button>
          <Button
            className="ml-auto h-auto px-2 py-1.5 text-muted-foreground text-xs"
            size="sm"
            variant="ghost"
          >
            View Details
          </Button>
        </div>
      </Card>
    </div>
  );
}
