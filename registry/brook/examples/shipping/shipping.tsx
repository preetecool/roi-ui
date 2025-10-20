"use client";

import { Badge, BadgeIcon } from "@/registry/brook/ui/badge/badge";
import { Button } from "@/registry/brook/ui/button/button";
import { Card } from "@/registry/brook/ui/card/card";
import { MessageCircle, Phone, Truck } from "lucide-react";

import styles from "./shipping.module.css";

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
    <div className={styles.cardContainer}>
      <Card
        className={styles.shippingCard}
        style={{ backgroundColor: "var(--mix-card-33-bg)" }}
      >
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.shipmentId}>{shipmentData.id}</div>
            <div className={styles.driver}>{shipmentData.driver}</div>
          </div>
          <div className={styles.headerRight}>
            <Badge className={styles.statusBadge} variant="success">
              <BadgeIcon>
                <Truck className={styles.statusIcon} size={12} />
              </BadgeIcon>
              {shipmentData.status}
            </Badge>
            <div className={styles.estimatedTime}>
              {shipmentData.estimatedTime}
            </div>
          </div>
        </div>

        <div className={styles.timeline}>
          {shipmentData.timeline.map((item, index) => (
            <div className={styles.timelineItem} key={index}>
              <div className={styles.timelineIndicator}>
                <div
                  className={`${styles.timelineCircle} ${
                    item.completed
                      ? styles.completed
                      : item.current
                        ? styles.current
                        : styles.pending
                  }`}
                />
                {index < shipmentData.timeline.length - 1 && (
                  <div className={styles.timelineLine} />
                )}
              </div>
              <div className={styles.timelineContent}>
                <div className={styles.companyName}>{item.company}</div>
                <div className={styles.timelineTime}>{item.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.separator} />

        <div className={styles.actions}>
          <Button className={styles.actionButton} size="sm" variant="outline">
            <Phone size={16} />
            Call
          </Button>
          <Button className={styles.actionButton} size="sm" variant="outline">
            <MessageCircle size={16} />
            Message
          </Button>
          <Button className={styles.viewDetails} size="sm" variant="ghost">
            View Details
          </Button>
        </div>
      </Card>
    </div>
  );
}
