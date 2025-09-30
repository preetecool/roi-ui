"use client";

import { Card } from "@/registry/brook/ui/card/card";
import { Truck, Phone, MessageCircle } from "lucide-react";
import { Badge, BadgeIcon } from "@/registry/brook/ui/badge/badge";
import { Button } from "@/registry/brook/ui/button/button";

import styles from "./showcase-shipping.module.css";

export function ShowcaseShipping() {
  const shipmentData = {
    id: "SHP-1312023",
    driver: "John Doe",
    status: "En Route",
    estimatedTime: "2 Hrs 15 Min",
    timeline: [
      { company: "Harris Transportation", time: "Aug, 20, 11:00 EST", completed: true },
      { company: "Main Paper Company", time: "Aug, 20, 16:00 EST", current: false },
    ],
  };

  return (
    <div className={styles.cardContainer}>
      <Card
        className={styles.shippingCard}
        style={{ backgroundColor: "color-mix(in oklch, var(--card) 33%, var(--background))" }}
      >
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.shipmentId}>{shipmentData.id}</div>
            <div className={styles.driver}>{shipmentData.driver}</div>
          </div>
          <div className={styles.headerRight}>
            <Badge variant="success" className={styles.statusBadge}>
              <BadgeIcon>
                <Truck size={12} className={styles.statusIcon} />
              </BadgeIcon>
              {shipmentData.status}
            </Badge>
            <div className={styles.estimatedTime}>{shipmentData.estimatedTime}</div>
          </div>
        </div>

        <div className={styles.timeline}>
          {shipmentData.timeline.map((item, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineIndicator}>
                <div
                  className={`${styles.timelineCircle} ${
                    item.completed ? styles.completed : item.current ? styles.current : styles.pending
                  }`}
                />
                {index < shipmentData.timeline.length - 1 && <div className={styles.timelineLine} />}
              </div>
              <div className={styles.timelineContent}>
                <div className={styles.companyName}>{item.company}</div>
                <div className={styles.timelineTime}>{item.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.separator}></div>

        <div className={styles.actions}>
          <Button variant="outline" size="sm" className={styles.actionButton}>
            <Phone size={16} />
            Call
          </Button>
          <Button variant="outline" size="sm" className={styles.actionButton}>
            <MessageCircle size={16} />
            Message
          </Button>
          <Button variant="ghost" size="sm" className={styles.viewDetails}>
            View Details
          </Button>
        </div>
      </Card>
    </div>
  );
}
