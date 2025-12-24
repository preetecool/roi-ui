"use client";

import { Check } from "lucide-react";
import { Badge } from "@/registry/brook/ui/badge/badge";
import { Button } from "@/registry/brook/ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/brook/ui/card/card";
import data from "../data.json";
import styles from "./pricing-section.module.css";

const { plans } = data;

export default function PricingSection() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Simple, transparent pricing</h2>
        <p className={styles.subtitle}>
          Choose the plan that works best for you. All plans include a 14-day
          free trial.
        </p>
      </div>

      <div className={styles.grid}>
        {plans.map((plan) => (
          <Card
            className={`${styles.card} ${plan.highlighted ? styles.highlighted : ""}`}
            key={plan.name}
          >
            {plan.badge && (
              <Badge className={styles.badge} variant="default">
                {plan.badge}
              </Badge>
            )}
            <CardHeader className={styles.cardHeader}>
              <CardTitle className={styles.planName}>{plan.name}</CardTitle>
              <CardDescription className={styles.planDescription}>
                {plan.description}
              </CardDescription>
            </CardHeader>

            <CardContent className={styles.cardContent}>
              <div className={styles.priceContainer}>
                <span className={styles.currency}>$</span>
                <span className={styles.price}>{plan.monthlyPrice}</span>
                <span className={styles.period}>/month</span>
              </div>

              <ul className={styles.features}>
                {plan.features.map((feature) => (
                  <li className={styles.feature} key={feature}>
                    <div className={styles.checkIcon}>
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className={styles.cardFooter}>
              <Button
                className={styles.button}
                variant={plan.highlighted ? "primary" : "secondary"}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
