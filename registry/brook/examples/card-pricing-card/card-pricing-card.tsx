"use client";

import { Check } from "lucide-react";
import { Logo } from "@/components/logo";
import { Badge } from "@/registry/brook/ui/badge/badge";
import { Button } from "@/registry/brook/ui/button/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/brook/ui/card/card";
import styles from "./card-pricing-card.module.css";

export function CardPricingCard() {
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardHeader>
          <div className={styles.headerContainer}>
            <div className={styles.logoContainer}>
              <Logo
                fillColor=" var(--muted-foreground)"
                height={36}
                strokeColor="var(--card)"
                width={36}
              />
            </div>
            <CardTitle>Roi UI</CardTitle>
            <CardDescription>Free/Forever</CardDescription>
          </div>
          <CardAction>
            <Badge variant="outline">Awesome</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div className={styles.featureContainer}>
              <div className={styles.checkIcon}>
                <Check size={10} strokeWidth={3} />
              </div>
              <span className={styles.featureText}>
                Over 30 components to help you build
              </span>
            </div>

            <div className={styles.featureContainer}>
              <div className={styles.checkIcon}>
                <Check size={10} strokeWidth={3} />
              </div>
              <span className={styles.featureText}>
                Components with stunning animations
              </span>
            </div>

            <div className={styles.featureContainer}>
              <div className={styles.checkIcon}>
                <Check size={10} strokeWidth={3} />
              </div>
              <span className={styles.featureText}>
                Using Base UI primitives
              </span>
            </div>
          </div>
        </CardContent>
        <div />
        <CardFooter>
          <Button className={styles.button} showArrow>
            Get Started Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
