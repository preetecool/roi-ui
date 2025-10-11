"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
  CardAction,
} from "@/registry/brook/ui/card/card";
import { Button } from "@/registry/brook/ui/button/button";
import { Badge } from "@/registry/brook/ui/badge/badge";
import { Logo } from "@/components/logo";
import { Check } from "lucide-react";
import styles from "./showcase-card-pricing-card.module.css";

export function ShowcasePricing() {
  return (
    <div className={styles.container}>
      <Card
        className={styles.card}
        style={{ backgroundColor: "color-mix(in oklch, var(--card) 33%, var(--background))" }}
      >
        <CardHeader>
          <div className={styles.headerContainer}>
            <div className={styles.logoContainer}>
              <Logo fillColor=" var(--muted-foreground)" strokeColor="var(--card)" width={36} height={36} />
            </div>
            <CardTitle>Roi UI</CardTitle>
            <CardDescription>Free/Forever</CardDescription>
          </div>
          <CardAction>
            <Badge variant="outline">Awesome</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div className={styles.featureContainer}>
              <div className={styles.checkIcon}>
                <Check size={10} strokeWidth={3} />
              </div>
              <span className={styles.featureText}>Over 30 components to help you build</span>
            </div>

            <div className={styles.featureContainer}>
              <div className={styles.checkIcon}>
                <Check size={10} strokeWidth={3} />
              </div>
              <span className={styles.featureText}>Components with stunning animations</span>
            </div>

            <div className={styles.featureContainer}>
              <div className={styles.checkIcon}>
                <Check size={10} strokeWidth={3} />
              </div>
              <span className={styles.featureText}>Using Base UI primitives</span>
            </div>
          </div>
        </CardContent>
        <div></div>
        <CardFooter>
          <Button showArrow className={styles.button}>
            Get Started Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
